import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Product from './shared/Product';
import Loader from './shared/Loader';

// Redux
import { fetchProducts } from '../redux-toolkit/features/productsSlice';

// Style
import styles from "./Store.module.css";

const Store = () => {

    const [filter, setFilter] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [active, setActive] = useState({
        "all": "active",
        "electronics": "",
        "jewelery": "",
        "women's clothing": "",
        "men's clothing": ""
    });

    const dispatch = useDispatch();
    const productsState = useSelector(store => store.productsState);

    useEffect(() => {
        if (!productsState.products.length) {
            dispatch(fetchProducts());
        }
    }, []);

    const filterHandler = (category) => {
        for (let [key] of Object.entries(active)) {
            active[key] = "";
        };
        active[category] = "active";
        if (category === "all") {
            setFilter(false);
            setFilteredData([]);
        } else {
            setFilter(true);
            setFilteredData(productsState.products.filter(product => product.category === category));

        }
    }

    return (
        <>
            <div className={styles.btns}>
                <button className={`${active["all"] ? styles.active : ""}`} onClick={() => { filterHandler("all") }}>All</button>
                <button className={`${active["electronics"] ? styles.active : ""}`} onClick={() => { filterHandler("electronics") }}>Electronic</button>
                <button className={`${active["jewelery"] ? styles.active : ""}`} onClick={() => { filterHandler("jewelery") }}>Jevelery</button>
                <button className={`${active["women's clothing"] ? styles.active : ""}`} onClick={() => { filterHandler("women's clothing") }}>Women</button>
                <button className={`${active["men's clothing"] ? styles.active : ""}`} onClick={() => { filterHandler("men's clothing") }}>Men</button>
            </div>
            <div className={styles.container} >
                {
                    productsState.loading ?
                        <Loader /> :
                        productsState.error ?
                            <p>Something went wrong</p> :
                            !filter && productsState.products.map(product => <Product key={product.id} productData={product} />)
                }
                {
                    filteredData && filteredData.map(product => <Product key={product.id} productData={product} />)
                }
            </div>
        </>

    );
};

export default Store;