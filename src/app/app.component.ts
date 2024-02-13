import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  

  displayedColumns: string[] = [
    'id', 
    'firstName', 
    'lastName', 
    'email', 
    'dob', 
    'gender', 
    'education', 
    'company', 
    'experience', 
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmployeeService){}
    ngOnInit(): void {
      this.getEmployeeList();
    }
    
    openAddEditEmpForm() {
      const dialogRef = this._dialog.open(EmpAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getEmployeeList();
          }
        },
      });
    }

    getEmployeeList() {
      this._empService.getEmployeeList().subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    deleteEmployee(id: number) {
      this._empService.deleteEmployee(id).subscribe({
        next: (res) => {
          alert('Employee deleted!!!');
          this.getEmployeeList();
        },
        error: console.log,
      });
    }

    openEditForm(data: any) {
      const dialogRef = this._dialog.open(EmpAddEditComponent,{
        data,
      });

      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getEmployeeList();
          }
        },
      });
    }
}
