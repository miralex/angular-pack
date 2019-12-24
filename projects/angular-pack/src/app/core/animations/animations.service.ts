import { Injectable } from '@angular/core';

export type RouteAnimationType = 'ALL' | 'PAGE' | 'ELEMENTS' | 'NONE';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  constructor() {
    AnimationsService.routeAnimationType = 'NONE';
  }

  private static routeAnimationType: RouteAnimationType = 'NONE';

  static isRouteAnimationsType = (type: RouteAnimationType): boolean =>
    AnimationsService.routeAnimationType === type;

  updateRouteAnimationType(
    pageAnimations: boolean,
    elementsAnimations: boolean
  ): void {
    AnimationsService.routeAnimationType =
      pageAnimations && elementsAnimations
        ? 'ALL'
        : pageAnimations
        ? 'PAGE'
        : elementsAnimations
        ? 'ELEMENTS'
        : 'NONE';
  }
}
