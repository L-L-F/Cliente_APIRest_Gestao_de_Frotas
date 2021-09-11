import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondutorComponent } from './condutor/condutor.component';
import { HomeComponent } from './home/home.component';
import { OrdtrafegoComponent } from './ordtrafego/ordtrafego.component';
import { VeiculoComponent } from './veiculo/veiculo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'veiculos', component: VeiculoComponent },
  { path: 'condutores', component: CondutorComponent },
  { path: 'ordstrafego', component: OrdtrafegoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
