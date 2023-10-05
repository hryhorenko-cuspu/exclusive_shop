import { createAction } from "@reduxjs/toolkit";
import IProduct, { IProductWithQuantity } from "../../interfaces/product.interface";

export const addItemToWishlist = createAction<IProduct>('ADD_ITEM_TO_WISHLIST');
export const removeItemFromWishlist = createAction<number>('REMOVE_ITEM_FROM_WISHLIST');
export const loadFromLocalStorage = createAction('LOAD_FROM_LOCALSTORAGE');
export const addItemToCart = createAction<IProductWithQuantity>('ADD_ITEM_TO_CART');
export const removeItemFromCart = createAction<number>('REMOVE_ITEM_FROM_CART');
export const removeAllItemsFromCart = createAction('REMOVE_ALL_ITEMS_FROM_CART');
export const addItemToBuyNow = createAction<IProductWithQuantity>('ADD_ITEM_TO_BUY_NOW');
export const removeItemFromBuyNow = createAction('REMOVE_ITEM_FROM_BUY_NOW');