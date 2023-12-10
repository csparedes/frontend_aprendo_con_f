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
  rating: number = 1;
  opinion: string = '';

  dataService = inject(DataService);


  submitOpinion() {
  console.log(`Rating: ${this.rating}, Opinión: ${this.opinion}`);

  this.dataService.updateReviewRating(this.oneProfessor.id, {
    rating: this.rating,
    review: this.opinion
  }).subscribe(response => {
    console.log('Actualización exitosa', response);
    this.closeModal();
  }, error => {
    console.error('Error al actualizar la calificación y revisión', error);
  });
}
  closeModal() {
    this.closeModalEvent.emit();

  }
}
