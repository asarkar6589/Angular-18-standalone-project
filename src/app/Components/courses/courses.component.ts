import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../admin/admin.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  @Input() courses: Course[] = [];

  @Input() deleteButton: boolean = false; // for admin it will be always true.
  @Output() delCourse = new EventEmitter();

  deleteCourse(course: Course) {
    // Whatever the value of course is, we will emit it.
    this.delCourse.emit(course);
  }
}
