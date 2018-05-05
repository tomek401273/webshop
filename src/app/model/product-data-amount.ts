import {ProductData} from './product-data';
import {Comment} from './comment';

export class ProductDataAmount extends ProductData {
  private totalAmount: number;
  private value: number;
  private statusCode: string;
  private statusMessage: string;
  private sumMarks: number;
  private countMarks: number;
  private marksAverage: number;
  private rated = false;
  private commentDtos: Comment [];
  private category: string;

  constructor(id: number, price: number, title: string, description: string, imageLink: string, totalAmount: number, statusCode: string, statusMessage: string) {
    super(id, price, title, description, imageLink);
    this.totalAmount = totalAmount;
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
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


  get getStatusCode(): string {
    return this.statusCode;
  }

  set setStatusCode(value: string) {
    this.statusCode = value;
  }

  get getStatusMessage(): string {
    return this.statusMessage;
  }

  set setStatusMessage(value: string) {
    this.statusMessage = value;
  }

  get getSumMarks(): number {
    return this.sumMarks;
  }

  set setSumMarks(value: number) {
    this.sumMarks = value;
  }

  get getCountMarks(): number {
    return this.countMarks;
  }

  set setCountMarks(value: number) {
    this.countMarks = value;
  }

  get getMarksAverage(): number {
    return this.marksAverage;
  }

  set setMarksAverage(value: number) {
    this.marksAverage = value;
  }

  get getRated(): boolean {
    return this.rated;
  }

  set setRated(value: boolean) {
    this.rated = value;
  }

  get getCommentDtos(): Comment[] {
    return this.commentDtos;
  }

  set setCommentDtos(value: Comment[]) {
    this.commentDtos = value;
  }

  get getCategory(): string {
    return this.category;
  }

  set setCategory(value: string) {
    this.category = value;
  }
}
