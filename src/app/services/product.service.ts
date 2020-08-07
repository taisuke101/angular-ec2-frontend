import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'

  private categoryUrl = 'http://localhost:8080/api/product-category'

  constructor(
    private httpClient: HttpClient
  ) { }

  getProduct(theProductId: number): Observable<Product> {
    
    // 商品idに基づくURLを作成する
    const productUrl = `${this.baseUrl}/${theProductId}`

    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    // カテゴリーIDに基づくURLを作成する
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]>{
    
    // 検索キーワードに基づくURLを作成する
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
    
    return this.getProducts(searchUrl);
  }

  //商品一覧から検索結果に対応する商品を取得する
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  //商品一覧からカテゴリーに対応する商品を取得する
  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[]
  }
}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
