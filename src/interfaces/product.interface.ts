import ICategory from "./category.interface"

export default interface IProduct {
	id: number
	title: string
	price: number
	description: string
	category: ICategory
	images: string[]
}

export interface IProductWithQuantity extends IProduct{
	cartQuantity: number;
}