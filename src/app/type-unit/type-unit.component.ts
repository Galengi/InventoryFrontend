import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { TypeUnit } from '../models/type-unit';
import { ApiTypeUnitService } from '../services/apitype-unit.service';
import { DialogTypeUnitComponent } from './dialog/dialogtype-unit.component';

@Component({
  selector: 'app-type-unit',
  templateUrl: './type-unit.component.html',
  styleUrls: ['./type-unit.component.scss']
})
export class TypeUnitComponent implements OnInit {

  public lstTypeUnits: any[] = [];
  readonly width: string = '300px';
  public columnas: string[] = ['name','priority','actions'];
  constructor(
    private apiTypeUnit: ApiTypeUnitService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
   }
   ngOnInit(): void {
     this.getTypeUnits();
   }
 
   getTypeUnits(){
     this.apiTypeUnit.getTypeUnits().subscribe(response => {
       this.lstTypeUnits = response.data.value;
       console.log(this.lstTypeUnits);
     })
   }
 
   openAdd(){
     const dialogRef = this.dialog.open(DialogTypeUnitComponent, {
       width: this.width
     });
     dialogRef.afterClosed().subscribe(result =>{
       this.getTypeUnits();
     });
   }
 
   openEdit(typeUnit: TypeUnit) {
     const dialogRef = this.dialog.open(DialogTypeUnitComponent, {
       width: this.width,
       data: typeUnit
     });
     dialogRef.afterClosed().subscribe(result =>{
       this.getTypeUnits();
     });
   }
 
   delete(typeUnit: TypeUnit){
     const dialogRef = this.dialog.open(DialogDeleteComponent, {
       width: this.width
     });
     dialogRef.afterClosed().subscribe(result =>{
       if(result)
       {
         this.apiTypeUnit.delete(typeUnit.id).subscribe(response =>{
           if(response.success == 1)
           {
             this.snackBar.open('Tipo eliminado con éxito','',{
               duration: 2000
             });
             this.getTypeUnits();
           }
         });
       }
     });
   }

}
