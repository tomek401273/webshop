import {ProductData} from '../product-row/ProductData';
import {EventEmitter, Injectable} from '@angular/core';
import {BucketProduct} from './bucket-product';
import {isUndefined} from 'util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
Injectable()
export class BucketService {
   bucketStatus = new EventEmitter<String>();
}
