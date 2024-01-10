import React, { ReactNode, useState } from "react";
import { Product, Cart, Wishlist, History, Transaction } from "./product-context";
import ProductsContext from "./product-context";

export const PRODUCT_DATA: Product[]  = [
    { id: 'p1', name: "Harry Styles", price: 10, image: "https://images.squarespace-cdn.com/content/v1/5ede5114b8b71f40bdb49cf0/1596824693321-GTM9D9J5ID9OK2LVQV33/Fine+Line" },
    { id: 'p2', name: "Olivia Rodrigo", price: 15, image: "https://upload.wikimedia.org/wikipedia/id/0/04/SOUR_album.jpg" },
    { id: 'p3', name: "Taylor Swift", price: 12, image: "https://i.iheart.com/v3/re/new_assets/63502b9eaee0f4b0e56f9a54?ops=contain(1480,0)" },
    { id: 'p4', name: "Ariana Grande", price: 20, image: "https://upload.wikimedia.org/wikipedia/id/7/7a/Sweetener_album_cover.png" },
    { id: 'p5', name: "Lana Del Rey", price: 18, image: "https://hips.hearstapps.com/hmg-prod/images/hbz-lana-lfl-1499463581.jpg" },
    { id: 'p6', name: "NIKI", price: 25, image: "https://i.scdn.co/image/ab67616d0000b273770eeb0ee1c91983b1ba4a10" },
    { id: 'p7', name: "The Weeknd", price: 30, image: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" },
    { id: 'p8', name: "Keshi", price: 35, image: "https://i.scdn.co/image/ab6761610000e5ebd969cf117d0b0d4424bebdc5" },
    { id: 'p9', name: "Joji", price: 25, image: "https://upload.wikimedia.org/wikipedia/en/1/1b/Joji_-_Nectar.png"},
    { id: 'p10', name: "New Jeans", price: 30, image: "https://i.scdn.co/image/ab67616d0000b2730744690248ef3ba7b776ea7b"},
    { id : 'p11', name: "Aespa", price: 25, image: "https://upload.wikimedia.org/wikipedia/id/6/67/Aespa_%E2%80%93_Savage.jpg" },
    { id : 'p12', name: "Red Velvet", price: 28, image: "https://upload.wikimedia.org/wikipedia/id/b/b9/Red_Velvet_-_The_ReVe_Festival_Finale.jpg"}

];

const generateTransactionCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let code = '';
    for (let i = 0; i < 3; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    for (let i = 0; i < 3; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return code;
};


const ProductsContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products] = useState<Product[]>(PRODUCT_DATA);
    const [cart, setCart] = useState<Cart[]>([]);
    const [wishlist, setWishlist] = useState<Wishlist[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [history, setHistory] = useState<Transaction[]>([]);

    interface CartItem extends Product {
        quantity: number;
    }

    const addProduct = (productId: string) => {
      console.log("Current cart items:", cart);
      const productToAdd = products.find(product => product.id === productId);
      if (productToAdd) {
          const existingItem = cart.find(item => item.id === productId);
          if (existingItem) {
              const updatedCart: CartItem[] = cart.map(item =>
                  item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
              );
              setCart(updatedCart);
              console.log("Updated cart items:", updatedCart);
          } else {
              const updatedCart: CartItem[] = [...cart, { ...productToAdd, quantity: 1 }];
              setCart(updatedCart);
              console.log("Updated cart items:", updatedCart);
          }
      }
    };
  

    const addWishlist = (productId: string) => {
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            const existingItem = wishlist.find((item) => item.id === productId);
            if (!existingItem) {
                const updatedWishlist: Product[] = [...wishlist, productToAdd];
                setWishlist(updatedWishlist);
                console.log("Updated wishlist items:", updatedWishlist);
            } else {
                console.log("Item already in wishlist");
            }
        } else {
            console.log("Product not found");
        }
    };
    

    const addCart = (cartItem: Product) => {
        const existingItem = cart.find((item) => item.id === cartItem.id);
        if (existingItem) {
          const updatedCart = cart.map((item) =>
            item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          setCart(updatedCart);
        } else {
          setCart((prevCart) => [...prevCart, { ...cartItem, quantity: 1 }]);
        }
      };
      
      const removeCart = (cartItem: Product) => {
        const updatedCart = cart
          .map(item => {
            if (item.id === cartItem.id) {
              if (item.quantity === 1) {
                return null;
              }
              return {
                ...item,
                quantity: item.quantity - 1
              };
            }
            return item;
          })
          .filter(item => item !== null) as Cart[];
      
        setCart(updatedCart);
      };

    const clearCart = () => {
        setCart([]);
    };

    const removeWishlist = (productId: string) => {
        const updatedWishlist = wishlist.filter((item) => item.id !== productId);
        setWishlist(updatedWishlist);
    };

    const checkout = () => {
        if (cart) {
          const transaction = cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }));
    
          const transactionCode = generateTransactionCode();
          console.log('Transaction Code:', transactionCode);
    
          const newTransaction: Transaction = {
            code: transactionCode,
            products: transaction
          };
    
          setHistory((prevHistory: Transaction[]) => [...prevHistory, newTransaction]);
    
          clearCart();
          setTotalPrice(0);
        }
      };
      
      

    return (
        <ProductsContext.Provider value={{ products, cart, addProduct, addCart, removeCart, addWishlist, wishlist, clearCart, removeWishlist, checkout, history  }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContextProvider;
