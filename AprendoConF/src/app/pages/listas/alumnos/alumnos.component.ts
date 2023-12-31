import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user.interface';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { DataService } from 'src/app/services/data.service';

export interface profesorelementos {
  name: string;
  email: string;
  areas_de_conocimiento: string;
  city: string; 
  country: string;
}
let profesores: profesorelementos[] = [];

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements AfterViewInit {
  //Servicios
  profesor: DataService= inject(DataService);

  private autorizacion= inject(AutorizacionService);
  private idalumno: number = 0;  

  //Array tabkas 
  servicedata: User[] = [];

  //Columnas
  displayedColumns: string[] = ['index', 'name', 'email', 'country', 'city', 'areas_de_conocimiento'];

  dataSource = new MatTableDataSource<profesorelementos>(profesores);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngOnInit(): Promise<void> {  
    this.idalumno = this.autorizacion.currentUserValue.id;
    try {
      this.servicedata = await this.profesor.getProfesoresByStudentId(this.idalumno);
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
