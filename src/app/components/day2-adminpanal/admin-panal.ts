import { Component } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-admin-panal",
    styleUrl: './admin-panal.scss',
    templateUrl: './admin-panal.html',
    imports: [MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule, MatGridListModule, RouterModule]
})

export class AdminPanal {
    isToggle = false;

}