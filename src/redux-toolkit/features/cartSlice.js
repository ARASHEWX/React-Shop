import { createSlice } from "@reduxjs/toolkit";

const sumItems = items => {
    const itemsCounter = items.reduce((total, product) => total + product.quantity, 0);
    let total = items.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    return { itemsCounter, total }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: false
    },
    reducers: {
        ADD_ITEM: (state, action) => {
            if (!state.selectedItems.find(item => item.id === action.payload.id)) {
                state.selectedItems.push({
                    ...action.payload,
                    quantity: 1
                })
            }
            state.selectedItems = [...state.selectedItems];
            state.checkout = false;
            state.total = sumItems(state.selectedItems).total; // n
            state.itemsCounter = sumItems(state.selectedItems).itemsCounter; // n
        },
        REMOVE_ITEM: (state, action) => {
            const newSelectedItems = state.selectedItems.filter(item => item.id !== action.payload.id);
            state.selectedItems = [...newSelectedItems];
            state.total = sumItems(newSelectedItems).total;
            state.itemsCounter = sumItems(newSelectedItems).itemsCounter;
        },
        INCREASE: (state, action) => {
            const indexI = state.selectedItems.findIndex(item => item.id === action.payload.id);
            state.selectedItems[indexI].quantity++;
            state.total = sumItems(state.selectedItems).total; // n
            state.itemsCounter = sumItems(state.selectedItems).itemsCounter; // n

        },
        DECREASE: (state, action) => {
            const indexD = state.selectedItems.findIndex(item => item.id === action.payload.id);
            state.selectedItems[indexD].quantity--;
            state.total = sumItems(state.selectedItems).total; // n
            state.itemsCounter = sumItems(state.selectedItems).itemsCounter; // n
        },
        CHECKOUT: (state, action) => {
            state.selectedItems = [];
            state.itemsCounter = 0;
            state.total = 0;
            state.checkout = true;
        },
        CLEAR: (state, action) => {
            state.selectedItems = [];
            state.itemsCounter = 0;
            state.total = 0;
            state.checkout = false;
        }
    }
});

export default cartSlice.reducer;
export const { ADD_ITEM, REMOVE_ITEM, INCREASE, DECREASE, CHECKOUT, CLEAR } = cartSlice.actions;