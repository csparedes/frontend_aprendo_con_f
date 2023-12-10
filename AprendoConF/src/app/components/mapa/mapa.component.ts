//import { Component, inject, OnInit } from '@angular/core';
//import { ActivatedRoute, Router } from '@angular/router';ok
//import { User } from '../../interfaces/user.interface';
//import { DataService } from '../../services/data.service';
//import { Observable } from 'rxjs';

//@Component({
//  selector: 'app-professor-profile',
//  templateUrl: './professor-profile.component.html',
//  styleUrls: ['./professor-profile.component.css'],
//})
//export class ProfessorProfileComponent implements OnInit {
//  oneProfessorId!: string;ok
//  oneProfessor: User | any;ok

//  userService: DataService = inject(DataService);
//  activatedRoute = inject(ActivatedRoute);

//  router = inject(Router);
//  async ngOnInit() {
//    this.activatedRoute.params.subscribe(async (params: any) => {
//      this.oneProfessorId = params.id;
//      this.oneProfessor = await this.userService.getProfessorById(
//        Number(this.oneProfessorId)
//      );
//      this.oneProfessor = this.oneProfessor[0];
//      this.oneProfessor.areas = this.oneProfessor.areas.split(',');
//      console.log(this.oneProfessor);
//    });
//  }

//  getRatingImageUrl(rating: number): string {
//    return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
//  }
//}



///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit, Input, Directive, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { User } from '../../interfaces/user.interface';
//import {USERS} from "../../database/user.db";
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

const image = 'https://img.icons8.com/bubbles/50/000000/teacher-phone-call.png';

const imagen2 = 'https://img.icons8.com/bubbles/50/graduation-cap.png';

var locations = [
  ['Juan Hernandez', -33.4584, -70.61, 4],
  ['Karina Guerra', -33.4685, -70.62, 5],
  ['Maria Mare', -33.4786, -70.63, 3],
  ['Manly Alisto', -33.4887, -70.64, 2],
  ['Juan Figueroa', -33.4988, -70.65, 1],
];

var markerAlumno = new google.maps.Marker({
  position: { lat: 0, lng: 0 },
  icon: imagen2,
});

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;
  oneProfessorId!: string;
  oneProfessor: User | any;
  userService: DataService = inject(DataService);
  activatedRoute = inject(ActivatedRoute);
  //router = inject(Router);

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;
  formMapas!: FormGroup;

  constructor(private renderer: Renderer2, private router: Router) {
    this.markers = [];

    this.formMapas = new FormGroup({
      busqueda: new FormControl(''),
      direccion: new FormControl(''),
      referencia: new FormControl(''),
      ciudad: new FormControl(''),
      provincia: new FormControl(''),
      region: new FormControl(''),
    });
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      this.oneProfessorId = params.id;
      this.oneProfessor = await this.userService.getLocations(
      );

    });
  }

  ngAfterViewInit(): void {
    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await this.cargarMapa(position);
          this.cargarAutocomplete();
        },
        null,
        opciones
      );
    } else {
      console.log('navegador no compatible');
    }
  }

  onSubmit() {
    console.log('Datos del formulario: ', this.formMapas.value);
  }

  private cargarAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.renderer.selectRootElement(this.inputPlaces.nativeElement),
      {
        fields: ['address_components', 'geometry', 'place_id'],
        types: ['address'],
      }
    );

    //Inicio autocomplete, cambio de lugar
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: any = autocomplete.getPlace();
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());

      var locacionBuscada = [place.geometry.location.lat(), place.geometry.location.lng()];
      var locacionRadio = [place.geometry.location.lat()+ 0.3, place.geometry.location.lng()+ 0.3]

      var j;

      console.log(locacionBuscada,locacionRadio);

      this.mapa.setCenter(place.geometry.location);

      this.llenarFormulario(place);

      //Cargar marcador del alumno
      const markerAlumno = new google.maps.Marker({
        position: this.mapa.getCenter(),
        icon: imagen2,
      });

      const alumnoString = 'Estas aquí';

      var infowindow = new google.maps.InfoWindow({
        content: alumnoString,
      });

      markerAlumno.setMap(this.mapa);
      this.markers.push(markerAlumno);

      infowindow.open(this.mapa, markerAlumno);

      var mensaje;

      google.maps.event.addListener(
        markerAlumno,
        'click',
        (mensaje = () => {
          infowindow.open(this.mapa, markerAlumno);
        })
      );

      //Cargar marcado del profesor
      let i;
      var almacenMarkerP: { setMap: (arg0: null) => void }[] = [];

      for (j = 0; j < this.oneProfessor.length; j++){
        if (this.oneProfessor[j].latitude < locacionRadio[0] && this.oneProfessor[j].longitude < locacionRadio[1])
           console.log(this.oneProfessor[j].id, this.oneProfessor[j].latitude,this.oneProfessor[j].longitude)
           const markerProfesor = new google.maps.Marker({
            position: new google.maps.LatLng(
              Number(this.oneProfessor[j].latitude),
              Number(this.oneProfessor[j].longitude)
            ),
            icon: image,
            animation: google.maps.Animation.BOUNCE,
          });
  
          markerProfesor.setMap(this.mapa);
  
          almacenMarkerP.push(markerProfesor);

          const paginas = '/pages/professor/'+ this.oneProfessor[j].id;
          const nombre = this.oneProfessor[j].name;
          const valor = this.oneProfessor[j].hourly_rate;
          const descripcion = this.oneProfessor[j].description;
          const imagen = "https://img.icons8.com/bubbles/50/000000/teacher-phone-call.png"
          
  
          //Mensaje marker profesores cuando clic
          google.maps.event.addListener(
            markerProfesor,
            'click',
            (mensaje = () => {
              infowindow.open(this.mapa, markerProfesor);
              const boton = document.createElement('button');
              boton.innerHTML = 'Pérfil';
              boton.addEventListener('click', () => {
                this.router.navigate([paginas]);
              });

              const contentString = "<img src='"+imagen+"'><p>"+nombre+"</p>"+ "<p>"+valor+"</p>" + "<p>"+descripcion+"</p>" +"<a href='http://localhost:4200"+ paginas +"'>Ver perfil</a>";//boton.innerHTML;
  
              infowindow.setContent(contentString);
            })
          );
          

      };

      for (i = 0; i < locations.length; i++) {
      }

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        markerAlumno.setMap(null);
        for (let i = 0; i < almacenMarkerP.length; i++) {
          almacenMarkerP[i].setMap(null);
        }
      });
    });

    //Fin autocomplete cambio de lugar
  }

  llenarFormulario(place: any) {
    const addressNameFormat: any = {
      street_number: 'short_name',
      route: 'long_name',
      administrative_area_level_1: 'short_name',
      administrative_area_level_2: 'short_name',
      administrative_area_level_3: 'short_name',
      country: 'long_name',
    };

    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return ' ';
    };

    const componentForm = {
      direccion: 'location',
      ciudad: 'administrative_area_level_3',
      provincia: 'administrative_area_level_2',
      region: 'administrative_area_level_1',
    };

    Object.entries(componentForm).forEach((entry) => {
      const [key, value] = entry;

      this.formMapas.controls[key].setValue(getAddressComp(value));
    });

    this.formMapas.controls['direccion'].setValue(
      getAddressComp('route') + ' ' + getAddressComp('street_number')
    );
  }

  cargarMapa(position: any): any {
    const opciones = {
      center: new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      ),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.mapa = new google.maps.Map(
      this.renderer.selectRootElement(this.divMap.nativeElement),
      opciones
    );
  }
}

