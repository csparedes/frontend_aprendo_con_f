const input = document.getElementById("place_input");

var locations = [
  ['Juan Hernandez', -33.4584, -70.61, 4],
  ['Karina Guerra', -33.4685, -70.62, 5],
  ['Maria Mare', -33.4786, -70.63, 3],
  ['Manly Alisto', -33.4887, -70.64, 2],
  ['Juan Figueroa', -33.4988, -70.65, 1]
];
const image =
    "https://img.icons8.com/bubbles/50/000000/teacher-phone-call.png";

const imagen2 = "https://img.icons8.com/bubbles/50/graduation-cap.png"

let labelIndex = 0;

var i;


function initMap() {
  
  //Mapa (map) y marcador (marker) inicial

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.4583, lng: -70.6},
    zoom: 15
  });

  marker_alumno = new google.maps.Marker({
    position: {lat: 0, lng: 0},
    map: map,
    icon: imagen2
   });

  marker_profesores = new google.maps.Marker({
    position: {lat: 0, lng: 0},
    map: map,
    icon: image
   });

  
  let markers = [];
  var infowindow = new google.maps.InfoWindow();

  //Botón para buscar profesores cerca de la ubicación del navegador
  const locationButton = document.createElement("button");
  locationButton.textContent = "Busca profesores cerca de ti";
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {


    marker_alumno.setMap(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

        


          //Aquí creamos una etiqueta para colocar un punto en el mapa con la úbicación del navegador
          marker_alumno = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            map: map,
            icon: imagen2
           });
          //de todas formas cuando hace clic en el botón también le muestra el mensaje "tú estás aquí"
          infowindow.setContent("Tú estás aquí");
          infowindow.open(map, marker_alumno);

           //Si hace clic en la etiqueta dice "tú estas aquí"
          google.maps.event.addListener(marker_alumno, 'click', (function(marker_alumno) {
            return function() {
              infowindow.setContent('Tú estás aquí');
              infowindow.open(map, marker_alumno);
            };
          })
          
          
          (marker_alumno)
          
          );           

          infowindow.setPosition(pos);

          
          map.setCenter(pos);

          let markers = [];
     
          for (i = 0; i < locations.length; i++) {
            
            //Aquí creamos los tags con la localización de los profesores con lat y lng

      
            
            marker_profesores = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i][1], locations[i][2]),
              map: map,
              icon: image,
              animation: google.maps.Animation.BOUNCE
              
            });

            markers.push(marker_profesores);
            

            

            //muestra las etiquetas cuando haces clic
                  
            google.maps.event.addListener(marker_profesores, 'click', (function(marker_profesores, i) {
                return function() {
                  infowindow.setContent(locations[i][0]);
                  infowindow.open(map, marker_profesores);
                };
              })
              
              
              (marker_profesores, i)
              
              );


  
  
              
        };
        

        //bucle para eliminar los markers anteriores de los profesores.
        locationButton.addEventListener("click", () => {
          for (let j = 0; j < markers.length; j++) {
            markers[j].setMap(null);
          };
          markers = [];

        });
        autocomplete.addListener('place_changed', function(){
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          };
          markers = [];    
         });




        },
        () => {
          handleLocationError(true, infowindow, map.getCenter());
        }
      );
    } else {
      
      handleLocationError(false, infowindow, map.getCenter());
    }
  });


function handleLocationError(browserHasGeolocation, infowindow, pos) {
  infowindow.setPosition(pos);
  infowindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infowindow.open(map);
}

window.initMap = initMap;
 
  autocomplete = new google.maps.places.Autocomplete(input);

  //se activa cuando se cambie de ubicación en el buscador


  autocomplete.addListener('place_changed', function(){

    
    const place = autocomplete.getPlace();

    map.setCenter(place.geometry.location);
    infowindow.setContent('Ubicación buscada');
    marker_alumno.setPosition(place.geometry.location);

    infowindow.open(map, marker_alumno);
    let markers = [];

    for (i = 0; i < locations.length; i++) {  
      marker_profesores = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: image,
        animation: google.maps.Animation.BOUNCE
      });

      markers.push(marker_profesores);

        google.maps.event.addListener(marker_alumno, 'click', (function(marker_alumno) {
          return function() {
            infowindow.setContent('Ubicación buscada');
            infowindow.open(map, marker_alumno);
          };
        })
        
        
        (marker_alumno)
        
        );

        google.maps.event.addListener(marker_profesores, 'click', (function(marker_profesores, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker_profesores);
          };
        })
        
        
        (marker_profesores, i)
        
        );

        
  }
        
  locationButton.addEventListener("click", () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    };
    markers = [];

   });

   autocomplete.addListener('place_changed', function(){
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    };
    markers = [];    
   });


});

};




    

  
  