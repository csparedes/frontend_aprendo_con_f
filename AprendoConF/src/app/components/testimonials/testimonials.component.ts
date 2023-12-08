import {Component, Input, Output, EventEmitter} from '@angular/core';

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


  submitOpinion() {
    // Aquí puedes enviar la opinión y el rating al servidor o realizar la acción necesaria
    // por ejemplo, guardarlos en una base de datos.
    console.log(`Rating: ${this.rating}, Opinión: ${this.opinion}`);
    // Luego puedes cerrar el modal
    this.closeModal();
  }

  closeModal() {
    console.log('Click on Closed')
    this.closeModalEvent.emit();

  }
}
