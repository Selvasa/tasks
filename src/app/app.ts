import { Component } from '@angular/core';
import { TemplateEditor } from './components/day1-template-editor/template-editor';
import { HTMLEditor } from './components/day1-html-editor/html-editor';

@Component({
  selector: 'app-root',
  imports: [TemplateEditor,HTMLEditor],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
