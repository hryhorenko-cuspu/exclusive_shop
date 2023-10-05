import { createReducer } from "@reduxjs/toolkit";
import { addItemToCart, removeItemFromCart, removeAllItemsFromCart } from '../actions/actions';
import {getLocalStorage, setLocalStorage} from '../../utils/localStorage';
import { IProductWithQuantity } from "../../interfaces/product.interface";

interface CartState {
	results: IProductWithQuantity[];
}

const initialState: CartState = {
	results: Object.values(getLocalStorage('cart')) || [],
}

const cart = createReducer(initialState, (builder) => {
		builder
			.addCase(addItemToCart, (state, action) => {
				const newItem = { ...action.payload } as IProductWithQuantity;
				const existingItemIndex = state.results.findIndex((item: IProductWithQuantity) => item.id === newItem.id);
				let updatedResults: IProductWithQuantity[] = [];

				if (existingItemIndex !== -1 && state.results.length !== 0) {
					updatedResults = state.results.map(item =>
						item.id === newItem.id ? { ...item, cartQuantity: item.cartQuantity + newItem.cartQuantity } : item
					);
				} else {
					updatedResults = [...state.results, newItem];
				}

				const updatedResultsObject: IProductWithQuantity[] = updatedResults.reduce((acc: IProductWithQuantity[], item) => {
					acc.push(item);
					return acc;
				}, []);

				setLocalStorage('cart', updatedResultsObject);

				return {
					...state,
					results: updatedResults,
				};
			})
			.addCase(removeItemFromCart, (state, action) => { 
				const idToRemove = action.payload;

				const updatedResults = state.results.filter((item) => item.id !== idToRemove);

				const updatedResultsObject: IProductWithQuantity[] = updatedResults.reduce((acc: IProductWithQuantity[], item) => {
					acc.push(item);
					return acc;
				}, []);

				setLocalStorage('cart', updatedResultsObject);

				return {
					...state,
					results: updatedResults,
				};
			})
			.addCase(removeAllItemsFromCart, () => {
				localStorage.removeItem('cart');
				return {
					results: []
				};
			})
			.addDefaultCase(state => state)
})


export default cart;