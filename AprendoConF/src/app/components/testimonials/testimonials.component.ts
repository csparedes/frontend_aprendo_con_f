import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  @Input() oneProfessor: any;
  @Output() closeModalEvent = new EventEmitter<void>();
  rating: number = 1; // Valor inicial del rating
  opinion: string = ''; // Valor inicial de la opinión

  dataService = inject(DataService);


  submitOpinion() {
  console.log(`Rating: ${this.rating}, Opinión: ${this.opinion}`);

  // Llama al servicio DataService para enviar la calificación y revisión al servidor
  this.dataService.updateReviewRating(this.oneProfessor.id, {
    rating: this.rating,
    review: this.opinion
  }).subscribe(response => {
    console.log('Actualización exitosa', response);
    // Luego puedes cerrar el modal
    this.closeModal();
  }, error => {
    console.error('Error al actualizar la calificación y revisión', error);
    // Maneja el error de manera apropiada, por ejemplo, mostrando un mensaje al usuario.
  });
}
  closeModal() {
    this.closeModalEvent.emit();

  }
}
