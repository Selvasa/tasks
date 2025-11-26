import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
    private http = inject(HttpClient)

    getAllUsers() {
        return this.http.get("http://localhost:3000/users");
    }
    updateAllUsers(data: any) {
        return this.http.post("http://localhost:3000/users", data)
    }

}