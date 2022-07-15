import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { AricleModel } from './article-dashboard.model';
@Component({
  selector: 'app-article-dashboard',
  templateUrl: './article-dashboard.component.html',
  styleUrls: ['./article-dashboard.component.css']
})
export class ArticleDashboardComponent implements OnInit {

  formValue !:FormGroup;
  articleData  !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ArticleModelObj : AricleModel = new AricleModel;

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : [''],
      category : [''],
      price : [''],
      size : [''],
      comment : ['']
    })
    this.getAllArticles();
  }

  clickAddArticle(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postAricleDetails(){
    this.ArticleModelObj.name = this.formValue.value.name ;
    this.ArticleModelObj.category = this.formValue.value.category ;
    this.ArticleModelObj.price = this.formValue.value.price ;
    this.ArticleModelObj.size = this.formValue.value.size ; 
    this.ArticleModelObj.comment = this.formValue.value.comment ; 

    this.api.postArticle(this.ArticleModelObj)
    .subscribe(res=>{
      console.log(res);
      console.log(this.ArticleModelObj.comment);
      alert("article added succesfully")      
      this.formValue.reset();
      let ref = document.getElementById('cancel')
      this.getAllArticles();
      ref?.click();
    },
    err=>{
      alert("something went wrong");
    })
  }
  getAllArticles(){
    this.api.getArticle()
    .subscribe(res=>{
      this.articleData= res;
    })
  }
  deleteArticle(row : any){
    this.api.deleteArticle(row.id)
    .subscribe(res=>{
      alert("Article deleted");
      this.getAllArticles();
    })
  }
  OnEdit(row : any){
    this.ArticleModelObj.id = row.id; 
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['category'].setValue(row.category);
    this.formValue.controls['price'].setValue(row.price);
    this.formValue.controls['size'].setValue(row.size);
    this.formValue.controls['comment'].setValue(row.comment);
    this.showAdd = false;
    this.showUpdate = true;
  }
  updateArticleDetails(){
    this.ArticleModelObj.name = this.formValue.value.name ;
    this.ArticleModelObj.category = this.formValue.value.category ;
    this.ArticleModelObj.price = this.formValue.value.price ;
    this.ArticleModelObj.size = this.formValue.value.size ; 
    this.ArticleModelObj.comment = this.formValue.value.comment ; 
    this.api.updateArticle(this.ArticleModelObj,this.ArticleModelObj.id)
    .subscribe(res=>{
      alert("updated succefully");
      this.formValue.reset();
      let ref = document.getElementById('cancel')
      this.getAllArticles();
      ref?.click();
    })
  }
}
