import { Component, Input } from '@angular/core';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent {
  @Input() quote: Quote = null;
}
