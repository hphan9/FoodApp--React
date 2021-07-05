import CartContext from "./cart-context";
import React, { useReducer } from "react";
//CardProvider is for manage the cart context to data and provide that context to all component that want access to it
//CartContex.Provider wrap props.children , this allows us to wrap any components that should get access to the Cart Provider component
// we can add the logic of cartContex here and in the other component we don't need to specify it again
//reducer return a new state
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
//we should not use mutable array method to update cartState
// should update your state in immutable way,
// don't change old state snapshot because of the reference value thing in java script -> edit the old state memory without react knows about it is not recommended
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let old = false;
    let updatedTotalAmount= state.totalAmount;
    const updatedItems = state.items.map((item) => {
      if (item.id === action.item.id) {
        if (item.amount + action.item.amount <= 5) {
          item.amount += action.item.amount;
          updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price;
        }
        old = true;
      }
      console.log(item);
      return item;
    });
    if (!old) {
      updatedItems.push(action.item);
      updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    let existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    let existingItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== existingItem.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    let updatedAmount = state.totalAmount - existingItem.price;
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  return defaultCartState;
};

const CardProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  // useReducer is usually preferable to useState when you have complex state logic
  // that involves multiple sub-values or when the next state depends on the previous one
  // need value={cartContext} to set the value of provider
  // useContext(MyContext) function accepts a context object - the value returned from React.createContext and return the current context value for that context.
  // the current context value is determined by the value prop of nearest <MyContext.Provider> above the calling component in the tree
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CardProvider;
