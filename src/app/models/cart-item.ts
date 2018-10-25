export class CartItem {

  prodIndex; // original item index from the products data list
  prodName;
  prodPrice;
  quantity;

  constructor(prodIndex: number, prodName: string, prodPrice: number) {
    this.prodIndex = prodIndex;
    this.prodName = prodName;
    this.prodPrice = prodPrice;
    this.quantity = 1;
  }
}
