import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PinchZoomDirective } from './pinch-zoom.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PinchZoomDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'img-pinch';
}
