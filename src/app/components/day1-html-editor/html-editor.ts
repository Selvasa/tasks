import { ChangeDetectorRef, Component, effect, inject, OnInit, signal, TemplateRef } from "@angular/core";
import { TemplateService } from "../day1-template-editor/template-service";
import { TemplateModel } from "./html-editor-model";
import { CommonModule, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { single } from "rxjs";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({ selector: "app-html-editor", styleUrl: './html-editor.scss', templateUrl: './html-editor.html', standalone: true, imports: [FormsModule] })
export class HTMLEditor implements OnInit {

    templates = signal<TemplateModel[]>([])
    templateValue!: SafeHtml;
    unsanitized_template_value = ``;
    templateId = signal(0);
    templateName = signal(0);
    isEdit = signal(false)
    isSave = signal(false)
    previewMode = signal(false);
    editMode = signal(false)

    private tempService = inject(TemplateService);
    private sanitizer = inject(DomSanitizer);
    private cdr = inject(ChangeDetectorRef)
    constructor() { }

    ngOnInit() {
        this.tempService.getTemplate().subscribe((res: any) => {
            this.templates.set(res);
        })
    }

    onSelectTemplate(data: any) {
        let id = data.target.value;
        this.templateId.set(id)
        this.tempService.getTemplateById(id).subscribe((res: any) => {
            let value = res.value.trim();
            this.unsanitized_template_value = value;
            let trim_value = this.sanitizer.bypassSecurityTrustHtml(value)
            this.templateName.set(res.name)
            this.templateValue = trim_value
            this.cdr.detectChanges()
        })
        if (id) {
            this.isEdit.set(true)
            this.previewMode.set(true);
            this.isSave.set(false);
            this.editMode.set(false)
        }
        else {
            this.isEdit.set(false)
        }

    }

    onEdit() {
        this.previewMode.set(false);
        this.isSave.set(true);
        this.isEdit.set(false);
        this.editMode.set(true)
    }
    updateValue(data: any) {
        const jsonString = JSON.stringify({ value: data.trim(), name: this.templateName() });
        this.tempService.updateTemplateById(this.templateId(), jsonString).subscribe((res: any) => {
            let value = res.value.trim();
            this.unsanitized_template_value = value
            let trim_value = this.sanitizer.bypassSecurityTrustHtml(value)
            this.templateValue = trim_value;
            this.isSave.set(false);
            this.isEdit.set(true);
            this.previewMode.set(true);
            this.editMode.set(false);
            this.cdr.detectChanges()
        })
    }
}