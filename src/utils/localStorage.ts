import { IFormData } from "../interfaces/formData.interface";
import { IFormDataDelivery } from "../interfaces/formDataDelivery.interface";
import IProduct, { IProductWithQuantity } from "../interfaces/product.interface";

export const getLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);

    if(data !== null) {
        return JSON.parse(data);
    }

    return {};
}

export const setLocalStorage = (key: string, data: IProduct[] | IProductWithQuantity[] | IFormData | IFormDataDelivery) => {
    localStorage.setItem(key, JSON.stringify(data));
}