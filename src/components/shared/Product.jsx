import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';

// Functions
import { shorten, isInCart, quantityCount } from '../../helper/functions';

// Actions
import { ADD_ITEM , REMOVE_ITEM , INCREASE , DECREASE } from '../../redux-toolkit/features/cartSlice';

// Icons
import trashIcon from "../../assets/icons/trash.svg";

// Style
import styles from "./Product.module.css";

const Product = ({productData}) => {

    const state = useSelector(store => store.cartState);
    const dispatch = useDispatch();

    return (
        <div className={styles.container} >
            <img className={styles.cardImage} src={productData.image} alt="product" />
            <h3>{shorten(productData.title)}</h3>
            <p>{`${productData.price} $`}</p>
            <div className={styles.linkContainer}>
                <Link to={`/products/${productData.id}`}>Details</Link>
                <div className={styles.buttonContainer}>
                    {quantityCount(state, productData.id) === 1 && <button className={styles.smallButton} onClick={() => dispatch(REMOVE_ITEM(productData))}><img src={trashIcon} alt="trash" /></button>}
                    {quantityCount(state, productData.id) > 1 && <button className={styles.smallButton} onClick={() => dispatch(DECREASE(productData))}>-</button>}
                    {quantityCount(state, productData.id) > 0 && <span className={styles.counter}>{quantityCount(state, productData.id)}</span>}
                    {
                        isInCart(state, productData.id) ?
                        <button className={styles.smallButton} onClick={() => dispatch(INCREASE(productData))}>+</button> :
                        <button onClick={() => dispatch(ADD_ITEM(productData))}>Add to Cart</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;