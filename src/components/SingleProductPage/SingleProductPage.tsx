import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import IProduct, { IProductWithQuantity } from '../../interfaces/product.interface';
import { getSingleProduct } from '../../services/Api';
import notFound from '../../assets/product_not.png';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, addItemToWishlist, removeItemFromWishlist, addItemToBuyNow, removeItemFromCart } from '../../store/actions/actions';
import StepContext from '../StepsProvider/StepsProvider';

import style from './styles.module.css';
import IState from '../../interfaces/state.interface';


function SingleProductPage () {
	const { categoryId, productId } = useParams();
	const [singleProduct, setSingleProduct] = useState<IProduct>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [cartQuantity, setCartQuantity] = useState(1);
	const [wishlist, setWishlist] = useState(false);
	const storeDataWishlist = useSelector((state: IState) => state.wishlist.results);
	const stepContext = useContext(StepContext);

	if (!stepContext) {
		throw new Error(
			"stepContext has to be used within <Provider>"
		);
	}
	const {nextStep} = stepContext;
	const navigator = useNavigate();

	const dispatch = useDispatch();

	const dispatchFavouritePeople = () => {
		if(singleProduct) {
			if (wishlist) {
				dispatch(removeItemFromWishlist( singleProduct.id ));
				setWishlist(false);
			} else {
				dispatch(addItemToWishlist( singleProduct ));
				setWishlist(true);
			}
		}
	}

  
	const handleQuantityChange = (newQuantity: number) => {
		setCartQuantity(newQuantity);
	};

	const handleBuyNow = () => {
		const productWithCartQuantity = {
			...singleProduct,
			cartQuantity,
		};
		nextStep();
		navigator('/cart/form');
		localStorage.setItem('typeOfBuy', 'buyNow');
		if(productWithCartQuantity && singleProduct) {
			dispatch(addItemToBuyNow( productWithCartQuantity as IProductWithQuantity ));
			dispatch(removeItemFromCart( singleProduct.id ));
			dispatch(removeItemFromWishlist( singleProduct.id ));
		}
		setWishlist(false);
	}

	const handleAddToCart = () => {
		const productWithCartQuantity = {
			...singleProduct,
			cartQuantity,
		};
		localStorage.setItem('typeOfBuy', 'addToCart');
		dispatch(addItemToCart( productWithCartQuantity as IProductWithQuantity ));
		singleProduct && dispatch(removeItemFromWishlist( singleProduct.id ));
		setWishlist(false);
	}

	useEffect(() => {
		(async () => {
			try {
				let data;
				if(productId) data = await getSingleProduct(+productId);

				if(!(data instanceof Error)) {
					setSingleProduct(data);
				}
				storeDataWishlist.forEach(item => {
					if(productId) {
						if (item.id === +productId) setWishlist(true);
					}
					else setWishlist(false);
				});

				setLoading(false)
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		}) ();
	}, []);


	return (
		<div style={{color: 'black'}}>
			<Header/>
			<div className={style.wrapper}>
				{!error? (
					<>
						<div className={style.breadcrumbs}>
							<Link to="/">Home</Link>
							<span> / </span>
							<Link to='/products/'>Products</Link>
							<span> / </span>
							<Link to={`/products/${categoryId}`}>{singleProduct?.category.name}</Link>
							<span> / </span>
							<Link to={`/products/${productId}`}>{singleProduct?.title}</Link>
						</div>
						<div className={style.product}>
							<div className={style.img}>
								<img src={singleProduct?.images[0]}
									alt={singleProduct?.title}
									onError={(e) => {
										const imgElement = e.target as HTMLImageElement;
										imgElement.src = notFound;
									}}
								/>
							</div>
							<div className={style.aboutProduct}>
								<h3 className={style.title}>{singleProduct?.title}</h3>
								<p className={style.price}>${singleProduct?.price}</p>
								<p className={style.description}>{singleProduct?.description}</p>
								<hr style={{marginBottom: 120}}/>
								<div className={style.buy}>
									<QuantityPicker onQuantityChange={handleQuantityChange} quantity={cartQuantity}/>
									<Button appearance='filled' className={style.buyButton} onClick={handleAddToCart}>Add to cart</Button>
									<Button appearance='filled' className={style.buyButton} onClick={handleBuyNow}>Buy now</Button>
									<div className={style.wishlist} onClick={dispatchFavouritePeople}>
										<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
											<path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" fill={wishlist? 'yellow': 'none'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</div>
								</div>
								<div className={style.delivery}>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
											<g clipPath="url(#clip0_261_4843)">
												<path d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												<path d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												<path d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												<path d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												<path d="M5 11.8182H11.6667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												<path d="M1.81836 15.4545H8.48503" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												<path d="M5 19.0909H11.6667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
											</g>
											<defs>
												<clipPath id="clip0_261_4843">
												<rect width="40" height="40" fill="white"/>
												</clipPath>
											</defs>
										</svg>
									</div>
									<div>
										<h3>Free delivery</h3>
										<p>Enter your postal code for Delivery Availability</p>
									</div>
								</div>
								<div className={style.delivery}>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
											<g clipPath="url(#clip0_261_4865)">
												<path d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												<path d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
											</g>
											<defs>
												<clipPath id="clip0_261_4865">
												<rect width="40" height="40" fill="white"/>
												</clipPath>
											</defs>
										</svg>
									</div>
									<div>
										<h3>Return delivery</h3>
										<p>Free 30 Days Delivery Returns. Details</p>
									</div>
								</div>
							</div>
						</div>
					</>
				): <div style={{fontSize: '40px', textAlign: 'center'}}>Product not Found</div>}
			</div>
		</div>
	)
}

export default SingleProductPage;