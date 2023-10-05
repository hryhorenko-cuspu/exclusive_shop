import { IProductWithQuantity } from "../../interfaces/product.interface";

export default interface ICartItem {
	cartItem: IProductWithQuantity;
	handleRemoveFromCart?: (id: number) => void;
	type?: string;
}