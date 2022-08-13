import axios from 'axios';
import { fetchSetter, fetchSetterPOST } from './fetchSetters';


const domain_api = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCollections(setCollections){
    const endpoint = `store/clothing-collections/`
    await fetchSetter(endpoint, setCollections)
}

export async function fetchCollectionsByNameYear(setCollections, body){
    const endpoint = `store/clothing-collections/filter/names/`
    await fetchSetterPOST(endpoint, body, setCollections);
}