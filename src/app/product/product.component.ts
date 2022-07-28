import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, tap } from 'rxjs';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { Company, CompanyProduct } from '../models/company';
import { MyProductModel, Product, ProductModel } from '../models/product';
import { ShoppingList } from '../models/shopping-list';
import { Tag, TagProduct } from '../models/tag';
import { TypeUnit } from '../models/type-unit';
import { ApiCompanyService } from '../services/apicompany.service';
import { ApiProductService } from '../services/apiproduct.service';
import { ApiShopService } from '../services/apishop.service';
import { ApiTagService } from '../services/apitag.service';
import { ApiTypeUnitService } from '../services/apitype-unit.service';
import { ShoppinglistService } from '../services/shoppinglist.service';
import { DialogProductComponent } from './dialog/dialogproduct.component';
import { DialogShopComponent } from './dialogShop/dialogshop.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public lstProductModels: ProductModel[] = [];
  public productModel?: ProductModel;
  

  public lstProductModelsShop: ShoppingList[] = [];
  public lstProductModelsTags: MyProductModel[] = [];
  public lstProductModelsCompanies: MyProductModel[] = [];

  public currentTag! :Tag;
  public currentCompany! :Company;

  public tagsVisible = false;
  public shopVisible = false;
  public companiesVisible = false;


  public lst: any[] = [];
  public lstTyp: any[] = [];
  public lstTypes: TypeUnit[] = [];
  public lstComp: any[] = [];
  public lstCompanies: Company[] = [];
  public lstTag: any[] = [];
  public lstTags: Tag[] = [];

  readonly width: string = '840px';
  readonly widthShop: string = '280px';
  public columnas: string[] = ['name','price','actions'];
  public columnasProducts: string[] = ['name','price'];
  constructor(
    private apiProduct: ApiProductService,
    private apiShop: ApiShopService,
    private apiType: ApiTypeUnitService,
    private apiCompany: ApiCompanyService,
    private apiTag: ApiTagService,
    private shoppinglistSvc: ShoppinglistService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
   }

  ngOnInit(): void {

    this.getTypeUnits();
    this.getCompanies();
    this.getTags();
    this.getShopList();
    //this.getProducts();
    //this.fillLists();

    /*
    this.lstProductModelsCompanies.forEach(comp=> {
      console.log(comp.lstModels);
    })
    console.log(this.lstProductModelsCompanies);
    console.log(this.lstProductModelsTags);
    */
  }
  
   getTypeUnits(){
    this.apiType.getTypeUnits().subscribe(response => {
      this.lstTyp = response.data.value;
      this.lstTyp.forEach(element => {
        this.lstTypes.push(element as TypeUnit);
      });
    });
  }
  
  
   getCompanies(){
    this.lstProductModelsCompanies = [];
    this.apiCompany.getCompanies().subscribe(response => {
      this.lstComp = [];
      this.lstCompanies = [];
      this.lstComp = response.data.value;
      this.lstComp.forEach(element => {
        this.lstCompanies.push(element as Company);
      });
      
      this.lstCompanies.forEach((e) => {
        
        this.apiCompany.getCompany(e.id).subscribe(response => {
          this.currentCompany = response.data.value;
          this.lstProductModels = [];

          
          let compParentModel:MyProductModel = {
            name:this.currentCompany.name,
            priority:Number(this.currentCompany.priority),
            lstModels: []
          }

          this.currentCompany.productModels.forEach(element => {
            var x = new ProductModel(element, this.lstTypes, this.lstCompanies);
            //this.enlistProducts(x);
            //this.lstProductModels.push(x);


            compParentModel.lstModels.push(x);
            compParentModel.lstModels.sort((n1,n2) => n1.name.localeCompare(n2.name));

          });
          
        this.lstProductModelsCompanies.push(compParentModel);
          this.lstProductModelsCompanies.sort((n1,n2) => n2.priority - n1.priority);
        });
      });
      
    });
  }

   getTags(){
    this.lstProductModelsTags = [];
    this.apiTag.getTags().subscribe(response => {
      this.lstTag = [];
      this.lstTags = [];
      this.lstTag = response.data.value;
      this.lstTag.forEach(element => {
        this.lstTags.push(element as Tag);
      });


        this.lstTags.forEach((e) => {
        
        this.apiTag.getTag(e.id).subscribe(response => {
          this.currentTag = response.data.value;
          this.lstProductModels = [];

          
          let tagParentModel:MyProductModel = {
            name:this.currentTag.name,
            priority:this.currentTag.priority,
            lstModels: []
          }

          this.currentTag.productModels.forEach(element => {
            var x = new ProductModel(element, this.lstTypes, this.lstCompanies);
            //this.enlistProducts(x);
            //this.lstProductModels.push(x);


            tagParentModel.lstModels.push(x);
            tagParentModel.lstModels.sort((n1,n2) => n1.name.localeCompare(n2.name));

          });
          
          this.lstProductModelsTags.push(tagParentModel);
          this.lstProductModelsTags.sort((n1,n2) => n2.priority - n1.priority);
        });
      });


    });
  }



  getShopList(){
    this.apiShop.getProducts().subscribe(response => {
      console.log(response);
      this.lst = response.data.value;
      
      
      this.lstProductModelsShop = [];
      this.lst.forEach(element => {
        var x = new ProductModel(element.productRequest, this.lstTypes, this.lstCompanies);
        element.amount = Number(element.amount);

        element.productRequest = x;
        this.lstProductModelsShop.push(element);
      });
      console.log(this.lstProductModelsShop);
      
      
    });
  }




  
   fillLists(){

    this.lstTags.forEach((e)=>
      {
        console.log(e);
        console.log(typeof(e));
        console.log(e.name);
        console.log("FILL LISTS NO VA", this.lstTags);
        this.lstTags.forEach((e) => {
        console.log("buclde de los tags");
        console.log(e);
        console.log(e.name);
        
        this.apiTag.getTag(e.id).subscribe(response => {
          console.log(response);
          this.currentTag = response.data.value;
          this.lstProductModels = [];
          console.log(this.currentTag);

          
          let tagParentModel:MyProductModel = {
            name:this.currentTag.name,
            priority:this.currentTag.priority,
            lstModels: []
          }

          this.currentTag.productModels.forEach(element => {
            console.log(element);
            var x = new ProductModel(element, this.lstTypes, this.lstCompanies);
            console.log(x);
            //this.enlistProducts(x);
            //this.lstProductModels.push(x);


            tagParentModel.lstModels.push(x);

          });
          
          this.lstProductModelsTags.push(tagParentModel);
        });
      });
    });
  }
  

  getProducts(){
    this.apiProduct.getProducts().subscribe(response => {
      this.lst = response.data.value;
      this.lstProductModels = [];
      this.lst.forEach(element => {
        var x = new ProductModel(element, this.lstTypes, this.lstCompanies);
        this.enlistProducts(x);
        this.lstProductModels.push(x);
      });
      //console.log(this.lstProductModels);
      /*
      this.lst.forEach(element => {
        element.TypeUnit = this.lstTypes.find(e=> e.id===element.TypeUnit)?.name;
      });
      */
    })
  }

  enlistProducts(myCurrentModel: ProductModel):void{
    //console.log(myCurrentModel);
    //console.log(myCurrentModel.productTags);
    myCurrentModel.productTags.forEach(tag => {
      //console.log(tag);
      let tagModel = this.lstProductModelsTags.find(myModel => myModel.name == tag.name);
      //console.log(tagModel);
      if(tagModel != null && !tagModel.lstModels.includes(myCurrentModel))
      {
        tagModel.lstModels.push(myCurrentModel);
      }
      else
      {
        let tagParentModel:MyProductModel = {
          name:tag.name,
          priority:0,
          lstModels: []
        }
        tagParentModel.lstModels.push(myCurrentModel);
        this.lstProductModelsTags.push(tagParentModel);
      }
    });

    myCurrentModel.productCompanies.forEach(company => {
      let companyModel = this.lstProductModelsCompanies.find(myModel => myModel.name == company.name);
      if(companyModel != null && !companyModel.lstModels.includes(myCurrentModel))
      {
        companyModel.lstModels.push(myCurrentModel);
      }
      else
      {
        let companyParentModel:MyProductModel = {
          name:company.name,
          priority:0,
          lstModels: []
        }
        companyParentModel.lstModels.push(myCurrentModel);
        this.lstProductModelsCompanies.push(companyParentModel);
      }
    });
  }



  openAdd(){
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getCompanies();
      this.getTags();
    });
  }

  openIncrement(product: ProductModel) {
    var company = this.lstCompanies.find(e=> e.name===product.defaultCompany)?.id as number;

    var x = {
      idProduct:product.id,
      idCompany:company,
      amount:1
    }
    this.apiShop.add(product.id,x as ShoppingList).subscribe(response => {
      this.getCompanies();
      this.getTags();
      this.getShopList();
    });
  }
  
  openDecrement(product: ProductModel) {
    var company = this.lstCompanies.find(e=> e.name===product.defaultCompany)?.id as number;

    var x = {
      idProduct:product.id,
      idCompany:company,
      amount:-1
    }
    this.apiShop.add(product.id,x as ShoppingList).subscribe(response => {
      this.getCompanies();
      this.getTags();
      this.getShopList();
    });
  }
  openIncrementShop(shopLst: ShoppingList) {
    shopLst.amount += 1;
    console.log(shopLst);
    console.log(shopLst.idProduct);
    this.apiShop.edit(shopLst.idProduct,shopLst).subscribe(response => {
      this.getCompanies();
      this.getTags();
      this.getShopList();
    });
  }
  
  openDecrementShop(shopLst: ShoppingList) {
    shopLst.amount -= 1;
    this.apiShop.edit(shopLst.idProduct,shopLst).subscribe(response => {
      this.getCompanies();
      this.getTags();
      this.getShopList();
    });
  }
  
  openShopList(product: ProductModel) {
    console.log("OBRIM SHOPLIST")
    let x = {
      "product": product,
      "companies": this.lstCompanies
    }
    const dialogRef = this.dialog.open(DialogShopComponent, {
      width: this.widthShop,
      data: x,
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getCompanies();
      this.getTags();
      this.getShopList();
    });
  }

  addToList(product: Product): void{
    this.shoppinglistSvc.updateList(product);
  }


  openEdit(product: ProductModel) {
    console.log("abrimo edit");
    console.log(product);
    this.apiProduct.getProduct(product.id).subscribe(response => {
      this.productModel = response.data.value as ProductModel;
      this.productModel.id = product.id;
      console.log("MY PRODUCT MODEL ISSSSSSSSSS "+this.productModel.name);
      const dialogRef = this.dialog.open(DialogProductComponent, {
        width: this.width,
        data: this.productModel
      });
      dialogRef.afterClosed().subscribe(result =>{
        this.getCompanies();
        this.getTags();
      });
    })
  }
  

  delete(product: ProductModel){
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result)
      {
        this.apiProduct.delete(product.id).subscribe(response =>{
          if(response.success == 1)
          {
            this.snackBar.open('Product eliminado con éxito','',{
              duration: 2000
            });
            this.getCompanies();
            this.getTags();
          }
        });
      }
    });
  }
}
