import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StringEnum } from '../../enum/String';
import { CoursesComponent } from '../courses/courses.component';

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

  image: string | undefined = '';
  showErrorWhenNoImageSelected: boolean = false;
  courses: Course[] = [];

  ngOnInit(): void {
    this.getCoursesFromLocalStorage();
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
      this.saveCourseToLocalStorage(form.value);
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

  saveCourseToLocalStorage(formValue: any) {
    formValue.image = this.image; // Add the image to the form value
    formValue.id = this.courses.length + 1; // Assign a unique ID based on the current length of the courses array
    this.courses = JSON.parse(localStorage.getItem(StringEnum.STORAGE_KEY) || '[]') as [];
    this.courses.push(formValue);
    this.setCoursesToLocalStorage();
  }

  getCoursesFromLocalStorage() {
    this.courses = JSON.parse(localStorage.getItem(StringEnum.STORAGE_KEY) || '[]') as [];
  }

  setCoursesToLocalStorage() {
    localStorage.setItem(StringEnum.STORAGE_KEY, JSON.stringify(this.courses));
  }

  deleteCourse(course:Course) {
    this.courses = this.courses.filter((c:Course) => c.id !== course.id);
    this.setCoursesToLocalStorage();
  }
}
