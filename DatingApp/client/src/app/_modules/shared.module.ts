import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(), BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }) , 
    TabsModule.forRoot(), 
    NgxGalleryModule, 
    FileUploadModule, 
    BsDatepickerModule.forRoot(),
  ], 
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule, 
    NgxGalleryModule, 
    FileUploadModule, 
    BsDatepickerModule
  ]
})
export class SharedModule { }
