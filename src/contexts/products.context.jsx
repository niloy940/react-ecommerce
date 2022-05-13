import { createContext, useEffect, useState } from "react";
import PRODUCTS from '../shop-data.json'

export const ProductsContext = createContext({
	products: [],
	setProducts: () => { }
});

export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const value = { products, setProducts };

	useEffect(() => {
		setProducts(PRODUCTS);
	}, []);

	return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}