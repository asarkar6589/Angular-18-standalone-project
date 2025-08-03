import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { FooterComponent } from "./Components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title: string = 'Angular standalone project';

  constructor() {
    // First this is called when the component is created.
    console.log('AppComponent constructor called');
  }

  ngOnInit() {
    /*
    
      Second this is called when the component is initialized. It's one of the lifecycle methods in Angular. The moment when the component is initialized.This method is called after the component's view has been fully initialized. This is very powefull feature of Angular. 

      But now what's happening is, angular is moving from these type of things. And that's the reason it provided us with this thing in app.config.ts file.

      provideZoneChangeDetection({
        eventCoalescing: true,
      })

      We can turn off the change detection by using this option & angular is moving towards this thing. So if change detection is turned off, then if we make any changes in the variable, then it will not be reflected in the view.
      
      So for this we have to use Signals. By using Singals, angular will be able to detect where the changes occurred and it will update the view accordingly. So as a result, the processing time of angular will be reduced and the performance will be improved and also bundle size will be reduced while bulding the application.
    
    */
    console.log('AppComponent ngOnInit called');
  }

  /*
  
    Angular waits that when the function will be called & it will change the title. Once the title is changed, angular will change it throughout the application wherever it is used. 

    So it will continiously detect the previous & the current value of the title & will change it in the view.
  
  */
  changeTitle() {
    this.title = 'Title changed! (standalone)';
  }
}
