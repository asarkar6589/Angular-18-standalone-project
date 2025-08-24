import { Injectable, signal, WritableSignal } from '@angular/core';
import { StringEnum } from '../../enum/String';
import { Course } from '../../Components/admin/admin.component';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  /*
  
    **** Here we will not make variable like this. We will use behaviour subject ****

    coursesArr: Course[] = [];

    private courses$ = new BehaviorSubject<Course[]>([]);

    now to access & modify the value of the behavioural variable, we have to make getter() & setter(). Now we dont want to call these 2 function with parenthesis (like this : get() or set()). We want to call it as a property like this : get or set. So for that we have to use this syntax.

    get courses() {
      return this.courses$.asObservable();
    }
  
  */

  // Using RxJS
  private courses: WritableSignal<Course[]> = signal<Course[]>([]); // writable signal.

  // getter method to expose the courses signal as a read only signal
  get coursesSignal() {
    return this.courses.asReadonly();
  }

  constructor() {
    this.loadCourses(); // so whenever the service is created, this function will get executed.
  }

  /*
  
    public getCoursesFromLocalStorage(): Course[] {
      const data = localStorage.getItem(StringEnum.STORAGE_KEY);

      if (data) {
        this.updateCourse(JSON.parse(data));
        return JSON.parse(data);
      }

      return [];
    }
  
  */

  private setCoursesToLocalStorage(data: Course[]) {
    localStorage.setItem(StringEnum.STORAGE_KEY, JSON.stringify(data));
  }

  loadCourses() {
    const data = localStorage.getItem(StringEnum.STORAGE_KEY);

    if (data) {
      this.courses.set(JSON.parse(data));
    }
  }

  getCoursesFromLocalStorage(): Course[] {
    return this.courses();
  }

  /*
  
    public addCourse(formValue: any, image: string | undefined) {

      // Add the image to the form value
      formValue.image = image; 

      // Assign a unique ID based on the current length of the courses array
      formValue.id = this.courses$.value.length + 1; 

      let courses: Course[] = [...this.courses$.value, formValue];

      this.updateCourse(courses);
      this.setCoursesToLocalStorage(courses);
    }
  
  */
  public addCourse(formValue: any, image: string | undefined) {
    formValue.image = image;
    formValue.id = this.courses.length + 1;

    // Inside of the update() callback(), we will be getting the full courses
    this.courses.update((courses) => {
      let updatedCoursesArray = [...courses, formValue];
      this.setCoursesToLocalStorage(updatedCoursesArray);
      return updatedCoursesArray;
    });
  }

  /*
  
    public deleteCourse(course: Course) {
      let courses = this.courses$.value;

      courses = courses.filter((c: Course) => c.id !== course.id);

      // we have to update our behavioural subject also
      this.updateCourse(courses);

      this.setCoursesToLocalStorage(courses);
    }
  
  */

  public deleteCourse(course: Course) {
    // Inside of the update() callback(), we will be getting the full courses
    this.courses.update((courses) => {
      let updatedCoursesArray = courses.filter((c: Course) => c.id !== course.id);
      this.setCoursesToLocalStorage(updatedCoursesArray);
      return updatedCoursesArray;
    });
  }

  /*
  
    private updateCourse(data: Course[]): void {
      this.courses$.next(data);
    } 
  
  */
}

/*

We can inject this service in any component we want & all the public functions that are present here we can use it inside our component & can use it.

This file will contain all the functionalities of the course.

*/