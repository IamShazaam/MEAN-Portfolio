import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { GithubServiceService } from '../github-service.service';

@Component({
  selector: 'app-github-feed',
  templateUrl: './github-feed.component.html',
  styleUrls: ['./github-feed.component.scss']
})
export class GithubFeedComponent implements OnInit {

  public repos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer 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' });
    this.http.get<any[]>('https://api.github.com/user/repos', { headers }).subscribe(
      (repos) => {
        console.log(repos); // Log the response to the console
        this.repos = repos.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
