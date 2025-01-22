import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { PersonDetails } from 'src/app/shared/services/personDetails.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public personId: string | null = null;
  public loading = true;
  public errorMessage: string | null = null;
  public userDetails: User;

  constructor(public PersonDetails: PersonDetails,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.personId = this.route.snapshot.params['id']
    if (this.personId) {
      this.PersonDetails.getDetailsById(this.personId).subscribe({
        next: (userDetails) => {
          this.loading = false;
          this.userDetails = userDetails;
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while loading user details.';
          if (error?.error?.error) {
            this.errorMessage = error.error.error;
            this.loading = false;
          }
        }
      });
    }
  }

  handleBack() {
    this.router.navigate(['/'], {
      queryParamsHandling: "merge"
    });
  }
}