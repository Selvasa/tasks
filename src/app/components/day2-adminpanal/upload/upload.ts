import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../users/user-panal.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-upload',
    imports: [MatButtonModule],
    templateUrl: './upload.html',
    styleUrl: './upload.scss',
})
export class Upload implements OnInit {
    users = signal<any | never>([])
    private userService = inject(UserService);
    constructor(private snack: MatSnackBar) { }

    showSuccess() {
        this.snack.open('Upload successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
        });
    }

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe((res: any) => {
            console.log(res)
            this.users.set(res)
        })
    }

    // download function
    downloadCSV() {
        const data = this.users();

        if (!data || data.length === 0) {
            alert("No users to download");
            return;
        }

        const headers = Object.keys(data[0]);
        const csvRows = [];

        csvRows.push(headers.join(','));

        for (const row of data) {
            const values = headers.map(h => row[h as keyof typeof row]);
            csvRows.push(values.join(','));
        }

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // upload function
    uploadCSV(event: any) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const text = reader.result as string;

            const rows = text.split('\n').map(r => r.trim()).filter(r => r !== '');
            const headers = rows[0].split(',');

            const parsedData = rows.slice(1).map(row => {
                const values = row.split(',');
                const obj: any = {};

                headers.forEach((header, i) => {
                    obj[header.trim()] = values[i]?.trim() || '';
                });
                return obj;
            });
            this.processUploadedData(parsedData);
        };
        reader.readAsText(file);
        this.showSuccess();
    }

    processUploadedData(uploadedUsers: any[]) {
        const existingUsers = this.users();

        let lastId = existingUsers.length? Math.max(...existingUsers.map((u: any) => u.id)): 0;
        const newUsers = uploadedUsers.filter(u =>
            !existingUsers.some((e: any) => e.email === u.email)
        );
        const updatedUsers = newUsers.map(u => {
            lastId++;
            return { ...u, id: lastId };
        });
        this.users.set([...existingUsers, ...updatedUsers]);
        updatedUsers.forEach(u => {
            this.userService.updateAllUsers(u).subscribe();
        });
    }



}
