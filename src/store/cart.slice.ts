import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE = 'cartData';

export interface ICartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: ICartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(
                (item) => item.id === action.payload
            );
            if (!existed) {
                state.items.push({ id: action.payload, count: 1 });
            } else {
                state.items.map((item) => {
                    if (item.id === action.payload) {
                        item.count += 1;
                    }
                    return item;
                });
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(
                (item) => item.id === action.payload
            );
            if (!existed) {
                return;
            } else {
                if (existed.count === 1) {
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload
                    );
                } else {
                    state.items.map((item) => {
                        if (item.id === action.payload) {
                            item.count -= 1;
                        }
                        return item;
                    });
                }
            }
        },
        delete: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        clean: (state) => {
            state.items = [];
        },
    },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
