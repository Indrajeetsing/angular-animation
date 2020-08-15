import { Injectable } from '@angular/core';
import { Planet } from './models/planet.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
  ) { }
  private planetArr: Planet[] = [
    { id: "123jkhk91823k", name: 'Earth', color: 'cornflowerblue', radius: 200, planetRadius: 25, state: 'void', orbitState: 'void', orbitSpeed: '10000ms', spinSpeed: '2000ms' }
  ];

  get planets(): Planet[] {
    return this.planetArr;
  }
}
