'use client'
import React, { ReactNode } from 'react'
import { createContext, useState, useContext } from 'react';

interface Product{
  id:number;
  name:string;
  price:number;
 quantity:number;
 image:string;
 review:number;
 ratings:number;
 inStock:boolean;
 badge:string | null   
 category:string;         
}

interface Cartitem{
 id:number;
 quantity:number;
 catagory:string;
 price:number;
 name:string;
 image:string;             
}

interface CartContextType{
  cart: Cartitem[];
  addToCart:(product: Product)  => void;
  removeFromCart:(id: number)  => void;
  clearCart:()  => void;
  getTotalItems:()  => number;
  getTotalPrice:()  => number;
  updateQuantity:(id: number, quantity: number)  => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({children}: {children:ReactNode}) => {
  const [cart,setCart]= useState<Cartitem[]>([]);
  
  const addToCart = (product: Product) => {
              setCart(prevCart =>{
                const existingItem = prevCart.find(item => item.id === product.id);
if(existingItem){
  return prevCart.map(item =>
              item.id === product.id ? {...item, quantity: item.quantity + 1} : item            
  );

} else{
              return [...prevCart, {id: product.id, quantity: 1, catagory:product.category, price: product.price, name: product.name, image: product.image}];
}                       
              })
 
  };

  const removeFromCart = (id: number) => {
   setCart(prevCart => prevCart.filter(item => item.id !== id));           
  }
  const updateQuantity = (id:number, quantity:number) => {
              setCart(prevCart => prevCart.map(item => item.id === id ? {...item, quantity} : item));

              if(quantity <=0){
                removeFromCart(id);
              }
  };

  const getTotalItems = () => {
              return cart.reduce((total, item)=> total + item.quantity, 0);
  }

  const getTotalPrice = () => {
              return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart: () => setCart([]), getTotalItems, getTotalPrice, updateQuantity}}>
      {children}
    </CartContext.Provider>
  )
}


export function useCart() {
  const context = useContext(CartContext);         
return context!;
}              
export default CartProvider