import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Company } from "src/app/models/company";
import { ApiCompanyService } from "src/app/services/apicompany.service";
import { Product } from "src/app/models/product";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    templateUrl: 'dialogcompany.component.html',
    styleUrls: ['./dialogcompany.component.scss']
})

export class DialogCompanyComponent{
    /*
    public name: string = "";
    public priority: number = 0;
    public productCompanies!: any[];
    public products!: Product[];
    public shoppingLists!: Product[];
    */

    
    public model: any = {
        id:0,
        name:'',
        priority:0,
        productCompanies: [] as any[],
        products: [] as Product[],
        shoppingLists: [] as Product[],
    };

    
    public isAddMode:boolean = false;


    public companyForm = this.formBuilder.group({
        name: ['', Validators.required],
        priority: ['', Validators.required]
    });

    constructor(
        public dialogRef: MatDialogRef<DialogCompanyComponent>,
        public apiCompany: ApiCompanyService,
        public snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public company: Company
    ) {
        if(this.company !== null)
        {
            this.model.id = this.company.id;
            this.model.name = this.company.name.trim();
            this.model.priority = this.company.priority;
            this.model.productCompanies = this.company.productCompanies;
            this.model.products = this.company.products;
            this.model.shoppingLists = this.company.shoppingLists;
        }
        else
        {
            this.isAddMode = true;
        }
    }

    close(){
        this.dialogRef.close();
    }

    /*
    addCompany(){
        //const company: Company = { name: this.name, id: 0, priority:this.priority};
        this.apiCompany.add(this.companyForm.value as unknown as Company).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Company insertado con éxito','',{
                    duration: 2000
                });
            }
        });
    }

    editCompany(){
        const company: Company = { name: this.name, id: this.company.id, 
            priority:this.priority, products:this.products,
            productCompanies:this.productCompanies, shoppingLists:this.shoppingLists
        };
        this.apiCompany.edit(company).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Company editado con éxito','',{
                    duration: 2000
                });
            }
        });
    }
    */

    ///////////////////////////////////////////////////////

    
    convertToModel(){
        this.model.name = this.companyForm.value.name;
        this.model.priority = this.companyForm.value.priority;
    }


    addSubmit(){
        //this.convertToModel();
        if(this.isAddMode)
        {
            this.addCompany();
        }
        else
        {
            this.editCompany();
        }
    }

    addCompany(){
        this.apiCompany.add(this.model).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Empresa insertado con éxito','',{
                    duration: 2000
                });
            }
        });
    }

    editCompany(){
        this.apiCompany.edit(this.model.id,this.model).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Empresa editado con éxito','',{
                    duration: 2000
                });
            }
        });
    }
}