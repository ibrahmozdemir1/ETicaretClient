import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $ : any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    public dialog: MatDialog,
    private alertify: AlertifyService,
    private httpClientService: HttpClientService
    ) {
      const img = _renderer.createElement("img");
      img.setAttribute("src","../../../../../assets/delete.png");
      img.setAttribute("style", "cursor: pointer;");
      img.width = 30;
      img.height = 30;
      _renderer.appendChild(element.nativeElement, img);

    }

    @Input() id: string;
    @Input() controller:string;
    @Output() callback: EventEmitter<any> = new EventEmitter();

    @HostListener("click")
    async onclick(){
      this.openDialog(async () => {
        const td : HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe(data => {
          $(td.parentElement).fadeOut(2000,() => {
            this.callback.emit();
            this.alertify.message("Ürün Başarıyla Silinmiştir.",{
              dismissOthers: true,
              messageType: MessageType.Success,
              position: MessagePosition.TopRight
            })
          });
        },(errorReponse: HttpErrorResponse) => {
          this.alertify.message("Ürün Silinemedi.",{
            dismissOthers: true,
            messageType: MessageType.Error,
            position: MessagePosition.TopRight
          })
        });
      });
    }

    openDialog(afterClosed: any): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '250px',
        data: DeleteState.Yes,
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result == DeleteState.Yes){
          afterClosed();
        }
      });
    }
}
