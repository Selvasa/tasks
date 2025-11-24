import { Component } from '@angular/core';
import { TemplateEditor } from './components/day1-template-editor/template-editor';

@Component({
  selector: 'app-root',
  imports: [TemplateEditor],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
