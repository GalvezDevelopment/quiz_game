import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

const materialModules = [
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatRadioModule,
  MatCheckboxModule
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
  declarations: [],
  providers: [],
})
export class SharedModule {
}
