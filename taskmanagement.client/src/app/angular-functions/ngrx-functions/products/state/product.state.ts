export interface Product {
    id: number;
    name: string;
    price: string;
}

export interface ProductState {
    Products: Product[];
    loading: boolean;
    error: string | null;
}