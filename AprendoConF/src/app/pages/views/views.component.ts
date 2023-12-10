import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User, sendStatus } from 'src/app/interfaces/user.interface';
import { MessageService } from 'src/app/services/message.service';
import { ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

export interface teacherElements {
  nombre: string;
  rama: string;
  ubicacion: string;
  correo: string;
  estado: string;
  selected: boolean;
}

export interface studentsElement {
  nombre: string;
  city: string;
  ubicacion: string;
  correo: string;
  estado: string;
  selected: boolean;
}

let TEACHERS: teacherElements[] = [];
let STUDENTS: studentsElement[] = [];

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewsComponent implements OnInit {
  //Servicios
  mensajeService = inject(MessageService);
  dataService = inject(DataService);

  //Arrays tables
  teachersData: any[] = [];
  students: any[] = [];
  servicedataStudents: User[] = [];
  servicedataTeachers: User[] = [];
  stateInterface: sendStatus = { status: '' };

  //Variables
  rol: string = 'Admin';

  displayedColumnsTeacher: string[] = [
    'nombre',
    'rama',
    'ubicacion',
    'correo',
    'estado',
    'check',
  ];
  displayedColumnsStudents: string[] = [
    'nombre',
    'ciudad',
    'ubicacion',
    'correo',
    'estado',
    'check',
  ];
  dataSourceTeacher = new MatTableDataSource<teacherElements>(TEACHERS);
  dataSourceStudent = new MatTableDataSource<studentsElement>(STUDENTS);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('paginatorTeacher') paginatorTeacher!: MatPaginator;
  @ViewChild('paginatorStudent') paginatorStudent!: MatPaginator;

  constructor() {}

  ngOnInit() {
    //this.servicedata = [];
    TEACHERS = [];
    STUDENTS = [];
    this.getAllUser();
  }

  toggleCheckbox(row: any) {
    console.log(row);

    this.changeState(row);
  }

  async changeState(rowTable: any) {
    this.mensajeService.loading(true);
    if (rowTable.estado == 'registrado' || rowTable.estado == 'inactivo') {
      this.stateInterface.status = 'activo';
    } else if (rowTable.estado == 'activo') {
      this.stateInterface.status = 'inactivo';
    }
    console.log(this.stateInterface);

    try {
      const response = await this.dataService.updateState(
        rowTable.id,
        this.stateInterface
      );
      console.log(response);
      this.mensajeService.loading(false);
      Swal.fire({
        title: 'Actualización Exitosa.',
        text: `${rowTable.nombre} ahora se encuentra ${this.stateInterface.status}.`,
        icon: 'info',
        confirmButtonColor: '#5fc1c5   ',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      this.mensajeService.errorSerivicios();
    }
  }

  applyFilterTeacher(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTeacher.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceTeacher.paginator) {
      this.dataSourceTeacher.paginator.firstPage();
    }
  }
  applyFilterStudent(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceStudent.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceStudent.paginator) {
      this.dataSourceStudent.paginator.firstPage();
    }
  }

  cargarTablas() {
    let teacher = {
      id: 0,
      nombre: '',
      rama: '',
      ubicacion: '',
      correo: '',
      estado: '',
      selected: true,
    };

    let student = {
      id: 0,
      nombre: '',
      city: '',
      ubicacion: '',
      correo: '',
      estado: '',
      selected: true,
    };

    this.servicedataStudents.forEach((estudiante) => {
      student = {
        id: estudiante.id,
        nombre: estudiante.name,
        city: estudiante.city,
        ubicacion: estudiante.country,
        correo: estudiante.email,
        estado: estudiante.status,
        selected: estudiante.status == 'activo' ? true : false,
      };
      STUDENTS.push(student);
    });
    this.servicedataTeachers.forEach((profesor) => {
      teacher = {
        id: profesor.id,
        nombre: profesor.name,
        rama: profesor.areas,
        ubicacion: profesor.country,
        correo: profesor.email,
        estado: profesor.status,
        selected: profesor.status == 'activo' ? true : false,
      };
      TEACHERS.push(teacher);
    });

    this.dataSourceTeacher = new MatTableDataSource<teacherElements>(TEACHERS);
    this.dataSourceStudent = new MatTableDataSource<studentsElement>(STUDENTS);
    this.dataSourceTeacher.paginator = this.paginatorTeacher;
    this.dataSourceStudent.paginator = this.paginatorStudent;
  }

  async getAllUser() {
    this.mensajeService.loading(true);
    //Llamada servicio AllUsers
    try {
      const response = await this.dataService.getAllUsers();
      const responseStudents = await this.dataService.getAllStudents();
      const responseProfesors = await this.dataService.getAllTeachers();
      console.log(responseStudents);
      console.log(responseProfesors);

      this.servicedataStudents = [...responseStudents];
      this.servicedataTeachers = [...responseProfesors];

      this.cargarTablas();
      //console.log(this.servicedata);
      this.mensajeService.loading(false);
    } catch (error) {
      this.mensajeService.errorSerivicios();
    }
  }
}
