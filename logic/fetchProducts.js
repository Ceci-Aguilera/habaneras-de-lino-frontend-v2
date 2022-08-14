import axios from 'axios';
import { fetchSetter, fetchSetterPOST } from './fetchSetters';


const domain_api = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProduct(setProduct, id){
    const endpoint = `store/clothing-products/items/${id}/`
    await fetchSetter(endpoint, setProduct)
}