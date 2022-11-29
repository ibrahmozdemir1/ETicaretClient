import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { ProductserviceService } from 'src/app/services/common/models/productservice.service';

declare var $ : any;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService,private productService: ProductserviceService, private alertifyService: AlertifyService) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price','createDate','updateDate','delete','update'];
  dataSource : MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts : {totalCount : number; products : List_Product[]} = await this.productService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.BallAtom),
      errorMessage =>
      this.alertifyService.message(errorMessage, {
        dismissOthers : true,
        messageType : MessageType.Error,
        position: MessagePosition.TopRight
    }));
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
    console.log(allProducts.products);
  }

  /*delete(id,event){
    const img : HTMLImageElement = event.srcElement;
    $(img.parentElement.parentElement).fadeOut(2000);
  }*/

  async pageChanged(){
    await this.getProducts();
    console.log(this.getProducts());
  }

  async ngOnInit() {
    await this.getProducts();
  }

}
