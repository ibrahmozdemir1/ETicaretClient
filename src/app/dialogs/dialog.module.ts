import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { SelectProducImageDialogComponent } from './select-produc-image-dialog/select-produc-image-dialog.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        DeleteDialogComponent,
        SelectProducImageDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        FileUploadModule,
        FormsModule
    ]
})
export class DialogModule { }
