import { createSelector } from "@ngrx/store";

export const selectProductState = (state: any) => state.products;

export const selectAllProducts = createSelector(
    selectProductState,
    state => state.products
);
