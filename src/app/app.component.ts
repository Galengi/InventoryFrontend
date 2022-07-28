import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatOptgroup } from '@angular/material/core';
import { Router } from '@angular/router';
import { Company } from './models/company';
import { Product, ProductModel } from './models/product';
import { Search, SearchModel } from './models/search';
import { Tag } from './models/tag';
import { TypeUnit } from './models/type-unit';
import { initUsuario, Usuario } from './models/usuario';
import { ApiauthService } from './services/apiauth.service';
import { ApiCompanyService } from './services/apicompany.service';
import { ApiSearchService } from './services/apisearch.service';
import { ApiTypeUnitService } from './services/apitype-unit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public toSearch: string = "";
  public searchModel!: SearchModel;
  public mySearch!: Search;
  public lstProductModels: ProductModel[] = [];
  public lst: any[] = [];

  
  public lstTyp: any[] = [];
  public lstTypes: TypeUnit[] = [];
  public lstComp: any[] = [];
  public lstCompanies: Company[] = [];


  title = 'app';
  usuario = {} as Usuario;

  constructor(public apiauthService: ApiauthService,
              public apisearchService: ApiSearchService,
              private apiType: ApiTypeUnitService,
              private apiCompany: ApiCompanyService,
              private router: Router){
    this.apiauthService.usuario.subscribe(res => {
      this.usuario = res;
      console.log("CAMBIO EL OBJETo: "+ res);
    })
  }
  ngOnInit(): void {
    this.getTypeUnits();
    this.getCompanies();
  }

  logout(){
    this.apiauthService.logout();
    this.router.navigate(['/login']);
  }

  
  getTypeUnits(){
    this.apiType.getTypeUnits().subscribe(response => {
      this.lstTyp = response.data.value;
      this.lstTyp.forEach(element => {
        this.lstTypes.push(element as TypeUnit);
      });
    })
  }
  
  
  getCompanies(){
    this.apiCompany.getCompanies().subscribe(response => {
      this.lstComp = response.data.value;
      this.lstComp.forEach(element => {
        this.lstCompanies.push(element as Company);
      });
    })
  }

  search(nombre:any)
  {
    if(nombre=="")
    {
      this.router.navigate(['/products']);
    }
    else
    {
      this.apisearchService.getSearch(nombre).subscribe(response => {
        if(response.success == 1)
        {
          this.mySearch = response.data.value as Search;
          this.lstProductModels = [];
  
          this.mySearch.products.forEach(element => {
            var x = new ProductModel(element, this.lstTypes, this.lstCompanies);
            this.lstProductModels.push(x);
          });
          this.searchModel = new SearchModel(this.mySearch, this.lstProductModels);
  
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/search'],{state:this.searchModel});
        }
      });
    }
    
  }
}
