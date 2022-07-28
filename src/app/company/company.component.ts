import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { Company } from '../models/company';
import { ApiCompanyService } from '../services/apicompany.service';
import { DialogCompanyComponent } from './dialog/dialogcompany.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  public lstCompanies: any[] = [];
  readonly width: string = '300px';
  public columnas: string[] = ['name','priority','actions'];
  constructor(
    private apiCompany: ApiCompanyService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
   }
   ngOnInit(): void {
     this.getCompanies();
   }
 
   getCompanies(){
     this.apiCompany.getCompanies().subscribe(response => {
       this.lstCompanies = response.data.value;
       console.log(this.lstCompanies);
     })
   }
 
   openAdd(){
     const dialogRef = this.dialog.open(DialogCompanyComponent, {
       width: this.width
     });
     dialogRef.afterClosed().subscribe(result =>{
       this.getCompanies();
     });
   }
 
   openEdit(company: Company) {
     const dialogRef = this.dialog.open(DialogCompanyComponent, {
       width: this.width,
       data: company
     });
     dialogRef.afterClosed().subscribe(result =>{
       this.getCompanies();
     });
   }
 
   delete(company: Company){
     const dialogRef = this.dialog.open(DialogDeleteComponent, {
       width: this.width
     });
     dialogRef.afterClosed().subscribe(result =>{
       if(result)
       {
         this.apiCompany.delete(company.id).subscribe(response =>{
           if(response.success == 1)
           {
             this.snackBar.open('Company eliminado con éxito','',{
               duration: 2000
             });
             this.getCompanies();
           }
         });
       }
     });
   }

}
