import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {

    // カートの合計金額をsubscribeによって取得
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    // カートの合計数をsubscribeによって取得
    this.cartService.totalQuantity.subscribe (
      data => this.totalQuantity = data
    );
  }

}
