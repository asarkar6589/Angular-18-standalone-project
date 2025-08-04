import { Injectable } from '@angular/core';
import { StringEnum } from '../../enum/String';
import { Course } from '../../Components/admin/admin.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // coursesArr: Course[] = []; // Here we will not make variable like this. We will use behaviour subject.
  private courses$ = new BehaviorSubject<Course[]>([]);

  // now to access & modify the value of the behavioural variable, we have to make getter() & setter(). Now we dont want to call these 2 function with parenthesis (like this : get() or set()). We want to call it as a property like this : get or set. So for that we have to use this syntax.
  get courses() {
    return this.courses$.asObservable();
  }

  constructor() { }

  public getCoursesFromLocalStorage(): Course[] {
    const data = localStorage.getItem(StringEnum.STORAGE_KEY);

    if (data) {
      this.updateCourse(JSON.parse(data));
      return JSON.parse(data);
    }

    return [];
  }

  public saveCourseToLocalStorage(formValue: any, image: string | undefined) {
    formValue.image = image; // Add the image to the form value
    formValue.id = this.courses$.value.length + 1; // Assign a unique ID based on the current length of the courses array

    let courses: Course[] = [...this.courses$.value, formValue];
    
    this.updateCourse(courses);
    this.setCoursesToLocalStorage(courses);
  }

  private setCoursesToLocalStorage(data: Course[]) {
    localStorage.setItem(StringEnum.STORAGE_KEY, JSON.stringify(data));
  }

  public deleteCourse(course:Course) {
    let courses = this.courses$.value;
    courses = courses.filter((c:Course) => c.id !== course.id);
    // we have to update our behavioural subject also
    this.updateCourse(courses);
    this.setCoursesToLocalStorage(courses);
  }

  private updateCourse(data: Course[]): void {
    this.courses$.next(data);
  }
}

/*

We can inject this service in any component we want & all the public functions that are present here we can use it inside our component & can use it.

This file will contain all the functionalities of the course.

*/