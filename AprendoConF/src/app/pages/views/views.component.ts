import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { USERS } from 'src/app/database/user.db';
import { User } from 'src/app/interfaces/user.interface';
import { MessageService } from 'src/app/services/message.service';

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
})
export class ViewsComponent implements OnInit {
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
  dataSource = this.teachersData;
  selection = new SelectionModel<teacherElements>(true, []);

  ngOnInit() {
    this.selection.select(this.dataSource[0]);
    this.cargarTablas();
  }

  toggleCheckbox(row: any) {
    console.log(row);
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
      this.teachersData = [...TEACHERS];
      // this.teachersData = this.teachersData.filter(
      //   (el) => el.estado == 'Inactivo'
      // );
      this.dataSource = this.teachersData;
    });
  }
}
