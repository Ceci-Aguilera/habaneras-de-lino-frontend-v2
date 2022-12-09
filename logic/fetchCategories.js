import axios from 'axios';
import { fetchSetter, fetchSetterPOST } from './fetchSetters';


const domain_api = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCategories(setCategories){
    const endpoint = `store/categories/`
    await fetchSetter(endpoint, setCategories)
}

export async function fetchCategory(setCategory, category_id){
    const endpoint = `store/categories/${category_id}/`
    await fetchSetter(endpoint, setCategory)
}

export async function fetchCategoriesByName(setCategories, body){
    const endpoint = `store/categories/filter/names/`
    await fetchSetterPOST(endpoint, body, setCategories);
}
