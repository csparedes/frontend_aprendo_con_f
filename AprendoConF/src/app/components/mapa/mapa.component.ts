///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit, Input, Directive } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { ElementRef, ViewChild, Renderer2 } from '@angular/core'
import {User} from "../../interfaces/user.interface";
import {USERS} from "../../database/user.db";
import { Router } from '@angular/router';

const image =
    "https://img.icons8.com/bubbles/50/000000/teacher-phone-call.png";  

const imagen2 = "https://img.icons8.com/bubbles/50/graduation-cap.png";

var locations = [
  ['Juan Hernandez', -33.4584, -70.61, 4],
  ['Karina Guerra', -33.4685, -70.62, 5],
  ['Maria Mare', -33.4786, -70.63, 3],
  ['Manly Alisto', -33.4887, -70.64, 2],
  ['Juan Figueroa', -33.4988, -70.65, 1]
];


var markerAlumno = new google.maps.Marker({
  position: {lat: 0, lng: 0},
  icon: imagen2
 });


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

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
      region: new FormControl('')
    })
  }

  ngOnInit(): void { 
  }

  ngAfterViewInit(): void {

    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {

        await this.cargarMapa(position);
        this.cargarAutocomplete();
        


      }, null, opciones);


    } else {
      console.log("navegador no compatible")
    }

  };



  onSubmit() {
    console.log("Datos del formulario: ", this.formMapas.value)
  };



  private cargarAutocomplete() {


    const autocomplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.inputPlaces.nativeElement), {
      
      fields: ["address_components", "geometry", "place_id"],
      types: ["address"],
    })


    

//Inicio autocomplete, cambio de lugar
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      
      

      const place: any = autocomplete.getPlace();

      this.mapa.setCenter(place.geometry.location);
      
      this.llenarFormulario(place);


      //Cargar marcador del alumno
      const markerAlumno = new google.maps.Marker({
        position: this.mapa.getCenter(),
        icon: imagen2
   
      });

      const alumnoString = "Estas aquí";

      var infowindow = new google.maps.InfoWindow( {
        content: alumnoString
      });
      
      markerAlumno.setMap(this.mapa);
      this.markers.push(markerAlumno);

      infowindow.open(this.mapa, markerAlumno);

      var mensaje;


      google.maps.event.addListener(markerAlumno, 'click', mensaje = () => {

          infowindow.open(this.mapa, markerAlumno)
    } );
      


      

      //Cargar marcado del profesor
      let i ;
      var almacenMarkerP: { setMap: (arg0: null) => void; }[] = []

      for (i = 0; i < locations.length; i++) {

        
        const markerProfesor = new google.maps.Marker({
         
          position: new google.maps.LatLng(Number(locations[i][1]), Number(locations[i][2])),
          icon: image,
          animation: google.maps.Animation.BOUNCE
          
        });

        const paginas = '/pages/teacher/4';


        
        //'+',''+ profe+ ',4]"> Pérfil </button>';

      

        //console.log(profesorString)

        markerProfesor.setMap(this.mapa);

        almacenMarkerP.push(markerProfesor)


//Mensaje marker profesores cuando clic
google.maps.event.addListener(markerProfesor, 'click', (mensaje = () => {


  infowindow.open(this.mapa, markerProfesor);

  const paginas = '/pages/teacher/4';

  const boton = document.createElement('button');
  boton.innerHTML = 'Pérfil';
  boton.addEventListener('click', () => {
    this.router.navigate([paginas]);
  });

  infowindow.setContent(boton);

  
})

); 

 
    };





    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      markerAlumno.setMap(null)
      for (let i = 0; i < almacenMarkerP.length; i++) {
        almacenMarkerP[i].setMap(null);
      };

    })
  
  })

//Fin autocomplete cambio de lugar
  }




  llenarFormulario(place: any) {

    const addressNameFormat: any = {
      'street_number': 'short_name',
      'route': 'long_name',
      'administrative_area_level_1': 'short_name',
      'administrative_area_level_2': 'short_name',
      'administrative_area_level_3': 'short_name',
      'country': 'long_name',

    };

    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {

          return component[addressNameFormat[type]];
        }
      }
      return ' '
    };

    const componentForm = {
      direccion: 'location',
      ciudad: "administrative_area_level_3",
      provincia: 'administrative_area_level_2',
      region: 'administrative_area_level_1'
    };

    Object.entries(componentForm).forEach(entry => {
      const [key, value] = entry;

      this.formMapas.controls[key].setValue(getAddressComp(value))
    });

    this.formMapas.controls['direccion'].setValue(getAddressComp('route') + ' ' + getAddressComp('street_number'))
  };

  cargarMapa(position: any): any {

    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones)

    

  };

}

@Directive()
export class ProfessorCardComponent {
  @Input() professorCard: User[] = USERS;
}