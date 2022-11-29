import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessagePosition, MessageType } from '../../admin/alertify.service';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../../ui/customtoastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {


  constructor(
    public dialog: MatDialog,
    private httpClientService: HttpClientService,
    private alertifyService : AlertifyService,
    private customToastrService: CustomtoastrService,
    private dialogService: DialogService) {}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name,_file,file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed:  () => {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({"responseType":"blob"}),
        }, fileData).subscribe(data => {
          const message: string = "Dosyalar başarıyla yüklenmiştir.";

          if(this.options.isAdminPage){
            this.alertifyService.message(message,{
              messageType: MessageType.Success,
              dismissOthers: true,
              position: MessagePosition.TopRight
            })
          } else {
            this.customToastrService.message(message,"Başarılı.",{
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            })
          }

        },(errorResponse: HttpErrorResponse) => {

          const errormessage = "Dosya yüklemesi başarısız oldu.";
          if(this.options.isAdminPage){
            this.alertifyService.message(errormessage,{
              messageType: MessageType.Error,
              dismissOthers: true,
              position: MessagePosition.TopRight
            })
          } else {
            this.customToastrService.message(errormessage,"Başarısız",{
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
          }

        });
      }
    });
  }
}

export enum FileUploadDialogState{
  Yes, No
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
