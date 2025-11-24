import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { TemplateService } from './template-service';

@Component({
  selector: 'app-template-editor',
  imports: [NgxEditorModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './template-editor.html',
  styleUrl: './template-editor.scss',
})
export class TemplateEditor implements OnInit {

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic','underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list',],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  templates = signal([{ id: 0, name: 'Please Select Template...', value: '' }]);
  editMode = signal(false)
  selectedTemplate = signal(false);
  previewMode = signal(false);
  singleTemplate = signal({})

  private tempService = inject(TemplateService);
  private cdr = inject(ChangeDetectorRef)
  constructor() {
    this.editor = new Editor();
  }

  templateForm = new FormGroup({
    editContent: new FormControl('')
  })

  ngOnInit() {
    this.tempService.getTemplate().subscribe((res: any) => {
      this.templates.set(res);
    })
  }
  onSelectTemplate(value: any) {
    let id = value.target.value;
    this.tempService.getTemplateById(id).subscribe((res: any) => {
      this.singleTemplate.set(res)
      this.templateForm?.get("editContent")?.setValue(res.value);
      this.cdr.detectChanges()
    })
    if (id) {
      this.selectedTemplate.set(true)
      this.previewMode.set(true)
    }
    else {
      this.selectedTemplate.set(false)
      this.editMode.set(false)
      this.previewMode.set(false);

    }
  }
  enableEdit() {
    this.editMode.set(true)
  }

  updateTemplate(template: any) {
    let updatedValue = this.templateForm.get('editContent')?.value;
    const updatedData = {
      ...this.singleTemplate(),
      value: updatedValue
    };
    console.log(template)
    console.log(updatedData)

    this.tempService.updateTemplateById(template.id, updatedData).subscribe((res) => {
      this.selectedTemplate.set(true)
      this.previewMode.set(true)
      this.editMode.set(false)
    })
  }
}
