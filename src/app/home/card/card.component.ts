import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_core/models/Project';
import { ProjectsService } from 'src/app/_core/services/projects.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  texts = [
    'Title',
    'Project leader',
    'Team size',
    'Project release',
    'Comments',
  ];
  array: Project[] = [];
  effect = 'scrollx';

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private router: Router
  ) {
    activatedRoute.queryParams.subscribe((response) => {
      this.getProjectDetails(response['projectID']);
    });
  }

  ngOnInit(): void {}

  getProjectDetails(projectID) {
    this.projectsService.getProjectByID(projectID).subscribe({
      next: (response) => {
        this.array = [
          response.title,
          response.leader,
          response.teamSize,
          response.release,
          response.comments,
        ];
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
