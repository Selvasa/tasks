import { Routes } from '@angular/router';
import { HTMLEditor } from './components/day1-html-editor/html-editor';
import { Upload } from './components/day2-adminpanal/upload/upload';
import { Users } from './components/day2-adminpanal/users/users';

export const routes: Routes = [
    { path: "email-template", component: HTMLEditor },
    { path: "upload", component: Upload },
    { path: "users", component: Users }
];
