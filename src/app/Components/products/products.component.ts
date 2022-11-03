import { Component, OnInit,Input } from '@angular/core';
import { AdminServiceService } from 'src/app/admin-service.service';
import { product } from '../categories/Models/producto';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup,AbstractControl } from '@angular/forms';
import { category } from '../categories/Models/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories:category[]|undefined;
  category:category={
    "category_id":'',
   "category_name":'' 
  }
  
  products:product[]|undefined;
  product:product={
    "product_id":'',
    "product_name":'',
    "price":'',
    "quantity":'',
    "image":'',
    "categ_id":''
  }
  

  constructor(private prodserv:AdminServiceService,private router:Router) {
    this.prodserv.getCategories().subscribe((cat:any)=>{
      this.categories=cat
    })
    this.prodserv.getProducts().subscribe((data:any)=>{
      this.products=data
    })
    
   }

   RegisterForm=new FormGroup({
    prodname:new FormControl("",),
    precio:new FormControl("",),
    cantidad:new FormControl("",),
    imag:new FormControl("",),
    catid:new FormControl("",)
   })
   SelctCateg=new FormGroup({
    id:new FormControl("",)
   })
   UpdateForm=new FormGroup({
    prodname:new FormControl("",),
    precio:new FormControl("",),
    cantidad:new FormControl("",),
    imag:new FormControl("",),
    catid:new FormControl("",)
   })
   filterProd=new FormGroup({
     filtprod:new FormControl("",),  
     filtprice:new FormControl("",)  
   })
   
  

  ngOnInit(): void {
  }
  

  createProducts(){
      const MyDates={
        'product_name':this.f['prodname'].value,
        'price':this.f['precio'].value,
        'quantity':this.f['cantidad'].value,
        'image':this.f['imag'].value,
        'categ_id':this.f['catid'].value
      }
      this.prodserv.createProducts(MyDates).subscribe((data:any)=>{
        this.product=data
        alert("producto creado")
          this.prodserv.getProducts().subscribe((data:any)=>{
            this.products=data
        })
      })
  }
  getProductsByCateg(){
    const Id={
      'category_id':this.i['id'].value
    }
        this.prodserv.getProductsByCateg(Id.category_id).subscribe((pro:any)=>{
          this.products=pro
      })
  }

  deleteProduct(id:any){
    this.prodserv.deleteProduct(id).subscribe((del:any)=>{
      this.product=del
      alert("producto eliminado")
      this.prodserv.getProducts().subscribe((data:any)=>{
        this.products=data
      })
    })
  }

  productToUpdate(id:any){
    this.prodserv.getProductById(id).subscribe((prod:any)=>{
      this.product=prod
    })
  }
  updateProduct(id:any){
    const UpdateDates={
      'product_name':this.upd['prodname'].value,
      'price':this.upd['precio'].value,
      'quantity':this.upd['cantidad'].value,
      'image':this.upd['imag'].value,
      'categ_id':this.upd['catid'].value
    }
    this.prodserv.updateProduct(id,UpdateDates).subscribe((upd:any)=>{
      this.product=upd
      alert("producto actualizado")
      this.prodserv.getProducts().subscribe((data:any)=>{
        this.products=data
      })
    })
  }

  

  filterProduct(){
    const prod={
       'product_name':this.fil['filtprod'].value
    }
      this.prodserv.getProductByName(prod).subscribe((name:any)=>{
        this.products=name
   })
  }
  filterProductByPrice(){
    const prod={
      'price':this.fil['filtprice'].value
    }
    this.prodserv.getProductByPrice(prod).subscribe((price:any)=>{
      this.products=price
    })
  }

 

  get f():{[key:string]:AbstractControl}{return this.RegisterForm.controls}
  get i():{[key:string]:AbstractControl}{return this.SelctCateg.controls}
  get upd():{[key:string]:AbstractControl}{return this.UpdateForm.controls}
  get fil():{[key:string]:AbstractControl}{return this.filterProd.controls}
}
