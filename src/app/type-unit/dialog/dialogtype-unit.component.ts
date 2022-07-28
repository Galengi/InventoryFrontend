import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, Validators } from "@angular/forms";
import { TypeUnit } from "src/app/models/type-unit";
import { ApiTypeUnitService } from "src/app/services/apitype-unit.service";
import { Product } from "src/app/models/product";

@Component({
    templateUrl: 'dialogtype-unit.component.html',
    styleUrls: ['./dialogtype-unit.component.scss']
})

export class DialogTypeUnitComponent{
    public model: any = {
        id:0,
        name:'',
        products: [] as any[]
    };

    public isAddMode:boolean = false;

    public typeUnitForm = this.formBuilder.group({
        name: ['', Validators.required]
    });

    constructor(
        public dialogRef: MatDialogRef<DialogTypeUnitComponent>,
        public apiTypeUnit: ApiTypeUnitService,
        public snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public typeUnit: TypeUnit
    ) {
        if(this.typeUnit !== null)
        {
            this.model.id = this.typeUnit.id;
            this.model.name = this.typeUnit.name.trim();
            this.model.products = this.typeUnit.products;
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
        this.model.name = this.typeUnitForm.value.name;
    }


    addSubmit(){
        //this.convertToModel();
        if(this.isAddMode)
        {
            this.addTypeUnit();
        }
        else
        {
            this.editTypeUnit();
        }
    }

    addTypeUnit(){
        this.apiTypeUnit.add(this.model).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('TypeUnit insertado con éxito','',{
                    duration: 2000
                });
            }
        });
    }

    editTypeUnit(){
        this.apiTypeUnit.edit(this.model.id,this.model).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('TypeUnit editado con éxito','',{
                    duration: 2000
                });
            }
        });
    }
}