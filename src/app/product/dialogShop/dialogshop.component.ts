import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";
import { ErrorStateMatcher } from "@angular/material/core";


import { map, timeout, catchError } from 'rxjs/operators';
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { ApiShopService } from "src/app/services/apishop.service";
import { ShoppingList } from "src/app/models/shopping-list";
import { Product, ProductModel } from "src/app/models/product";
import { Company } from "src/app/models/company";

@Component({
    templateUrl: 'dialogshop.component.html',
    styleUrls: ['./dialogshop.component.scss']
})

export class DialogShopComponent{

    lstCompanies: Company[] = [];
    modelProduct?: ProductModel;

    public model: any = {
        idproduct:0,
        idcompany:0,
        amount:0
    };

    

    public isAddMode:boolean = false;

    public shopForm = this.formBuilder.group({
        amount: [0, Validators.required],
    });

    constructor(
        public dialogRef: MatDialogRef<DialogShopComponent>,
        public apiShop: ApiShopService,
        public snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if(this.data !== null)
        {
            this.lstCompanies = this.data.companies;
            this.modelProduct = this.data.product;

            this.model.idproduct = this.modelProduct!.id;
            this.model.idcompany = this.lstCompanies.find(e=> e.name===this.modelProduct!.defaultCompany)?.id as number;

            this.model.amount = 0;
        }
        else
        {
            console.log("ESTE ERROR NO DEBERIA OUCRRIR");
        }
    }

    close(){
        this.dialogRef.close();
    }


    convertToModel(){
        this.model.amount = this.shopForm.value.amount;
    }


    addSubmit(){
        this.addShop();
    }

    addShop(){
        
        this.model.amount = this.shopForm.value.amount;
        console.log("El model es ",this.model);
        this.apiShop.edit(this.model.idproduct,this.model).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Producto insertado en la lista de la compra','',{
                    duration: 2000
                });
            }
        });
    }

    editShop(){
        this.apiShop.edit(this.model.idproduct,this.model).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Shop editado con éxito','',{
                    duration: 2000
                });
            }
        });
    }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }