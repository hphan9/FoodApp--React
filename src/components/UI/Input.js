import classes from "./Input.module.css";
//...props.input: spread operator  
const Input= (props) =>{
return (<div className={classes.input}>
    <label htmlFor={props.input.id} >{props.label}</label>
<input {...props.input}
>
</input>
</div>);
}

export default Input;