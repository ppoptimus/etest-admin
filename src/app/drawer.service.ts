import { MatDrawer } from '@angular/material/sidenav';
import { Injectable } from '@angular/core';

@Injectable()
export class DrawerService {
    private drawer: MatDrawer;


    public setDrawer(drawer: MatDrawer) {
        this.drawer = drawer;
    }

    public open() {
        return this.drawer.open();
    }


    public close() {
        return this.drawer.close();
    }

    public toggle(): void {
    this.drawer.toggle();
   }
  }
