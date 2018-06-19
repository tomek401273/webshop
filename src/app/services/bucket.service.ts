import {EventEmitter, Injectable} from '@angular/core';

Injectable()
export class BucketService {
   bucketStatus = new EventEmitter<String>();
   buyAllProduct = new EventEmitter<boolean>();
}
