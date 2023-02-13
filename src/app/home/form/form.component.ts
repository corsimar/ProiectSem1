import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/_core/services/projects.service';
import { Project } from 'src/app/_core/models/Project';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  addProjectForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.addProjectForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      leader: [null, [Validators.required, Validators.email]],
      teamSize: [
        null,
        [Validators.required, Validators.min(8), Validators.max(32)],
      ],
      release: [null, [Validators.required]],
      comments: [null],
    });
  }

  get title(): FormControl {
    return this.addProjectForm.get('title') as FormControl;
  }

  get leader(): FormControl {
    return this.addProjectForm.get('leader') as FormControl;
  }

  get teamSize(): FormControl {
    return this.addProjectForm.get('teamSize') as FormControl;
  }

  get release(): FormControl {
    return this.addProjectForm.get('release') as FormControl;
  }

  get comments(): FormControl {
    return this.addProjectForm.get('comments') as FormControl;
  }

  getDaysBetween(): void {
    const now = new Date();
    const date = new Date(this.release.value);
    const daysDiff = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysDiff < 30 || daysDiff > 365)
      this.release.setErrors({ incorrect: true });
    else this.release.setErrors(null);
  }

  verifyDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      return null;
    };
  }

  validForm(): boolean {
    return (
      this.title.valid &&
      this.leader.valid &&
      this.teamSize.valid &&
      this.release.valid &&
      this.comments.valid
    );
  }

  resetForm(): void {
    this.title.setValue(null);
    this.title.setErrors(null);
    this.leader.setValue(null);
    this.leader.setErrors(null);
    this.teamSize.setValue(null);
    this.teamSize.setErrors(null);
    this.release.setValue(null);
    this.release.setErrors(null);
    this.comments.setValue(null);
    this.comments.setErrors(null);
  }

  addProject(): void {
    let project: Project = {
      title: this.title.value,
      leader: this.leader.value,
      teamSize: this.teamSize.value,
      release: this.release.value,
      comments: this.comments.value,
    };
    this.projectsService.addProject(project).subscribe({
      next: (response) => {
        alert('The project has been successfully added!');
        this.resetForm();
      },
      error: () => {
        alert('The project could not be added!');
        this.resetForm();
      },
    });
  }

  goHome(): void {
    this.router.navigate(['/home/homepage']);
  }

  goAddProject(): void {
    this.router.navigate(['/home/form']);
  }

  goViewProjects(): void {
    this.router.navigate(['/home/table']);
  }

  signOut(): void {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('rememberMe');
    this.router.navigate(['/auth']);
  }
}
