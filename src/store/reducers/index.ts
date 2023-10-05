import { combineReducers } from "redux";
import cart from "./CartReducer";
import wishlist from "./WishlistReducer";
import buyNow from "./BuyNowReducer";


export default combineReducers({
	cart,
	wishlist,
	buyNow
});