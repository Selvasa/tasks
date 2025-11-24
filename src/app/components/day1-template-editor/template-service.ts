import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TemplateService {
    private http = inject(HttpClient)

    getTemplate() {
        return this.http.get("http://localhost:3000/templates");
    }
    getTemplateById(id: number) {
        return this.http.get(`http://localhost:3000/templates/${id}`)
    }
    updateTemplateById(id: number, payload: any) {
        return this.http.put("http://localhost:3000/templates/" + id, payload)
    }
}