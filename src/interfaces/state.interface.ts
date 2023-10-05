import IProduct, { IProductWithQuantity } from "./product.interface";

export default interface IState {
	cart: {
		results: IProductWithQuantity[];
	};
	wishlist : {
		results: IProduct[]
	}
	buyNow: IProduct;
}