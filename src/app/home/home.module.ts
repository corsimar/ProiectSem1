import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { TableComponent } from './table/table.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CardComponent } from './card/card.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    HomepageComponent,
    FormComponent,
    TableComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzIconModule,
    NzInputModule,
    NzTableModule,
    NzCarouselModule,
  ],
})
export class HomeModule {}
