import { Component } from '@angular/core';
import { DocNav } from '../shared/doc-nav/doc-nav';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-documentation',
  imports: [DocNav, RouterModule, RouterOutlet],
  templateUrl: './documentation.html',
  styleUrl: './documentation.scss',
})
export class Documentation {
}
