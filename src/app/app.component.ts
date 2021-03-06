import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { Planet } from './models/planet.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('rotateOrbit', [
      transition('void => *', [
        animate('{{rotationSpeed}} linear', style({
          transform: 'rotate(360deg)'
        }))
      ])
    ]),
    trigger('rotatePlanet', [
      transition('rotated => *', [
        animate('{{rotationSpeed}} linear', style({
          transform: 'rotate(360deg)'
        }))
      ])
    ])
  ]
})

export class AppComponent implements OnInit {

  public planets: Planet[] = [];

  public planetForm: FormGroup;

  constructor(private fb: FormBuilder, private appService: AppService, private _snackBar: MatSnackBar) {
    this.initializeForm();
    this.planets = this.appService.planets;
  }

  ngOnInit() { }

  public onAnimationDone(event: AnimationEvent, index: number, state: string) {
    if (this.planets.length) {
      setTimeout(() => {
        this.planets[index][state] = this.planets[index][state] === 'void' ? 'rotated' : 'void';
      }, 0);
    }
  }

  public calculateRadius(orbitRadius: number): object {
    // const numRadius = parseInt(ballRadius, 10);
    const radiusStyles = {
      'height': orbitRadius * 2 + 'px',
      'margin-top': -orbitRadius + 'px',
      'margin-left': -orbitRadius + 'px',
      'width': orbitRadius * 2 + 'px'
    };

    return radiusStyles;
  }

  public planetStyles(planetRadius: number, color: string) {
    const planetStyles: any = this.calculateRadius(planetRadius);
    planetStyles.background = color;
    return planetStyles;
  }

  private initializeForm() {
    this.planetForm = this.fb.group({
      id: [''],
      name: ['Venus', Validators.required],
      color: ['#b56b6b', Validators.required],
      radius: [100, Validators.min(64)],
      orbitSpeed: [30000, Validators.min(1000)],
      spinSpeed: [10000, Validators.min(1000)],
      planetRadius: [25, Validators.min(10)],
      state: ['void', Validators.required],
      orbitState: ['void', Validators.required],
    });
  }

  public savePlanet() {
    if (this.planetForm.valid) {
      const planet = this.planetForm.value;
      planet.orbitSpeed = `${planet.orbitSpeed}ms`;
      planet.spinSpeed = `${planet.spinSpeed}ms`;

      // if (planet.id) {
      //   console.log('coming');
      //   const pIndex = this.appService.planets.findIndex(p => p.id === planet.id);
      //   this.appService.planets[pIndex] = planet;
      // } else {
      planet.id = this.uuidv4();
      this.appService.planets.push(planet);
      this.openSnackBar(`${planet.name} planet has been added successfully.`, 'Close');
      // }

      this.initializeForm();
    }
  }

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public planetSelected(ev) {
    if (ev.value) {
      const planet = JSON.parse(JSON.stringify(ev.value));
      planet.orbitSpeed = parseInt(planet.orbitSpeed, 10);
      planet.spinSpeed = parseInt(planet.spinSpeed, 10);
      this.planetForm.setValue(planet, { onlySelf: true });
    } else {
      this.initializeForm();
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
