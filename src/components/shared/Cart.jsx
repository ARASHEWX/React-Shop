import React from 'react';
import { useDispatch } from 'react-redux';

// Action
import { REMOVE_ITEM , DECREASE , INCREASE } from '../../redux-toolkit/features/cartSlice';

// Functions
import { shorten } from '../../helper/functions';

// Icons
import trashIcon from "../../assets/icons/trash.svg";

// Style
import styles from "./Cart.module.css";

const Cart = (props) => {

    const dispatch = useDispatch();
    const {image, title, price, quantity} = props.data;

    return (
        <div className={styles.container} >
            <img className={styles.productImage} src={image} alt="product"/>
            <div className={styles.data}>
                <h3>{shorten(title)}</h3>
                <p>{price} $</p>
            </div>
            <div>
                <span className={styles.quantity}>{quantity}</span>
            </div>
            <div className={styles.buttonContainer}>
                {
                    quantity > 1 ? 
                    <button onClick={() => dispatch(DECREASE(props.data))} >-</button> :
                    <button onClick={() => dispatch(REMOVE_ITEM(props.data))} ><img src={trashIcon} alt="trash" /></button>
                }
                <button onClick={() => dispatch(INCREASE(props.data))} >+</button>
            </div>
        </div>
    );
};

export default Cart;