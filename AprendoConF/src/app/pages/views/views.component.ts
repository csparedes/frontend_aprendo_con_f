import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user.interface';
import { MessageService } from 'src/app/services/message.service';
import { ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from 'src/app/services/data.service';

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
export class ViewsComponent implements OnInit {
  //Servicios
  mensajeService = inject(MessageService);
  dataService = inject(DataService);

  //Arrays tables
  teachersData: any[] = [];
  students: any[] = [];
  servicedata: User[] = [];

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

  constructor() {}

  ngOnInit() {
    this.getAllUser();
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
      id: 0,
      nombre: '',
      rama: '',
      ubicacion: '',
      correo: '',
      estado: '',
      selected: true,
    };
    this.servicedata.forEach((element) => {
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
      //this.teachersData = [...TEACHERS];
    });
    this.dataSource = new MatTableDataSource<teacherElements>(TEACHERS);
    this.dataSource.paginator = this.paginator;
  }

  async getAllUser() {
    this.mensajeService.loading(true);
    //Llamada servicio AllUsers
    try {
      const response = await this.dataService.getAllUsers();
      this.servicedata = [...response];
      console.log(typeof this.servicedata);
      this.cargarTablas();
      console.log(this.servicedata);
      this.mensajeService.loading(false);
    } catch (error) {
      console.log(error);
      this.mensajeService.errorSerivicios();
    }
  }
}
