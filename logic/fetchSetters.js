import axios from 'axios';

const domain_api = process.env.NEXT_PUBLIC_API_URL;

function get_const_config(){
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return config;
}


export async function fetchSetter(endpoint, customSetter){
    const config = get_const_config();

    const url = `${domain_api}/${endpoint}`

    await axios.get(url, config).then(async(response) => {
        const result = await response.data;
        customSetter(result);
    }).catch((error) => {
        console.log(error.message)
        return [];
    })
}

export async function fetchSetterPOST(endpoint, body, customSetter){
    const config = get_const_config();

    const url = `${domain_api}/${endpoint}`

    await axios.post(url, body, config).then(async(response) => {
        const result = await response.data;
        customSetter(result);
    }).catch((error) => {
        console.log(error.message)
        return [];
    })
}