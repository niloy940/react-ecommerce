import React, { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context';

import { Arrow, CheckoutItemContainer, ImageContainer, Img, Name, Price, Quantity, QuantityValue, RemoveButton } from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

	const clearItemHandler = () => clearItemFromCart(cartItem);
	const addItemHandler = () => addItemToCart(cartItem);
	const removeItemHandler = () => removeItemFromCart(cartItem);

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<Img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<Name>{name}</Name>

			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<QuantityValue>{quantity}</QuantityValue>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>

			<Price>{price}</Price>

			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	)
}

export default CheckoutItem;