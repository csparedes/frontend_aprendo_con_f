import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user.interface';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements AfterViewInit  {

  profesorServices = inject(ProfesoresService);
  datosprofesores: User[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['index', 'name', 'knowledgeAreas', 'country', 'email', 'rating'];
  dataSource = new MatTableDataSource<User>();

  ngOnInit(): void {
    this.datosprofesores = this.profesorServices.getAllProfe('professor');
    this.dataSource = new MatTableDataSource<User>(this.datosprofesores);
    console.log(this.datosprofesores);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getRatingImageUrl(rating: number): string {
    return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
  }

  selecuser(row: any){
    console.log('datos:',row);
  }

}
