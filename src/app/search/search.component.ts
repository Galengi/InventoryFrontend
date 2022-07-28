import { Component, OnInit, Type } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Company } from '../models/company';
import { Product, ProductModel } from '../models/product';
import { Search, SearchModel } from '../models/search';
import { Tag } from '../models/tag';
import { TypeUnit } from '../models/type-unit';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public search!:SearchModel;
  public lstProducts: ProductModel[] = [];
  public lstCompanies: Company[] = [];
  public lstTags: Tag[] = [];
  

  navigationSubscription;

  constructor(private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
   }

  ngOnInit(): void {
  }
  initialiseInvites() {
    this.search = history.state;
    console.log(this.search);
    this.lstProducts = this.search.lstProducts as ProductModel[];
    this.lstCompanies = this.search.lstCompanies as Company[];
    this.lstTags = this.search.lstTags as Tag[];
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
