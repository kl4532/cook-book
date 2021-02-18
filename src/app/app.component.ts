import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthorInfoDialogComponent} from './shared/author-info-dialog/author-info-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appName = 'cook-book';
  constructor(public dialog: MatDialog) {}

  openDialog(): any{
    this.dialog.open(AuthorInfoDialogComponent);
  }
}
