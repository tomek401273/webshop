import {ProductData} from './product-data';
import {Comment} from './comment';

export class ProductDataAmount extends ProductData {
  private _totalAmount: number;
  private _value: number;
  private _statusCode: string;
  private _statusMessage: string;
  private _sumMarks: number;
  private _countMarks: number;
  private _marksAverage: number;
  private _rated = false;
  private _commentDtos: Comment [];
  private _category: string;

  constructor(id: number, price: number, title: string, description: string, imageLink: string, totalAmount: number, statusCode: string, statusMessage: string) {
    super(id, price, title, description, imageLink);
    this._totalAmount = totalAmount;
    this._statusCode = statusCode;
    this._statusMessage = statusMessage;
  }

  get totalAmount() {
    return this._totalAmount;
  }

  set totalAmount(value) {
    this._totalAmount = value;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }


  get statusCode(): string {
    return this._statusCode;
  }

  set statusCode(value: string) {
    this._statusCode = value;
  }

  get statusMessage(): string {
    return this._statusMessage;
  }

  set statusMessage(value: string) {
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
}
