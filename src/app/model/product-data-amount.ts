import {ProductData} from './product-data';
import {Comment} from './comment';

export class ProductDataAmount extends ProductData {
  private _totalAmount: number;
  private _value: number;
  private _statusCode: String;
  private _statusMessage: String;
  private _sumMarks: number;
  private _countMarks: number;
  private _marksAverage: number;
  private _rated = false;
  private _commentDtos: Comment [];
  private _category: string;
  private _shortDescription: String[];

  constructor(id: number, price: number, title: String, description: String, imageLink: String) {
    super(id, price, title, description, imageLink);
    this.shortDescription = [];
    this.commentDtos = [];
  }

  toString(): string {
    return super.toString();
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  set totalAmount(value: number) {
    this._totalAmount = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get statusCode(): String {
    return this._statusCode;
  }

  set statusCode(value: String) {
    this._statusCode = value;
  }

  get statusMessage(): String {
    return this._statusMessage;
  }

  set statusMessage(value: String) {
    this._statusMessage = value;
  }

  get sumMarks(): number {
    return this._sumMarks;
  }

  set sumMarks(value: number) {
    this._sumMarks = value;
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

  get rated(): boolean {
    return this._rated;
  }

  set rated(value: boolean) {
    this._rated = value;
  }

  get commentDtos(): Comment[] {
    return this._commentDtos;
  }

  set commentDtos(value: Comment[]) {
    this._commentDtos = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  get shortDescription(): String[] {
    return this._shortDescription;
  }

  set shortDescription(value: String[]) {
    this._shortDescription = value;
  }
}


