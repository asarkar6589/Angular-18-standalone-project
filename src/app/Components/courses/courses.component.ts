import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Course } from '../admin/admin.component';
import { CourseService } from '../../service/courses/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit, OnDestroy{
  // @Input() courses: Course[] = [];

  courses: Course[] = [];
  coursesSub!: Subscription;

  @Input() deleteButton: boolean = false; // for admin it will be always true.
  @Output() delCourse = new EventEmitter();

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCoursesFromLocalStorage();

    // subscribe simply means we want to detect the value of the course if it is changed. So it will dynamically update the value if it changed. Now since the subscription is on, we also have to unsubscribe this because if we dont unsubscribe this then it will lead to memoy leakage.
    this.coursesSub = this.courseService.courses.subscribe({
      next: (data: Course[]) => {
        this.courses = data;
        console.log("From Subscription");
      },
      error: (e) => {
        console.log(e);
      }
    }); 
  }

  ngOnDestroy(): void {
    if (this.coursesSub) {
      this.coursesSub.unsubscribe();
    }
  }

  deleteCourse(course: Course) {
    // Whatever the value of course is, we will emit it.
    // this.delCourse.emit(course);

    // using service
    this.courseService.deleteCourse(course);
  }
}
