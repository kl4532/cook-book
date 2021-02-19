import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthorInfoDialogComponent} from './shared/author-info-dialog/author-info-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'cook-book';
  constructor(public dialog: MatDialog) {}

  openDialog(): void{
    this.dialog.open(AuthorInfoDialogComponent);
  }
}
