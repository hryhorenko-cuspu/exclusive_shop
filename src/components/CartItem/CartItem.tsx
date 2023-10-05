import { Link } from 'react-router-dom';
import NotFound from '../../assets/product_not.png';
import ICartItem from './CartItem.props';

import style from './styles.module.css';

function CartItem ({cartItem, handleRemoveFromCart, type = 'confirm'}: ICartItem) {
	return (
		<>
			<div key={cartItem.id} className={style.products}>
				<div className={style.productImage} style={{width: '300px'}}>
					<img src={cartItem.images[0]} alt={cartItem.title}
						onError={(e) => {
						const imgElement = e.target as HTMLImageElement;
						imgElement.src = NotFound;
					}} />
					<Link to={`/products/${cartItem.category.id}/${cartItem.id}`}><h3>{cartItem.title}</h3></Link>
				</div>
				<div className={style.price}>$ {cartItem.price}</div>
				<div className={style.quantity}>{cartItem.cartQuantity}</div>
				<div className={style.subtotal}>
					<div>$ {cartItem.price * cartItem.cartQuantity}</div>
					{type !== 'confirm' && 
						<div onClick={() => handleRemoveFromCart(cartItem.id)} style={{cursor: 'pointer'}}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M20 5.57143H5.33333L6.66667 21H17.3333L18.6667 5.57143H4M12 9.42857V17.1429M15.3333 9.42857L14.6667 17.1429M8.66667 9.42857L9.33333 17.1429M9.33333 5.57143L10 3H14L14.6667 5.57143" stroke="black" strokeWidth="1.56" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</div>
					}
				</div>
			</div>
		</>
	)
}

export default CartItem;