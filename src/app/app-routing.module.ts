import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CompanyComponent } from './company/company.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './security/auth.guard';
import { TagComponent } from './tag/tag.component';
import { TypeUnitComponent } from './type-unit/type-unit.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  {path: 'search', component: SearchComponent, canActivate:[AuthGuard] },
  {path: 'tag', component: TagComponent, canActivate:[AuthGuard] },
  {path: 'companies', component: CompanyComponent, canActivate:[AuthGuard] },
  {path: 'type-unit', component: TypeUnitComponent, canActivate:[AuthGuard] },
  {path: 'products', component: ProductComponent, canActivate:[AuthGuard] },
  //{path: 'chat', component: ChatComponent, canActivate:[AuthGuard] },
  {path: 'login', component: LoginComponent},
  //{ path: 'checkout', loadChildren: () => import('./ckeckout/ckeckout.module').then(m => m.CkeckoutModule) },
  {path: '**', redirectTo: '/products', pathMatch: 'full', runGuardsAndResolvers: 'always'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
