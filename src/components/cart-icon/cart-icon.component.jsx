import SvgShoppingIcon from './svg-shopping-icon.component';
import './cart-icon.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen } = useContext(CartContext);

	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<div className='cart-icon-container' onClick={toggleIsCartOpen}>
			<SvgShoppingIcon className='shopping-icon' />
			<span className='item-count'>0</span>
		</div>
	);
}

export default CartIcon;