import {ProductData} from './product-data';
import {Comment} from './comment';

export class ProductDataAmount extends ProductData {
  private totalAmount: number;
  private value: number;
  private _statusCode: String;
  private _statusMessage: String;
  private sumMarks: number;
  private _countMarks: number;
  private _marksAverage: number;
  private rated = false;
  private _commentDtos: Comment [];
  private category: string;
  private _shortDescription: String[];

  constructor(id: number, price: number, title: String, description: String, imageLink: String) {
    super(id, price, title, description, imageLink);
    this.shortDescription = [];
  }

  toString(): string {
    return super.toString();
  }

  get getTotalAmount() {
    return this.totalAmount;
  }

  set setTotalAmount(value) {
    this.totalAmount = value;
  }

  get getValue() {
    return this.value;
  }

  set setValue(value) {
    this.value = value;
  }

  get statusCode(): String {
    return this._statusCode;
  }

  set statusCode(value: String) {
    this._statusCode = value;
  }

  set setStatusCode(value: String) {
    this._statusCode = value;
  }

  get statusMessage(): String {
    return this._statusMessage;
  }

  set statusMessage(value: String) {
    this._statusMessage = value;
  }

  set setStatusMessage(value: String) {
    this._statusMessage = value;
  }

  get getSumMarks(): number {
    return this.sumMarks;
  }

  set setSumMarks(value: number) {
    this.sumMarks = value;
  }

  get countMarks(): number {
    return this._countMarks;
  }

  set countMarks(value: number) {
    this._countMarks = value;
  }

  get marksAverage(): number {
    return this._marksAverage;
  }

  set marksAverage(value: number) {
    this._marksAverage = value;
  }

  get getRated(): boolean {
    return this.rated;
  }

  set setRated(value: boolean) {
    this.rated = value;
  }

  get commentDtos(): Comment[] {
    return this._commentDtos;
  }

  set commentDtos(value: Comment[]) {
    this._commentDtos = value;
  }

  set setCommentDtos(value: Comment[]) {
    this._commentDtos = value;
  }

  get getCategory(): string {
    return this.category;
  }

  set setCategory(value: string) {
    this.category = value;
  }

  get shortDescription(): String[] {
    return this._shortDescription;
  }

  set shortDescription(value: String[]) {
    this._shortDescription = value;
  }
}


