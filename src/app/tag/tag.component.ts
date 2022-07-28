import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { Tag } from '../models/tag';
import { ApiTagService } from '../services/apitag.service';
import { DialogTagComponent } from './dialog/dialogtag.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  public lstTags: any[] = [];
  readonly width: string = '300px';
  public columnas: string[] = ['name','priority','actions'];
  constructor(
    private apiTag: ApiTagService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
   }
   ngOnInit(): void {
     this.getTags();
   }
 
   getTags(){
     this.apiTag.getTags().subscribe(response => {
       this.lstTags = response.data.value;
       console.log(this.lstTags);
     })
   }
 
   openAdd(){
     const dialogRef = this.dialog.open(DialogTagComponent, {
       width: this.width
     });
     dialogRef.afterClosed().subscribe(result =>{
       this.getTags();
     });
   }
 
   openEdit(tag: Tag) {
     const dialogRef = this.dialog.open(DialogTagComponent, {
       width: this.width,
       data: tag
     });
     dialogRef.afterClosed().subscribe(result =>{
       this.getTags();
     });
   }
 
   delete(tag: Tag){
     const dialogRef = this.dialog.open(DialogDeleteComponent, {
       width: this.width
     });
     dialogRef.afterClosed().subscribe(result =>{
       if(result)
       {
         this.apiTag.delete(tag.id).subscribe(response =>{
           if(response.success == 1)
           {
             this.snackBar.open('Tag eliminado con éxito','',{
               duration: 2000
             });
             this.getTags();
           }
         });
       }
     });
   }

}
