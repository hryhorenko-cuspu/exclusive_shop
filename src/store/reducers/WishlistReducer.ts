import { createReducer } from "@reduxjs/toolkit";
import { addItemToWishlist, removeItemFromWishlist } from '../actions/actions';
import {getLocalStorage, setLocalStorage} from '../../utils/localStorage';
import IProduct from "../../interfaces/product.interface";

interface CartState {
	results: IProduct[];
}

const initialState: CartState = {
	results: Object.values(getLocalStorage('wishlist')) || [],
}

const wishlist = createReducer(initialState, (builder) => {
		builder.addCase(addItemToWishlist, (state, action) => {
			const newItem = { ...action.payload } as IProduct;

			const updatedResults: IProduct[] = [...state.results, newItem];

			const updatedResultsObject: IProduct[] = updatedResults.reduce((acc: IProduct[], item) => {
				acc.push(item);
				return acc;
			}, []);

			setLocalStorage('wishlist', updatedResultsObject);

			return {
				...state,
				results: updatedResults,
			};
		})
		.addCase(removeItemFromWishlist, (state, action) => { 
			const idToRemove = action.payload;

			const updatedResults = state.results.filter((item) => item.id !== idToRemove);

			const updatedResultsObject: IProduct[] = updatedResults.reduce((acc: IProduct[], item) => {
				acc.push(item);
				return acc;
			}, []);

			setLocalStorage('wishlist', updatedResultsObject);

			return {
				...state,
				results: updatedResults,
			};
		})
		.addDefaultCase(state => state)
})


export default wishlist;