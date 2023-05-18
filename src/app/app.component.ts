import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLinkActive,
  RouterLinkWithHref,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'hd-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
