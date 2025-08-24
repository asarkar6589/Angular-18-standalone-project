import { Component, computed, effect, EventEmitter, Input, OnDestroy, Output, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseService } from '../../service/courses/course.service';
import { Course } from '../admin/admin.component';

// start from 6:08:14
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnDestroy {
  // @Input() courses: Course[] = [];

  /*
  
    So now we have to learn what is Signals. So all the properties that we created can be converted into Signal variables whise value is gonna change. If the values are not getting changed, then there is no requirment for Signals.

    Signal works as a Observable which detects the that where the changes are occured & angular will apply the changes only at that point. By doing this a lot of computational power is saved. 

    By using this, it will improve the performace & reduce the bundle size as well.

    Below you can see that we have converted courses into signal variable. But we will get one error in the HTML file, we wont be able to use it directly in the HTML.

    So courses is a WritableSignal. Now it became a method. So in the HTML, inside of the for loop, we have 
  
  */

  // courses: Course[] = [];
  courses = signal<Course[]>([]);

  coursesSub!: Subscription;

  @Input() deleteButton: boolean = false; // for admin it will be always true.
  @Output() delCourse = new EventEmitter();

  constructor(private courseService: CourseService) {
    // Now here we will be using @effect(). It will help us to automatically respond to changes in the service courses signal. But inside of the effect we cannot write any signal. But if we want to do it then we have to give one special property known as allowSignalWrites as true. We should avoid writing things inside of effect() because it's work is to react on changes not write on changes & if continious changes occur, then it might go to infinite loop.
    effect(() => {
      const coursesFromSignal = this.courseService.coursesSignal();
      
      if (coursesFromSignal !== this.courses()) {
        this.courses.set(coursesFromSignal);
        console.log('courses : ', this.courses());
      }
    }, {
      allowSignalWrites: true
    });
  }

  /* For Understading Signals */
  a: number = 1;
  b: number = 1;
  c: number = this.a + this.b;

  a1 = signal(1);
  b1 = signal(2);
  c1 = computed(() => this.a1() + this.b1());

  understandingSignalsWithExample() {
    // Basically the value of the c remains the same befor & after the changing the value of the 'a' variable. 
    console.log(this.c);
    this.a = 4;
    console.log(this.c);

    // checking with signals. Here the value of c1 is changed because we changed the value of a1.
    console.log(this.c1());
    this.a1.set(5);
    console.log(this.c1());
  }

  /*
  
    ngOnInit(): void {
      this.understandingSignalsWithExample();

      // this.courses = this.courseService.getCoursesFromLocalStorage();

      this.courses.set(this.courseService.getCoursesFromLocalStorage()); // while working with signals.

      // subscribe simply means we want to detect the value of the course if it is changed. So it will dynamically update the value if it changed. Now since the subscription is on, we also have to unsubscribe this because if we dont unsubscribe this then it will lead to memoy leakage.

      this.coursesSub = this.courseService.courses.subscribe({
        next: (data: Course[]) => {
          // this.courses = data;

          this.courses.set(data); // writable signal.
          console.log("From Subscription");
        },
        error: (e) => {
          console.log(e);
        }
      }); 
    }
  
  */

  ngOnDestroy(): void {
    // if (this.coursesSub) {
    //   this.coursesSub.unsubscribe();
    // }
  }

  deleteCourse(course: Course) {
    // Whatever the value of course is, we will emit it.
    // this.delCourse.emit(course);

    // using service
    this.courseService.deleteCourse(course);
  }
}
