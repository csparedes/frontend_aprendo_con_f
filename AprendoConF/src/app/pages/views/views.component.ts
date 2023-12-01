import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { USERS } from 'src/app/database/user.db';
import { User } from 'src/app/interfaces/user.interface';
import { MessageService } from 'src/app/services/message.service';
import { ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

export interface teacherElements {
  nombre: string;
  rama: string;
  ubicacion: string;
  correo: string;
  estado: string;
  selected: boolean;
}

const TEACHERS: teacherElements[] = [];

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewsComponent implements OnInit, AfterViewInit {
  //Servicios
  mensajeService = inject(MessageService);

  //Arrays tables
  teachersData: any[] = [];
  students: any[] = [];
  servicedata: User[] = USERS;

  //Variables
  rol: string = 'Admin';

  displayedColumns: string[] = [
    'nombre',
    'rama',
    'ubicacion',
    'correo',
    'estado',
    'check',
  ];
  dataSource = new MatTableDataSource<teacherElements>(TEACHERS);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.mensajeService.loading(false);
    this.cargarTablas();
  }

  toggleCheckbox(row: any) {
    console.log(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarTablas() {
    console.log(this.servicedata);
    let teacher = {
      nombre: '',
      rama: '',
      ubicacion: '',
      correo: '',
      estado: '',
      selected: true,
    };
    this.servicedata.forEach((element) => {
      if (element.status == 'Activo') {
        teacher = {
          nombre: element.name,
          rama: element.knowledgeAreas[0],
          ubicacion: element.country,
          correo: element.email,
          estado: element.status,
          selected: true,
        };
      } else {
        teacher = {
          nombre: element.name,
          rama: element.knowledgeAreas[0],
          ubicacion: element.country,
          correo: element.email,
          estado: element.status,
          selected: false,
        };
      }
      TEACHERS.push(teacher);
      //this.teachersData = [...TEACHERS];
    });
  }
}
