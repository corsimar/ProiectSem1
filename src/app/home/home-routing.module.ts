import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'form', component: FormComponent },
  { path: 'table', component: TableComponent },
  { path: 'card', component: CardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
