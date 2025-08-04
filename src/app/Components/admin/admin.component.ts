import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StringEnum } from '../../enum/String';
import { CoursesComponent } from '../courses/courses.component';
import { CourseService } from '../../service/courses/course.service';

export interface Course {
  title: string;
  description: string;
  image: string | undefined;
  id: number | undefined;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, CoursesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  course: Course = {
    title: '',
    description: '',
    image: undefined,
    id: undefined
  };

  private courseService = inject(CourseService);
  showErrorWhenNoImageSelected: boolean = false;
  image: string | undefined = '';

  courses: Course[] = [];

  ngOnInit(): void {
    this.courses = this.courseService.getCoursesFromLocalStorage();
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.image) {
      form.control.markAllAsTouched(); // It will touch all the form fields.
      console.log('Form is invalid');

      if (!this.image) {
        this.showErrorWhenNoImageSelected = true;
      }
      return;
    } else {
      this.courseService.saveCourseToLocalStorage(form.value, this.image);
      form.control.reset(); // It will reset the form fields.
      this.image = undefined; // Reset the cover photo
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.showErrorWhenNoImageSelected = false;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const dataURL = reader.result?.toString();
        this.image = dataURL;
      };
      reader.readAsDataURL(file);
    }
  }

  getCoursesFromLocalStorage() {
    this.courses = JSON.parse(localStorage.getItem(StringEnum.STORAGE_KEY) || '[]') as [];
  }
}
