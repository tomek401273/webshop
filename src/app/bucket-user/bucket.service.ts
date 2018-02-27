import {ProductData} from "../product-row/ProductData";
import {EventEmitter} from "@angular/core";
import {BucketProduct} from "./bucket-product";
import {isUndefined} from "util";

export class BucketService {
  bucketStatus = new EventEmitter<String>();
}
