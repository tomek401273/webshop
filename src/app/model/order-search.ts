export class OrderSearch {
  productTitle: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  userLogin: string;

  constructor(productTitle: string, dateFrom: string, dateTo: string, status: string, userLogin: string) {
    this.productTitle = productTitle;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.status = status;
    this.userLogin = userLogin;
  }
}

