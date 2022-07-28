import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";
import { Product, ProductModel } from "src/app/models/product";
import { Response } from "src/app/models/response";
import { ApiProductService } from "src/app/services/apiproduct.service";
import { ApiTypeUnitService } from "src/app/services/apitype-unit.service";
import { TypeUnit } from "src/app/models/type-unit";
import { CompanyProduct } from "src/app/models/company";
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import { TagProduct } from "src/app/models/tag";
import { ApiTagService } from "src/app/services/apitag.service";
import { ErrorStateMatcher } from "@angular/material/core";
import { ApiCompanyService } from "src/app/services/apicompany.service";


import { map, timeout, catchError } from 'rxjs/operators';
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    templateUrl: 'dialogproduct.component.html',
    styleUrls: ['./dialogproduct.component.scss']
})

export class DialogProductComponent implements OnInit{
    public model: any = {
        id:0,
        name:'',
        currentAmount:0,
        minAmount:0,
        image:'',
        required:0,
        productAmount:1,
        typeAmount:'',
        productCompanies: [] as CompanyProduct[],
        productTags: [] as TagProduct[],
    };
    public modelToSend: any = {
        id:0,
        name:'',
        currentAmount:0,
        minAmount:0,
        image:'',
        required:0,
        productAmount:1,
        typeAmount:'',
        productCompanies: [],
        productTags: [],
    };

    base64: string = "";
    fileSelected?: Blob;
    selectedFile:boolean=false;
    //imageUrl?:string;
    //myImageBlob?:Blob;
    myImage?:any;


    public matcher = new MyErrorStateMatcher();

    /*
    public dropdownList : any = [];
    public dropdownTagSettings:IDropdownSettings={
        idField: 'id',
        textField: 'name',
        enableCheckAll: false,
        noDataAvailablePlaceholderText: "No existen tags, primero crea alguno",
        allowSearchFilter: true
    };
    public selectedTags:any[] = []
    */

    public isAddMode:boolean = false;


    
  public lstTyp: any[] = [];
  public lstTypes: TypeUnit[] = [];

  public lstTa: any[] = [];
  public lstTags: TagProduct[] = [];

  public lstComp: any[] = [];
  public lstCompanies: CompanyProduct[] = [];
    
  //public dropDownFormTag:FormGroup;
  public productForm: FormGroup = new FormGroup({});

  /*
    public productForm = this.formBuilder.group({
        name: ['', Validators.required],
        currentAmount: ['', Validators.required],
        minAmount: ['', Validators.required],
        image: ['', Validators.required],
        required: ['', Validators.required],
        productAmount: ['', Validators.required],
        typeAmount: ['', Validators.required],
        productCompanies: this.formBuilder.array([]),
        productTags: ['', Validators.required],
        
        //productTags: this.formBuilder.group({
        //    myTags: [this.product.productTags]
        //})
    });
    */

    constructor(
        public dialogRef: MatDialogRef<DialogProductComponent>,
        private apiType: ApiTypeUnitService,
        private apiTag: ApiTagService,
        private apiCompany: ApiCompanyService,
        public apiProduct: ApiProductService,
        public snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private sant:DomSanitizer,
        @Inject(MAT_DIALOG_DATA) public product: ProductModel
    ) {
        if(this.product !== null)
        {
            this.productForm = formBuilder.group({
                name: [this.product.name, Validators.required],
                currentAmount: [this.product.currentAmount, Validators.required],
                minAmount: [this.product.minAmount, Validators.required],
                image: [this.product.image],
                required: [this.product.required, Validators.required],
                //productAmount: [parseFloat(this.product.productAmount.toString().replace(' ', '').replace('.', '').replace(',', '.')), Validators.required],
                productAmount: [this.product.productAmount, Validators.required],
                typeAmount: [this.product.typeAmount, Validators.required],
                productCompanies: this.formBuilder.array([]),
                productTags: [this.product.productTags.map(item => item.id)],
            })
            this.model.id = this.product.id;
            this.model.name = this.product.name.trim();
            this.model.currentAmount = this.product.currentAmount;
            this.model.minAmount = this.product.minAmount;
            this.model.image = this.product.image;
            this.model.required = this.product.required;
            this.model.productAmount = this.product.productAmount;
            this.model.typeAmount = this.product.typeAmount;
            this.model.productCompanies = this.product.productCompanies as CompanyProduct[];
            this.model.productTags = this.product.productTags as TagProduct[];
        }
        else {
            this.isAddMode = true;
            this.productForm = formBuilder.group({
                name: ['', Validators.required],
                currentAmount: ['', Validators.required],
                minAmount: ['', Validators.required],
                image: [''],
                required: ['', Validators.required],
                productAmount: ['', Validators.required],
                typeAmount: ['', Validators.required],
                productCompanies: this.formBuilder.array([]),
                productTags: [''],
            })
            this.addCompany();
        }
        /*
        this.dropDownFormTag = this.formBuilder.group({
            myTags: [this.product.productTags]
        });
        */
        //this.products = [];
            console.log(this.product); 
    }
    ngOnInit(): void {
        this.selectedFile=false;
        this.getCompanies();
        this.getTags();
        this.getTypeUnits();
        this.addCompanies();
        //this.myImageBlob = this.dataURItoBlob();
        //let objectURL = URL.createObjectURL(this.myImageBlob);       
        //this.myImage = this.sant.bypassSecurityTrustUrl(objectURL);
        let objectURL = 'data:image/jpeg;base64,' + this.model.image;
        this.myImage =this.sant.bypassSecurityTrustUrl(objectURL);
        //this.checkTags();
    }

