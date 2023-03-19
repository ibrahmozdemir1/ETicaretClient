import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { BaseUrl } from 'src/app/contracts/baseUrl';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductserviceService } from 'src/app/services/common/models/productservice.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductserviceService,
    private activatedRoute: ActivatedRoute,
    private fileservice: FileService,
    ){
  }

  currentPageNo:number;

  totalProductCount: number;
  totalPageCount: number;
  pageSize: 12;

  pageList: number[] = [];
  baseUrl: BaseUrl;
  products: List_Product[];


  async ngOnInit() {
    this.baseUrl = await this.fileservice.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);


      const data = await this.productService.read(this.currentPageNo - 1,this.pageSize,
        () => {

        },
        errorMessage => {

      });



      this.products = data.products;

      this.products = this.products.map<List_Product>(p => {

        const listProduct: List_Product = {
          id: p.id,
          createDate: p.createDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase == true).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updateDate: p.updateDate,
          productImageFiles: p.productImageFiles,
        }
        return listProduct;
      });



      this.totalProductCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];


      if(this.currentPageNo - 3 <= 0){
        for(let i=1; i <= 7; i++){
          this.pageList.push(i);
        }
      }
      else if(this.currentPageNo + 3 >= this.totalPageCount){
        for(let i = this.totalPageCount - 6; i <= this.totalPageCount; i++){
          this.pageList.push(i);
        }
      }
      else{
        for(let i = this.currentPageNo -3; i <= this.currentPageNo + 3; i++){
          this.pageList.push(i);
        }
      }
    });
  }

}
