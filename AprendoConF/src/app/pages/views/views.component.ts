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

let TEACHERS: teacherElements[] = [];
let STUDENTS: teacherElements[] = [];

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
  servicedata: User[] = [];
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
    'rama',
    'ubicacion',
    'correo',
    'estado',
    'check',
  ];
  dataSourceTeacher = new MatTableDataSource<teacherElements>(TEACHERS);
  dataSourceStudent = new MatTableDataSource<teacherElements>(STUDENTS);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('paginatorTeacher') paginatorTeacher!: MatPaginator;
  @ViewChild('paginatorStudent') paginatorStudent!: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.servicedata = [];
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
    } catch (error) {}
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
    console.log(this.servicedata);
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
      rama: '',
      ubicacion: '',
      correo: '',
      estado: '',
      selected: true,
    };
    this.servicedata.forEach((element) => {
      if (element.role == 'profesor') {
        teacher = {
          id: element.id,
          nombre: element.name,
          rama: element.country,
          ubicacion: element.country,
          correo: element.email,
          estado: element.status,
          selected: element.status == 'activo' ? true : false,
        };
        TEACHERS.push(teacher);
      } else if (element.role == 'estudiante') {
        student = {
          id: element.id,
          nombre: element.name,
          rama: element.country,
          ubicacion: element.country,
          correo: element.email,
          estado: element.status,
          selected: element.status == 'activo' ? true : false,
        };
        STUDENTS.push(student);
      }
      //this.teachersData = [...TEACHERS];
    });

    console.log(STUDENTS);
    console.log(TEACHERS);

    this.dataSourceTeacher = new MatTableDataSource<teacherElements>(TEACHERS);
    this.dataSourceStudent = new MatTableDataSource<teacherElements>(STUDENTS);
    this.dataSourceTeacher.paginator = this.paginatorTeacher;
    this.dataSourceStudent.paginator = this.paginatorStudent;

    console.log(this.dataSourceTeacher.paginator);
    console.log(this.paginator);
    console.log(this.paginatorStudent);
  }

  async getAllUser() {
    this.mensajeService.loading(true);
    //Llamada servicio AllUsers
    try {
      const response = await this.dataService.getAllUsers();
      this.servicedata = [...response];
      this.cargarTablas();
      console.log(this.servicedata);
      this.mensajeService.loading(false);
    } catch (error) {
      this.mensajeService.errorSerivicios();
    }
  }
}
