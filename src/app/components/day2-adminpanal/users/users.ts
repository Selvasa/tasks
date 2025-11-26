import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService } from './user-panal.service';

@Component({
  selector: 'app-users',
  imports: [MatTableModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  users = signal([])
  private userService = inject(UserService);
  userColumns: string[] = ['id', 'name', 'email','role'];
  constructor() { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res: any) => {
      console.log(res)
      this.users.set(res)
    })
  }
}
