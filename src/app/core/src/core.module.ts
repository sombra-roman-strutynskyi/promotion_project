import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { environment } from '@env';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, AngularFireStorageModule],
  providers: [
    { provide: BUCKET, useValue: environment.firebase.storageBucket },
  ],

  exports: [HttpClientModule, AngularFireStorageModule],
})
export class CoreModule {}
