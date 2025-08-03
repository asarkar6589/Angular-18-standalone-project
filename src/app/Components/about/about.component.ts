import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  // now i want to fetch the id from the url.

  private router = inject(ActivatedRoute); // this will give the information about the current route that is currently being loaded in the outlet.

  ngOnInit() {
    // we are passing id because in the routes file i have given the URL as '/about/:id'
    let id = this.router.snapshot.paramMap.get('id');
    console.log(id);

    // another way of getting the value of the id. Whenever values will be changed, it will subscribe & detect the changed value.
    this.router.params.subscribe({
      next: (data) => {
        console.log(data['id']);
      },
      error: (err: any) => {
        console.error('Error fetching query params:', err);
      },
    });
  }
}
