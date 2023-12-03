import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {

  AlumnsoServices = inject(AlumnosService);
  datosAlumnos: User[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['index', 'name', 'country', 'email'];
  dataSource = new MatTableDataSource<User>();
  router = inject(Router)

  ngOnInit(): void {
    this.datosAlumnos = this.AlumnsoServices.getAllProfe('alumno');
    this.dataSource = new MatTableDataSource<User>(this.datosAlumnos);
    console.log(this.datosAlumnos);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
