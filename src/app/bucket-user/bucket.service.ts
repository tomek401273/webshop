import {ProductData} from '../model/product-data';
import {EventEmitter, Injectable} from '@angular/core';
import {ProductDataAmount} from '../model/product-data-amount';
import {isUndefined} from 'util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
Injectable()
export class BucketService {
   bucketStatus = new EventEmitter<String>();
}
