import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private httpclient:HttpClient) { }

  getCategories(){
    return this.httpclient.get('http://127.0.0.1:3333/getcategs')
  }
  createCategories(category:any){
    return this.httpclient.post('http://127.0.0.1:3333/crtcateg',category)
  }
  getProducts(){
    return this.httpclient.get('http://127.0.0.1:3333/getprods')
  }
  getProductsByCateg(id:any){
      return this.httpclient.get(`http://127.0.0.1:3333/getprodsforcateg/${id}`)
  }
  
  createProducts(prod:any){
    return this.httpclient.post('http://127.0.0.1:3333/crtprod',prod)
  }

  deleteProduct(id:any){
    return this.httpclient.delete(`http://127.0.0.1:3333/delprod/${id}`)
  }
  updateProduct(id:any,prod:any){
    return this.httpclient.put(`http://127.0.0.1:3333/updprod/${id}`,prod)
  }
  getProductById(id:any){
    return this.httpclient.get(`http://127.0.0.1:3333/getprod/${id}`)
  }
  getProductByName(prod:any){
    return this.httpclient.post('http://127.0.0.1:3333/getprodname',prod)
  }
  getProductByPrice(pric:any){
    return this.httpclient.post('http://127.0.0.1:3333/getprodprice',pric)
  }
}
