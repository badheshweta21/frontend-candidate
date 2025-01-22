import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  colorList: { label: string, value: string | null, Selected?: boolean }[] = [
    { label: 'Select', value: '' },
    { label: 'Red', value: 'Red' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Green', value: 'Green' }
  ];
  loading: boolean = false;
  searchResults: User[];
  errorMessage: string | null = null;
  searchTerm: string;
  selectedColor: string;
  unsubscribe = new Subject();
  showNoResultsFoundMsg: boolean = false;

  constructor(public searchService: SearchService,
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search'] || params['color']) {
        this.searchTerm = params['search'] || '';
        this.selectedColor = params['color'] || '';
        this.search();
      }
    });
  }

  search(): void {
    this.errorMessage = null;
    this.loading = true;
    this.showNoResultsFoundMsg = true;
    this.searchService.searchForUsers(this.searchTerm, this.selectedColor).subscribe({
      next: (data: User[]) => {
        this.loading = false;
        this.searchResults = data;
      },
      error: (error) => {
        this.loading = false;
        this.searchResults = [];
        this.errorMessage = 'There is some error while searching person, please check again';
        if (error?.error?.error) {
          this.errorMessage = error.error.error;
        }
      }
    });
  }

  submitSearchForm() {
    if(this.searchTerm==='' && this.selectedColor===''){
      this.search();
    }
    this.router.navigate([], {
      queryParams: { search: this.searchTerm, color: this.selectedColor },
      queryParamsHandling: 'merge' // Preserve existing parameters
    });
  }

  searchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  colorOptionChange(color: string): void {
    this.selectedColor = color;
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }
}
