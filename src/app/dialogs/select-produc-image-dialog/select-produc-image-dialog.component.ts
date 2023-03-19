import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductserviceService } from 'src/app/services/common/models/productservice.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-select-produc-image-dialog',
  templateUrl: './select-produc-image-dialog.component.html',
  styleUrls: ['./select-produc-image-dialog.component.scss']
})
export class SelectProducImageDialogComponent extends BaseDialog<SelectProducImageDialogComponent> implements OnInit{
  constructor(dialogRef : MatDialogRef<SelectProducImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProducImageState | string,
    private dialogService: DialogService,
    private productService: ProductserviceService) {
    super(dialogRef)
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png,.jpeg,.jpg",
    action: "/Upload",
    controller: "Product",
    explanation: "Ürün Resmini seçin veya buraya sürükleyin...",
    isAdminPage: true,
    queryString: `Id=${this.data}`
  }

  images: List_Product_Image[];

  async ngOnInit() {
    this.images = await this.productService.readİmages(this.data as string);
    console.log(this.images);
  }

  async deleteImage(imageId: string){
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        await this.productService.deleteImage(this.data as string,imageId);
      }
    });
  }

  showCase(imageId: string){
    debugger;
    this.productService.changeShowcaseImage(imageId, this.data as string, () => {

    });
  }
}


export enum SelectProducImageState{
  Close
}