    onSelectNewFile(files:FileList | readonly File[]): void {
        this.selectedFile = true;
        this.fileSelected = files[0];
        this.myImage = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected));
    }

    
    convertFileToBase64():void {
        let reader = new FileReader();
        reader.readAsDataURL(this.fileSelected as Blob);
        reader.onloadend = () => {
            this.base64 = reader.result as string;
        }
    }

    /*
    dataURItoBlob() {

        const byteString = window.atob(this.model.image);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/png' });
        return blob;
    }
    */
     

    getTags(){
        this.apiTag.getTags().subscribe(response => {
          this.lstTags = response.data.value as TagProduct[];
        })
      }
    getCompanies(){
        this.apiCompany.getCompanies().subscribe(response => {
        this.lstCompanies = response.data.value as CompanyProduct[];
        })
    }

    get companiesForm() {
        return this.productForm.controls["productCompanies"] as FormArray;
    }

    addCompanies(){
        if(this.model.productCompanies.length >= 1)
        {
            this.model.productCompanies.forEach((element:CompanyProduct) => {
                //var x = parseFloat(element.price.toString().replace(' ', '').replace('.', '').replace(',', '.'));
                this.addCompanyValue(element.id, element.price);
            });
        }
        
    }

    numberOnly(event:KeyboardEvent): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        if(charCode != 188 && charCode != 37 && charCode != 39)
        {
            return false;
        }
      }
      return true;
  
    }

    addCompanyValue(companyId:number, companyPrice:number) {
        const companyForm = this.formBuilder.group({
            id: [companyId, Validators.required],
            price: [companyPrice, Validators.required]
        });
        this.companiesForm.push(companyForm);
    }

    addCompany() {
        const companyForm = this.formBuilder.group({
            id: ['', Validators.required],
            price: ['', Validators.required]
        });
        this.companiesForm.push(companyForm);
    }
    deleteCompany(companyIndex:number) {
        this.companiesForm.removeAt(companyIndex);
    }

    getTypeUnits(){
        this.apiType.getTypeUnits().subscribe(response => {
          this.lstTyp = response.data.value;
          this.lstTyp.forEach(element => {
            this.lstTypes.push(element as TypeUnit);
          });
        })
      }

    close(){
        this.dialogRef.close();
    }

    convertToModel(){
        this.modelToSend.id = this.model.id;
        this.modelToSend.name = this.productForm.value.name;
        this.modelToSend.currentAmount = this.productForm.value.currentAmount;
        this.modelToSend.minAmount = this.productForm.value.minAmount;
        if(this.selectedFile)
        {
            this.convertFileToBase64();
            this.modelToSend.image = this.base64.replace(/^data:image\/[a-z]+;base64,/, "");
        }
        else
        {
            this.modelToSend.image = this.model.image;
        }
        var x = parseFloat(this.productForm.value.productAmount.toString().replace(' ', '').replace('.', '').replace(',', '.'));
        this.modelToSend.productAmount = x;
        this.modelToSend.typeAmount = this.productForm.value.typeAmount;
        this.modelToSend.productCompanies = [];

        this.productForm.value.productCompanies.forEach((element:CompanyProduct) => {
            var z = parseFloat(element.price.toString().replace(' ', '').replace('.', '').replace(',', '.'));

            var x = {
                id:element.id,
                price:z
            }
            this.modelToSend.productCompanies.push(x);
        });
        this.modelToSend.productTags = [];
        if(this.productForm.value.productTags.length >= 1)
        {
            this.productForm.value.productTags.forEach((element:number) => {
                var x = {
                    id:element
                }
                this.modelToSend.productTags.push(x);
            });
        }
    }

    addSubmit(){
        this.convertToModel();
        if(this.isAddMode)
        {
            this.addProduct();
        }
        else
        {
            this.editProduct();
        }
    }

    addProduct(){
        this.apiProduct.add(this.modelToSend).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Product insertado con éxito','',{
                    duration: 2000
                });
            }
        });
    }

    editProduct(){
        this.apiProduct.edit(this.model.id,this.modelToSend).subscribe(response =>{
            if(response.success == 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Product editado con éxito','',{
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