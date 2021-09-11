import { Component, OnInit } from '@angular/core';
//import { MenuItem } from 'primeng/api';
import {MegaMenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MegaMenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      { label: 'Veiculo', icon: 'pi pi-fw pi-circle-on', routerLink: ['/veiculos'] },
      { label: 'Condutor', icon: 'pi pi-fw pi-user', routerLink: ['/condutores'] },
      { label: 'Ordem de trafego', icon: 'pi pi-fw pi-file', routerLink: ['/ordstrafego'] }
    ];
  }

}
