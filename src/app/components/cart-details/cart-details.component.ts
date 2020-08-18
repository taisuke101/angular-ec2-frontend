import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;


  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //カートアイテムのハンドルを取得
    this.cartItems = this.cartService.cartItems;
    //カートの合計金額をサブスクライブ
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    //カートの合計量をサブスクライブ
      this.cartService.totalQuantity.subscribe(
        data => this.totalQuantity = data
      );
    //カートの合計金額と合計量を計算
      this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem)
  }

}