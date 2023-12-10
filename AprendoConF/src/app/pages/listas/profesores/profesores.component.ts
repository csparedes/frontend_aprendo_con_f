import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user.interface';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { DataService } from 'src/app/services/data.service';

export interface alumnoselementos {
  nombre: string;
  email: string;
  areas: string;
}
let estudiantes: alumnoselementos[] = [];

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})

export class ProfesoresComponent implements AfterViewInit{
  //Servicios
  alumnos: DataService= inject(DataService);
  private autorizacion= inject(AutorizacionService);
  private idprofesor: number = 0;  
  
  //Array tabkas
  datosprofesores:any = [];
  servicedata: User[] = [];

  //Columnas
  displayedColumns: string[] = ['index', 'name', 'email', 'areas'];
  
  
  dataSource = new MatTableDataSource<alumnoselementos>(estudiantes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

constructor() { }



async ngOnInit(): Promise<void> {  
  this.idprofesor = this.autorizacion.currentUserValue.id;
  try {
    this.servicedata = await this.alumnos.getStudentsByProfessorId(this.idprofesor);
    console.log('datos:',this.servicedata);
    this.dataSource = new MatTableDataSource<any>(this.servicedata);
  }
  catch (error) {
    console.log('Error:', error);
  }
}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   selecuser(row: any){
    
    console.log('datos:',row);
  }





}
