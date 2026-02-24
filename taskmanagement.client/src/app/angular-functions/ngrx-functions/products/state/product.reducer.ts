import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';

export const initialState = {
    products: [],
    loading: false,
    error: null
};

export const productReducer = createReducer(
    initialState,

    on(ProductActions.loadProducts, state => ({
        ...state,
        loading: true
    })),

    on(ProductActions.loadProductsSuccess, (state, { products }) => ({
        ...state,
        loading: false,
        // products
    })),

    on(ProductActions.loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        // error
    }))
);