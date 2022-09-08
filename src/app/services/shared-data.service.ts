import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/shared';

@Injectable({
  providedIn: 'root'
})
  
  
  
export class InteractionService {
  private sidebarIsopen = new Subject<boolean>()
  private drawerIsopen = new Subject<boolean>()
  private accDrawerIsopen = new Subject<boolean>()
  private darkModeEnabled = new Subject<boolean>()
  private userInfo = new Subject<User>()
  
  userInfo$ = this.userInfo.asObservable()
  sidebarIsopen$ = this.sidebarIsopen.asObservable()
  drawerIsopen$ = this.drawerIsopen.asObservable()
  accDrawerIsopen$ = this.accDrawerIsopen.asObservable()
  darkModeEnabled$= this.darkModeEnabled.asObservable()

  constructor() { }

  toggleSidebar(message: boolean) {
      this.sidebarIsopen.next(message)
  }

  toggleDrawer(message: boolean) {
      this.drawerIsopen.next(message)
  }

  toggleAccDrawer(message: boolean) {
    this.accDrawerIsopen.next(message)
  }

  setUserData(message: User) {
    this.userInfo.next(message)
  }

  toggleDarkMode(message: boolean) {
    this.darkModeEnabled.next(message)
  }


}
