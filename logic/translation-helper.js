export class TranslationHelper {

     translateWord = (textType, textToTranslate, lan, cap) => {
        var text = ''
        if(textType == 'word'){
            text = words[textToTranslate][lan];
        }
        else if(textType == 'short phrase'){
            text = short_phrases[textToTranslate][lan];
        } 
        return this.translate(text, cap);
    }

    translate = (text, cap) => {
        if(cap == 'partial'){
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        }
        if(cap == 'full'){
            return text.toUpperCase();
        }
        return text;
    }
}

const words = {
    cart: {
        en: 'cart',
        es: 'carrito'
    },
    collection: {
        en: 'collection',
        es: 'colección'
    },
    collections: {
        en: 'collections',
        es: 'colecciones'
    },
    category: {
        en: 'category',
        es: 'categoría'
    },
    categories: {
        en: 'categories',
        es: 'categorías'
    },
    shirt: {
        en:'shirt',
        es:'camisa'
    },
    shirts: {
        en:'shirts',
        es:'camisas'
    },
    pants: {
        en:'pants',
        es:'pantalones'
    },
    wholesales: {
        en:'wholesales',
        es:'ventas mayoristas'
    },
    shipping: {
        en:'shipping',
        es:'envíos'
    },
    info: {
        en:'info',
        es:'información'
    },
    more: {
        en:'more',
        es:'ver más'
    },
    size: {
        en:'size',
        es: 'talla'
    },
    sleeve: {
        en:'sleeve',
        es:'manga'
    },
    'SHORT SLEEVE': {
        en:'SHORT SLEEVE',
        es:'MANGA CORTA'
    },
    'LONG SLEEVE': {
        en:'LONG SLEEVE',
        es:'MANGA LARGA'
    },
    pricing: {
        en:'pricing',
        es:'precio'
    },
    checkout: {
        en:'checkout',
        es:'pago'
    },
    edit: {
        en:'edit',
        es:'editar'
    },
    delete: {
        en:'delete',
        es:'eliminar'
    },
    quantity: {
        en:'quantity',
        es:'cantidad'
    }
}

const short_phrases = {
    'add_to_cart': {
        en: 'add to cart',
        es: 'agregar al carrito'
    },
    'shipping_info': {
        en:'shipping info',
        es: 'información de envío'
    },
    'billing_info': {
        en:'billing info',
        es: 'información de pago'
    },
    'purchase_info': {
        en:'purchase info',
        es: 'información de compra'
    },
    'make_purchase': {
        en:'make purchase',
        es: 'hacer compra'
    }
}