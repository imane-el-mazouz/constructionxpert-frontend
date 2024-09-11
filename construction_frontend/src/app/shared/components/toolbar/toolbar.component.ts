import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  userName = 'John Doe';
  userAvatarUrl = 'assets/user-avatar.png'; // Update this with the correct path to your avatar image

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    console.log('Logout clicked');
    // Implement logout logic here
  }
}
