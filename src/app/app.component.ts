import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
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

export class AppComponent implements OnInit {

  public planets: { name: string; color: string; radius: string; state: string; orbitState: string; orbitSpeed: string; spinSpeed: string }[] = [
    { name: 'Earth', color: 'cornflowerblue', radius: '200px', state: 'void', orbitState: 'void', orbitSpeed: '10000ms', spinSpeed: '2000ms' }
  ];

  constructor() { }

  ngOnInit() { }

  public onAnimationDone(event: AnimationEvent, index: number, state: string) {
    this.planets[index][state] = this.planets[index][state] === 'void' ? 'rotated' : 'void';
  }

  public orbitRadius(ballRadius): object {
    const numRadius = parseInt(ballRadius, 10);
    const radiusStyles = {
      'height': numRadius * 2 + 'px',
      'margin-top': -numRadius + 'px',
      'margin-left': -numRadius + 'px',
      'width': numRadius * 2 + 'px'
    };

    return radiusStyles;
  }
}
