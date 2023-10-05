import { getLocalStorage, setLocalStorage } from "./localStorage";

const updateOrdersAndSales = (order) => {
	const existingOrders = getLocalStorage('orders') || {};
	console.log(existingOrders)

	for (const orderKey in existingOrders) {
		if (existingOrders.hasOwnProperty(orderKey)) {
		  const orderItems = existingOrders[orderKey];
	  
		  // Find the item with the specified itemId in the orderItems array
		  const itemToUpdate = orderItems.find(item => item.id === order.id);
	  
		  if (itemToUpdate) {
			// Update the sales count for the found item
			itemToUpdate.sales += order.cartQuantity;
		  }
		}
	  }
	  
	setLocalStorage('orders', existingOrders);
};

export default updateOrdersAndSales;
