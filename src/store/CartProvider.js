import CartContext from "./cart-context"
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
}
const cartReducer = (state, action) => {
    if(action.type === 'ADD_ITEM'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.item.quantity
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else {
           updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE_ITEM'){
        const itemToBeRemovedIndex = state.items.findIndex(item => item.id === action.id);
        const itemToBeRemoved = state.items[itemToBeRemovedIndex];
        let updatedItems;
        if(itemToBeRemoved.quantity === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else {
            const updatedItem = {
                ...itemToBeRemoved,
                quantity: itemToBeRemoved.quantity - 1
            }
            updatedItems = [...state.items];
            updatedItems[itemToBeRemovedIndex] = updatedItem;
        }
        
        const updatedTotalAmount = state.totalAmount - itemToBeRemoved.price;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === "CLEAR"){
        return defaultCartState;
    }
    return defaultCartState;
}
const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
   
    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD_ITEM', item: item});
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id});
    };

    const clearCart = () => {
        dispatchCartAction({type: 'CLEAR'});
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart
    }
    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider;