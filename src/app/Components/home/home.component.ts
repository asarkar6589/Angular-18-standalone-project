import { Component, OnInit } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component';
import { StringEnum } from '../../enum/String';
import { Course } from '../admin/admin.component';
import { AboutComponent } from "../about/about.component";

@Component({
  selector: 'app-home',
  standalone: true, // this thing is for lazy loading.
  imports: [CoursesComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  courses: Course[] = [];

  ngOnInit(): void {
    this.getCoursesFromLocalStorage();
  }

  getCoursesFromLocalStorage() {
    this.courses = JSON.parse(
      localStorage.getItem(StringEnum.STORAGE_KEY) || '[]'
    ) as [];
  }
}
