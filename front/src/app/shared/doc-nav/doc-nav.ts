import { TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import DocMenuList from './doc-menu.json';
import { Router } from "@angular/router";
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelMenuModule } from 'primeng/panelmenu';


@Component({
  selector: 'app-doc-nav',
  imports: [TieredMenuModule, PanelMenuModule, MatListModule],
  templateUrl: './doc-nav.html',
  styleUrl: './doc-nav.scss',
})
export class DocNav implements OnInit {
    readonly docMenuList = DocMenuList;
    activeLink: string | null = null;

    private router = inject(Router);

    ngOnInit(): void {
        this.activeLink = this.router.url;
    }
}
