import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/_core/models/Project';
import { ProjectsService } from 'src/app/_core/services/projects.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  columns = [
    {
      title: 'Title',
      compare: (a: Project, b: Project) => a.title.localeCompare(b.title),
      priority: 1,
    },
    {
      title: 'Project leader',
      compare: (a: Project, b: Project) => a.leader.localeCompare(b.leader),
      priority: 1,
    },
    {
      title: 'Team size',
      compare: (a: Project, b: Project) => a.teamSize - b.teamSize,
      priority: 1,
    },
    {
      title: 'Project release',
      compare: (a: Project, b: Project) =>
        this.compareDates(a.release, b.release),
      priority: 1,
    },
    {
      title: 'Comments',
      compare: (a: Project, b: Project) => a.comments.localeCompare(b.comments),
      priority: 1,
    },
    {
      title: 'Actions',
      priority: false,
    },
  ];
  projectsList: Project[] = [];
  searchText: string;
  inputObj: any = null;

  constructor(
    private projectsService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  compareDates(date1, date2): number {
    const y1 = parseInt(date1.substring(0, 4));
    const m1 = parseInt(date1.substring(5, 7));
    const d1 = parseInt(date1.substring(8));

    const y2 = parseInt(date2.substring(0, 4));
    const m2 = parseInt(date2.substring(5, 7));
    const d2 = parseInt(date2.substring(8));

    if (y1 == y2) {
      if (m1 == m2) {
        if (d1 == d2) return 0;
        else return d1 - d2;
      } else return m1 - m2;
    } else return y1 - y2;
  }

  deleteProject(projectID): void {
    projectID = projectID.id;
    this.projectsService.deleteProject(projectID).subscribe({
      next: (response) => {
        this.getProjects();
      },
    });
  }

  getProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: (response) => {
        this.projectsList = response;
      },
    });
  }

  formatSearch(event) {
    this.searchText = event.target.value;
    if (this.inputObj == null) this.inputObj = event.target;
  }

  search(): void {
    let auxList = this.projectsList;
    this.projectsList = [];
    for (let i = 0; i < auxList.length; i++) {
      console.log(auxList[i].title + ' ' + this.searchText);
      if (
        auxList[i].title.toUpperCase().includes(this.searchText.toUpperCase())
      )
        this.projectsList.push(auxList[i]);
    }
  }

  reset(event): void {
    this.getProjects();
    this.searchText = null;
    this.inputObj.value = '';
  }

  viewProject(data): void {
    this.router.navigate(['/home/card'], {
      queryParams: { projectID: data.id },
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
