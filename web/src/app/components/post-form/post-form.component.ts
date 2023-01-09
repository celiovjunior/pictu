import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  @Input() btnText!: string

  constructor() {}

  ngOnInit(): void {

  }
}
