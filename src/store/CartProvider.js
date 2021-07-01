import CartContex from "./cart-context";
import React from 'react';
//CardProvider is for manage the cart context to data and provide that context to all component that want access to it
//CartContex.Provider wrap props.children , this allows us to wrap any components that should get access to the Cart Provider component
// we can add the logic of cartContex here and in the other component we don't need to specify it again
const CardProvider = (props)=>{
 const cartContext={
     items: [],
     totalAmount:0,
     addItem:(item)=>{} ,
     removeItem:(id)=>{}
 }
 return <CartContex.Provider> 
     {props.children}
     </CartContex.Provider>
     
 
}

export default CardProvider;