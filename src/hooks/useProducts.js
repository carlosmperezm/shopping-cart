import { useEffect, useState } from "react";

export const products = []

const URL = 'https://fakestoreapi.com/products';

export default function useProducts(){
    const [products,setProducts] = useState(null);
    useEffect(()=>{
        fetch(URL)
        .then((response) => response.json())
        .then((data) => setProducts(data));
    },[]);
    return products;
}
