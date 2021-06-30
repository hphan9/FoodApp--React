import classes from "./MealItem.module.css"
import MealItemForm from "./MealItemForm";
const MealItem= props=>{
    return(
        <li>
            <div className={classes.meal}> 
                <h3>{props.name}</h3>
                <div className = {classes.name}>{props.description}</div>
                <div className={classes.price}>${props.price.toFixed(2)}</div>
            </div>
            <div>
            <MealItemForm> </MealItemForm>
            </div>
        </li>
    )
}
export default MealItem;