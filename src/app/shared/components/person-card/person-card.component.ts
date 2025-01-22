import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {
  @Input() person: User | null = null;

  constructor( private router: Router ) { }

  handleClick(id) {
    this.router.navigate(['/details', id], {
      queryParamsHandling: "merge"
    });
  }
}