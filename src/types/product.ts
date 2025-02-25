import { ProductMedia } from "./productMedia";
import { ProductCategory } from "./productCategory";
import { ProductSize } from "./productSize";
export interface Product {
    id: number;
    name: string;
    description: string;
    tags: string;
    brand: string;
    price: number;
    stock: number;
    media: ProductMedia[];
    category: ProductCategory;
    sizes: ProductSize[];
}
