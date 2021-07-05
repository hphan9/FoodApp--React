import { useState, useContext, useEffect } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  //the app will re render wherever the context change
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  //reduce() built in function transform array of object
  const numberOfCartItem = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  
  useEffect(() => {
    if(cartCtx.items.length ===0 ){
    return;
    }
    setBtnIsHighlighted(true);
    const timer= setTimeout(()=>{
      setBtnIsHighlighted(false);
    }, 300);
    //we need to return the anonymous function in useEffect function  (will be call automatically) as a clean up function , -> clear time effect -> this timer can be set again before it expired , if we add multiple item rapidly after each other, we want to clear the old timer, and make sure that the old timer is cleared  
    return ()=> {
      clearTimeout(timer);
    }
  }, [cartCtx.items]);
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump :''}`;
  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
