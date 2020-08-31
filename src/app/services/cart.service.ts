import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CartItem } from '../common/cart-item';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem): void {

    // カートの中にアイテムがあるかどうか確認
    let alreadyExistsInCart = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
        // アイテムIDに基づいてカートのアイテムを検索する
        existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
        // アイテムが見つかったかどうか確認
        alreadyExistsInCart = (existingCartItem !== undefined);
    }

    if (alreadyExistsInCart) {
      // quantity(量)にプラスする
      existingCartItem.quantity++;
    }
    else {
      // 配列にアイテムを追加
      this.cartItems.push(theCartItem);
    }

    // カートの合計金額と合計量を計算する
    this.computeCartTotals();

  }
  computeCartTotals(): void {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //  サブスクライバーがデータを使えるように新たにデータを作成
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // デバッグ用にデータを表示
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number): void {
    console.log('Contents fo the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`
        name: ${tempCartItem.name},
        quantity=${tempCartItem.quantity},
        unitPrice=${tempCartItem.unitPrice},
        subTotalPrice=${subTotalPrice}
      `);
      // toFixed... 小数点第二位までを表示
      console.log(`
        totalPrice: ${totalPriceValue.toFixed(2)},
        totalQuantity: ${totalQuantityValue}
      `);
      console.log('----------');
    }
  }
  decrementQuantity(theCartItem: CartItem): void {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem): void {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(
      tempCartItem => tempCartItem.id === theCartItem.id);

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
