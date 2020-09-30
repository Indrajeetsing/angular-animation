import { Injectable } from '@angular/core';
import { Planet } from './models/planet.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
  ) { }
  private planetArr: Planet[] = [
    { id: "123jkhk91823k", name: 'Earth', color: 'cornflowerblue', radius: 150, planetRadius: 24, state: 'void', orbitState: 'void', orbitSpeed: '40000ms', spinSpeed: '10000ms' }
  ];

  get planets(): Planet[] {
    return this.planetArr;
  }
}
