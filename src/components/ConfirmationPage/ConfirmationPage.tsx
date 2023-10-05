import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "../Header/Header";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeAllItemsFromCart, removeItemFromBuyNow } from '../../store/actions/actions';
import CartItem from '../CartItem/CartItem';
import store from '../../store/store';
import { IProductWithQuantity } from '../../interfaces/product.interface';
type RootState = ReturnType<typeof store.getState>


function ConfirmationPage() {
	const [order, setOrder] = useState<IProductWithQuantity[]>([]);
	const cart = localStorage.getItem('typeOfBuy') === 'addToCart'? (store.getState() as RootState).cart.results as IProductWithQuantity[]: (store.getState() as RootState).buyNow as IProductWithQuantity | null;
	const cartDispatch = useDispatch();
	let total = 0;

	const handleRemoveItems = () => {
		if (localStorage.getItem('typeOfBuy') === 'addToCart') {
			cartDispatch(removeAllItemsFromCart());
		} else {
			cartDispatch(removeItemFromBuyNow());
		}
	};
	
	useEffect(() => {
		const typeOfBuy = localStorage.getItem('typeOfBuy');

		if (typeOfBuy !== 'addToCart') {
			if (cart !== null) {
				setOrder([cart as IProductWithQuantity]);
			} else {
				setOrder([]);
			}
		} else {
			if (Array.isArray(cart)) {
				setOrder(cart);
			} else {
				setOrder([]);
			}
		}
		handleRemoveItems();
	}, []);

	return (
		<>
			<Header/>
			<div style={{display: 'flex', alignItems: 'center', marginTop: '10%', marginBottom: '3%'}}>
				<CheckCircleIcon sx={{color: '#74e8ae', width: '100px', height: '100px', margin: 'auto'}} fontSize="large" />
			</div>
			<div style={{color: '#74e8ae', fontSize: '40px', textAlign: 'center'}}>Thank you for your order!</div>
			<div style={{padding: '2% 10%'}}>
				{
					order.map(orderItem => {
						const subtotal = orderItem.price * orderItem.cartQuantity;

						total += subtotal;
						return (
							<CartItem key={orderItem.id} cartItem={orderItem} />
						)
					})
				}
				<div style={{float: 'right', fontWeight: 'bold', fontSize: '20px'}}>Total: {total} $</div>
			</div>
		</>
	)
}

export default ConfirmationPage;