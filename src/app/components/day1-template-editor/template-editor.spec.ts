import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditor } from './template-editor';

describe('TemplateEditor', () => {
  let component: TemplateEditor;
  let fixture: ComponentFixture<TemplateEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
