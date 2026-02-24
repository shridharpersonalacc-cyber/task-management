import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Productservice } from "../../../../services/productservice";
import * as ProductActions from './product.actions';
import { switchMap } from "rxjs";


@Injectable()
export class ProductEffects {
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            // switchMap(() =>
            //     this.productService.getProducts().pipe(
            //         map(products =>
            //             ProductActions.loadProductsSuccess({ products })
            //         ),
            //         catchError(error =>
            //             of(ProductActions.loadProductsFailure({ error }))
            //         )
            //     )
            // )
        )
    );

    constructor(
        private actions$: Actions,
        private productService: Productservice
    ) { }

}