import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Tag } from "src/app/models/tag";
import { ApiTagService } from "src/app/services/apitag.service";
import { Product } from "src/app/models/product";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    templateUrl: 'dialogtag.component.html',
    styleUrls: ['./dialogtag.component.scss']
})

export class DialogTagComponent{

    public model: any = {
        id:0,
        name:'',
        priority:0,
        productTags: [] as any[]
    };

    public isAddMode:boolean = false;

    public tagForm = this.formBuilder.group({
        name: ['', Validators.required],
        priority: ['', Validators.required]
    });

    constructor(
        public dialogRef: MatDialogRef<DialogTagComponent>,
        public apiTag: ApiTagService,
        public snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public tag: Tag
    ) {
        if(this.tag !== null)
        {
            this.model.id = this.tag.id;
            this.model.name = this.tag.name.trim();
            this.model.priority = this.tag.priority;
            this.model.productTags = this.tag.productTags;
        }
        else
        {
            this.isAddMode = true;
        }
    }

    close(){
        this.dialogRef.close();
    }


    convertToModel(){
        this.model.name = this.tagForm.value.name;
        this.model.priority = this.tagForm.value.priority;
    }


    addSubmit(){
        //this.convertToModel();
        if(this.isAddMode)
        {
            this.addTag();
        }
        else
        {
            this.editTag();
        }
    }

    addTag(){
        this.apiTag.add(this.model).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Tag insertado con éxito','',{
                    duration: 2000
                });
            }
        });
    }

    editTag(){
        this.apiTag.edit(this.model.id,this.model).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Tag editado con éxito','',{
                    duration: 2000
                });
            }
        });
    }
}