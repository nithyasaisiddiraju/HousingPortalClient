import { Component } from '@angular/core';
import {Service} from '../app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CSUN Housing Portal';
  constructor(private service: Service) { }
  ngOnInit(): void {
    this.service.sampleget();
  }
}
