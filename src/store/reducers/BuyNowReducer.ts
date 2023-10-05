import { createReducer } from "@reduxjs/toolkit";
import { addItemToBuyNow, removeItemFromBuyNow } from '../actions/actions';

const buyNow = createReducer({}, (builder) => {
	builder
		.addCase(addItemToBuyNow, (state, action) => {
		return { ...action.payload } ;
		})
		.addCase(removeItemFromBuyNow, () => {
			return;
		})
		.addDefaultCase((state) => state);
  });
  


export default buyNow;