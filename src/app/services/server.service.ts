import {EventEmitter, Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {ProductData} from '../product-row/ProductData';
import {BucketData} from '../show-buket/BucketData';
import {Log} from "../auth/signin/Log";
import {
  HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams,
  HttpRequest,
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {observable} from "rxjs/symbol/observable";
import {map} from "rxjs/operators";

@Injectable()
export class ServerService {
  // private model = {
  //   password: '$2a$10$ee/Qv.MHjREpOYTq8ZKO5uXcFft4xrrL.q6V1Gb0Les.6Blt5cRCK',
  //   login: 'tomek'
  // };

  private model = {
    "login": "tomek",
    "password": "$2a$10$ee/Qv.MHjREpOYTq8ZKO5uXcFft4xrrL.q6V1Gb0Les.6Blt5cRCK"

  };

  // constructor(private http: Http) {
  // }

  constructor(private http: HttpClient) {
  }


  getProduct() {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem("token"));
    // const headers = new HttpHeaders().set('Authorization', 'Bearer afdklasflaldf');
    return this.http.get('http://localhost:8080/product/all', {
     headers: headers
    })

      .subscribe(
          (products: any[]) => console.log(products),
          (error) => console.log(error)
        );
  }


// .map(
// (response: Response) => {
//   const data = response.json();
//   console.log(data);
//   return data;
// })

  addNewProduct(product: ProductData) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8080/product/save/',
      product);
  }

  onTaskRemoved = new EventEmitter<ProductData>();

  removeProduct(product: ProductData) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://localhost:8080/product/deleteProduct',
      product);
  }

  updateTask(product: ProductData) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://localhost:8080/product/updateProduct',
      product);
  }

  getBuckets() {
    return this.http.get('http://localhost:8080/bucket/all.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }


  // onLogin(log: Log) {
  //
  //   let tokenUrl1 = "http://localhost:8080/login";
  //   console.log(this.model);
  //   let headers1 = new Headers({'Content-Type': 'application/json'});
  //   return this.http.post(tokenUrl1, this.model, {headers: headers1});
  //
  //
  // }
  //
  // onLogin(log: Log) {
  //   let url = "http://localhost:8080/login";
  //   let encodedCredentials = btoa("tomek"+":"+"$2a$10$ee/Qv.MHjREpOYTq8ZKO5uXcFft4xrrL.q6V1Gb0Les.6Blt5cRCK");
  //   let basicHeader = "Basic "+encodedCredentials;
  //   let headers = new Headers({
  //     'Content-Type' : 'application/json',
  //     'Authorization' : basicHeader
  //   });
  //
  //   return this.http.post(url, {headers: headers});
  // }

  onLogin() {
    let tokenUrl1 = "http://localhost:8080/login.json";
    let headers1 = new Headers({'Content-Type': 'application/json'});

    return this.http.post(tokenUrl1, this.model, {

      //headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b21layIsImV4cCI6MTUxODIxOTA0M30.c-fahesH_MFA3cq80CZXiepUuxrffD-3mzSh99z-X71ZZ5hZrBcxjb7wMSePQe-CFzn8RZGMzLjLuAFW4fGpXQ')
    })
      // .map(
      //   (recipes) => {
      //     console.log("lubie placki");
      //     console.log(recipes);
      //     return [];
      //   }
      // )
  }

      // .map((res: Response) => {
      //   const data = res.json();
      //   console.log("data" + data.status)
      // })
 // }
// {
//   observe: 'response',
//   responseType: 'text'
// })

  //
  // getRecipes() {
  //   // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
  //   this.http.get('https://udemy-ng-http-3c4ba.firebaseio.com/data.json', {
  //     observe: 'body',
  //     responseType: 'json'
  //   })
  //     .map(
  //       (recipes) => {
  //         console.log(recipes);
  //         for (let recipe of recipes) {
  //           if (!recipe['ingredients']) {
  //             recipe['ingredients'] = [];
  //           }
  //         }
  //         return recipes;
  //       }
  //     )
  //     .subscribe(
  //       (recipes: Recipe[]) => {
  //         this.recipeService.setRecipes(recipes);
  //       }
  //     );
  // }

}
