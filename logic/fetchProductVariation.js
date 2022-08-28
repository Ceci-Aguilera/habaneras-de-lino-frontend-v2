import axios from 'axios';
import { fetchSetter, fetchSetterPOST } from './fetchSetters';


const domain_api = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProductVariation(setProductVariation, id){
    const endpoint = `store/product-variations/${id}/`
    await fetchSetter(endpoint, setProductVariation)
}