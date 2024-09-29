import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashUserComponent } from "./features/dash-user/dash-user.component";
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatPaginator} from "@angular/material/paginator";
import {MatSelect} from "@angular/material/select";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NgForOf, NgIf} from "@angular/common";
import {ProjectCardComponent} from "./features/projects/project-card/project-card.component";
import {ProjectListComponent} from "./features/projects/project-list/project-list.component";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {StatCardComponent} from "./shared/components/stat-card/stat-card.component";
import {ToolbarComponent} from "./shared/components/toolbar/toolbar.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material/snack-bar";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {NavBarComponent} from "./shared/components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent ,DashUserComponent, FormsModule, MatButton, MatFormField, MatIcon, MatIconButton, MatInput, MatLabel, MatOption, MatPaginator, MatSelect, MatSidenav, MatSidenavContainer, MatSidenavContent, MatSuffix, NgForOf, NgIf, ProjectCardComponent, ProjectListComponent, SidebarComponent, StatCardComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'construction_frontend';

  ngOnInit(): void {
  }
  // private destroy$ = new Subject<void>();
  // isMobile = false;
  //
  // constructor(private breakpointObserver: BreakpointObserver,
  //             private snackBar: MatSnackBar) {
  //
  // }
  // ngOnInit(): void {
  //   this.breakpointObserver
  //     .observe([Breakpoints.Handset])
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(result => {
  //       this.isMobile = result.matches;
  //     });
  // }
  //
  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

}
