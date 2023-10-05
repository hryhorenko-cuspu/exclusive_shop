import Button from '../Button/Button';
import TextField from '@mui/material/TextField';

import style from './styles.module.css';

function QuantityPicker({ quantity, onQuantityChange, ...props }: {quantity: number, onQuantityChange: (newQuantity: number) => void}) {

	const handleDecrement = () => {
		if (quantity > 1) {
			onQuantityChange(quantity - 1);
		}
	};

	const handleIncrement = () => {
		onQuantityChange(quantity + 1);
	};

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantity = parseInt(e.target.value, 10);
		if (!isNaN(newQuantity) && newQuantity >= 1) {
			onQuantityChange(newQuantity);
		}
	};

	return (
		<div className={style.picker} {...props}>
			<Button appearance={quantity === 1? 'outlined': 'filled' } className={style.prickerButton} onClick={handleDecrement}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="icon-minus">
						<path id="Vector" d="M20 12H4" stroke={quantity === 1? 'black': 'white'} strokeWidth="1.5" strokeLinecap="round"/>
					</g>
				</svg>
			</Button>
			<TextField
				type="tel"
				value={quantity}
				sx={{width: 80}}
				onChange={handleQuantityChange}
				inputProps={{min: 1, style: { textAlign: 'center', borderRadius: 0, borderTop: '1px solid rgba(0, 0, 0, 0.50)', borderBottom: '1px solid rgba(0, 0, 0, 0.50)', fontWeight: 'bolder', fontSize: '20px', height: '14px'}}}
			/>
			<Button appearance={'filled'} style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} className={style.prickerButton} onClick={handleIncrement}>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="icon-plus">
			<path id="Vector" d="M12 20V12M12 12V4M12 12H20M12 12H4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
			</g>
		</svg>
			</Button>
		</div>
	);
}

export default QuantityPicker;
