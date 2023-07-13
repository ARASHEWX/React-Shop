import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';

// Components
import Cart from './shared/Cart';

// Actions
import { CHECKOUT , CLEAR } from '../redux-toolkit/features/cartSlice';

// Style
import styles from "./ShopCart.module.css";

const ShopCart = () => {

    const state = useSelector(store => store.cartState);
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.cartContainer}>
                {state.selectedItems.map(item => <Cart key={item.id} data={item} />)}
            </div>

            {
                state.itemsCounter > 0 && <div className={styles.payments}>
                        <p><span>Total Items:</span> {state.itemsCounter}</p>
                        <p><span>Total Payments:</span> {state.total} $</p>
                        <div className={styles.buttonContainer}>
                            <button className={styles.clear} onClick={() => dispatch(CLEAR())}>Clear</button>
                            <button className={styles.checkout} onClick={() => dispatch(CHECKOUT())}>Checkout</button>
                        </div>
                    </div>
            }

            {
                state.itemsCounter === 0 && !state.checkout && <div className={styles.complete}>
                        <h3>Want to buy?</h3>
                        <Link to="/products">Go to shop</Link>
                    </div>
            }

            {
                state.checkout && <div className={styles.complete}>
                        <h3>Checked out successfully</h3>
                        <Link to="/products">Buy More</Link>
                    </div>
            }
            
        </div>
    );
};

export default ShopCart;