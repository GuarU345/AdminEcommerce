import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,AbstractControl } from '@angular/forms';
import { interval } from 'rxjs';
import { AdminServiceService } from 'src/app/admin-service.service';
import { category } from './Models/category';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  constructor(private adminserv:AdminServiceService) {
    
      this.adminserv.getCategories().subscribe((pet:any)=>{
        this.categories=pet
        console.log(this.categories)
    })
   }

   RegisterForm=new FormGroup({
    categoryname:new FormControl("",)
   })

  categories:category[]|undefined;
  category:category={
    "category_id":'',
    "category_name":''
  }
  
  createCategories(){
    const MyDates={
      'category_name':this.f['categoryname'].value
    }
    console.log(MyDates)
    this.adminserv.createCategories(MyDates).subscribe((data:any)=>{
        this.category=data
    })
    const contador=interval(0)
    contador.subscribe(()=>{
      this.adminserv.getCategories().subscribe((pet:any)=>{
        this.categories=pet
    })
    })
    
  }

  ngOnInit(): void {
  }

  get f():{[key:string]:AbstractControl}{return this.RegisterForm.controls}
}
