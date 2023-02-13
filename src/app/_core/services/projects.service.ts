import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  serverURL: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  addProject(body): Observable<any> {
    return this.httpClient.post(this.serverURL + '/projects', body);
  }

  deleteProject(projectID): Observable<any> {
    return this.httpClient.delete(this.serverURL + '/projects/' + projectID);
  }

  getProjectByID(projectID): Observable<any> {
    return this.httpClient.get(this.serverURL + '/projects/' + projectID);
  }

  getProjects(): Observable<any> {
    return this.httpClient.get(this.serverURL + '/projects');
  }
}
