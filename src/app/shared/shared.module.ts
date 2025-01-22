import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { QuoteComponent } from './components/quote/quote.component';
import { PersonCardComponent } from './components/person-card/person-card.component';

@NgModule({
    declarations: [
        QuoteComponent,
        PersonCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
    ],
    exports: [
       QuoteComponent,
       PersonCardComponent
    ]
})
export class SharedModule { }