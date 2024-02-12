import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {NgFor} from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-emp-add-edit',
    standalone: true,
    imports: [
        NgFor,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    templateUrl: './emp-add-edit.component.html',
    styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent {

    empForm: FormGroup;

    education: string[] = [
        'Matric',
        'Intermediate',
        'Under graduation',
        'Post graduation',
    ];

    constructor(private _fb: FormBuilder, private _empService: EmployeeService, private _dialogRef: MatDialogRef<EmpAddEditComponent>) {
        this.empForm = this._fb.group({
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            gender: '',
            education: '',
            company: '',
            experience: '',
            package: ''
        });
    }

    onFormSubmit() {
        if(this.empForm.valid) {
            this._empService.addEmployee(this.empForm.value).subscribe({
                next: (val: any) => {
                    alert('Employee added successfully');
                    this._dialogRef.close(true);
                }, 
                error: (err: any) => {
                    console.error(err);
                },
            });
        }
    }
}
