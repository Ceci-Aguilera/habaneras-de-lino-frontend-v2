export const principalCollections = [{
    name: 'Cittadino', year: '2022',
    name: 'Valladolid', year: '2022'
}]

export const defaultProduct = {
    product: null,
    color: null,
    size: null,
    sleeve_type: null,
    quantity: 0,
}

export const productFields = {
    SHIRT: ['sleeve']
}

export const productSizes = {
    SHIRT:['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
}

export const productSleeves = {
    SHIRT:['SHORT SLEEVE', 'LONG SLEEVE']
}

export const quantityArray = Array.from({length: 100}, (_, i) => i + 1)

export const TruncateLongString = (long_string) => {
    if(long_string.length <= 20){
        return long_string;
    }
    return long_string.substring(0, 17) + "..."
}

export const PAGINATION_SIZE = 12;