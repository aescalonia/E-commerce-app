import { createContext } from "react";

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

export interface Cart {
    quantity: number;
    id: string;
    name: string;
    price: number;
    image: string;
}

export interface Wishlist {
    id: string;
    name: string;
    price: number;
    image: string;
}

export interface History {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}


interface ProductsContextType {
    clearCart(): unknown;
    products: Product[];
    cart: Cart[];
    wishlist: Wishlist[];
    addProduct: (productId: string) => void;
    addCart: (cartItem: Product) => void;
    removeCart: (cartItem: Product) => void;
    addWishlist: (productId: string) => void;
    removeWishlist: (productId: string) => void;
    checkout: (cart: Cart[]) => void;
    history: Transaction[];
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface Transaction {
    code: string;
    products: {
    name: string;
    quantity: number;
    price: number;
    }[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export default ProductsContext;
