import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      transition('void => *', [
        animate('{{rotationSpeed}}', style({
          transform: 'rotate(360deg)'
        }))
      ]),
      transition('* => roatated', [
        animate('{{rotationSpeed}}', style({
          transform: 'rotate(360deg)'
        }))
      ])
    ])
  ]
})
export class AppComponent {
  state: string = 'void';
  rotationSpeed: string = '2000ms';

  onAnimationDone(event: AnimationEvent) {
    // if (event['fromState'] !== 'void') {
    // setTimeout(() => {
    this.state = this.state === 'void' ? 'rotated' : 'void';
    // }, 0);
    // }
  }
}
