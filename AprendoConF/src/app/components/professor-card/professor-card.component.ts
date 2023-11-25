import { Component } from '@angular/core';

@Component({
  selector: 'app-professor-card',
  templateUrl: './professor-card.component.html',
  styleUrls: ['./professor-card.component.css']
})
export class ProfessorCardComponent {
  professors = [
    {
      id: 1,
      role: 'professor',
      name: 'Fernanda Montero',
      imageUrl:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=644&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      knowledgeAreas: ['Matemáticas', 'Física', 'Química'],
      location: {
        name: 'Malaga',
        country: 'España',
        pinImage: './assets/images/Pin_Location.JPG'
      },
      price: '$30.00 x hr',
      rating: 5
    },
    {
      id:2,
      role: 'professor',
      name: 'Yogendra Singh',
      imageUrl:
        'https://images.unsplash.com/photo-1589386417686-0d34b5903d23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      knowledgeAreas: ['Historia', 'Antropología', 'Artes'],
      location: {
        name: 'Madrid',
        country: 'España',
        pinImage: './assets/images/Pin_Location.JPG'
      },
      price: '$35.00 x hr',
      rating: 3
    },
    {
      id:3,
      role: 'professor',
      name: 'Cristina Wocintent',
      imageUrl:
        'https://images.unsplash.com/photo-1573496799515-eebbb63814f2?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      knowledgeAreas: ['Fitness', 'Yoga', 'Pilates', 'Nutrición'],
      location: {
        name: 'Valencia',
        country: 'España',
        pinImage: './assets/images/Pin_Location.JPG'
      },
      price: '$25.00 x hr',
      rating: 2
    },
     {
      id:4,
      role: 'professor',
      name: 'Oscar Manuel López',
      imageUrl:
        'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      knowledgeAreas: ['Java', 'Angular', 'React', 'NodeJS'],
      location: {
        name: 'Barcelona',
        country: 'España',
        pinImage: './assets/images/Pin_Location.JPG'
      },
      price: '$55.00 x hr',
       rating: 5
    },
    {
      id:5,
      role: 'professor',
      name: 'Kistrel Yo',
      imageUrl:
        'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      knowledgeAreas: ['Piano', 'Ukelele', 'Guitar', 'Flauta', 'Violin'],
      location: {
        name: 'Mallorca',
        country: 'España',
        pinImage: './assets/images/Pin_Location.JPG'
      },
      price: '$65.00 x hr',
      rating: 3
    },
    {
      id:6,
      role: 'professor',
      name: 'Ricardo Alegria',
      imageUrl:
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      knowledgeAreas: ['Fotografía', 'Diseño', 'Photoshop', 'Ilustrator'],
      location: {
        name: 'Nerja',
        country: 'España',
        pinImage: './assets/images/Pin_Location.JPG'
      },
      price: '$65.00 x hr',
      rating: 4
    }
  ];

  getRatingImageUrl(rating: number): string {
  return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
}

}
