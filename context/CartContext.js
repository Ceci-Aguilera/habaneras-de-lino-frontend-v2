import axios from "axios";
import { createContext } from "react";
import router from "next/router";
import { useEffect, useState, useContext } from "react";

const domain = process.env.NEXT_PUBLIC_API_URL;

function get_const_config() {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return config;
}

const check_valid = (x) => (x !== null && x !== undefined);

const is_product_in_cart = (cart, product_id, color, size, sleeve, product_variation_id = null) => {
    if (!cart || !cart.product_variations || cart.product_variations.length == 0) return null;

    const cart_products = cart.product_variations;

    var is_product_in_cart_result = null

    cart_products.forEach((prod => {
        console.log(product_id)
        if ((prod.product.id == product_id) && (prod.size == size) && (prod.sleeve == sleeve | null) && (prod.principal_color.id == color.id)) {
            if ((prod.id !== product_variation_id)) {
                is_product_in_cart_result = prod;
            }
        }
    }))
    return is_product_in_cart_result;
}

const CartContext = createContext();

export const getCart = async () => {

    const token = window.localStorage.getItem("token")

    const config = get_const_config();


    if (check_valid(token)) {
        const cart_url = domain + `/store/cart/${token}/`;
        return await axios
            .get(cart_url, config)
            .then(async (res) => {
                if (res.data) {
                    const result = await res.data;
                    return { status: "Cart not null", cart: result };
                }
            })
            .catch((error) => {
                console.log("Could not fetch the cart ", error)
                return { status: "Cart null", cart: null };
            });
    }
    return { status: "Cart null", cart: null };

};

//* ================================================================
//* CART PROVIDER
//* =================================================================
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        async function FetchCart() {
            const temp_cart = await getCart();
            setCart(temp_cart['cart']);
        }
        FetchCart();
    }, []);


    //* ================================================================
    //* Add product to Cart or call update product
    //* =================================================================

    const addProduct = async (product_variation) => {

        const config = get_const_config();

        var token = null
        if (check_valid(cart)) token = cart.token;

        const body = JSON.stringify({
            product: product_variation.product,
            size: product_variation.size,
            sleeve: product_variation.sleeve,
            principal_color: product_variation.color.id,
            quantity: product_variation.quantity,
            cart_token: token,
        })

        const product_in_cart = is_product_in_cart(cart, product_variation.product, product_variation.color, product_variation.size, product_variation.sleeve)

        if (product_in_cart !== null) {
            const new_quantity = product_variation.quantity + product_in_cart.quantity
            await updateProductQuantity(product_in_cart, new_quantity, product_variation.color).then(async (res) => {
                const temp_cart = await getCart();
                setCart(temp_cart['cart']);
                router.back();
            })
        }

        else {
            const cart_url = domain + `/store/product-variations/`;
            return await axios
                .post(cart_url, body, config)
                .then(async (response) => {
                    const res = await response.data;
                    const temp_cart = res;
                    setCart(temp_cart);
                    window.localStorage.setItem("token", temp_cart['token'])
                    router.back();
                })
                .catch((error) => {
                    console.log("Error while adding a new product to a cart ", error);
                });
        }
    }

    const updateProductQuantity = async (old_product, quantity, color) => {
        const config = get_const_config()

        const body = JSON.stringify({
            id: old_product.id,
            quantity: quantity,
            principal_color: color.id,
            product: old_product.product.id,
        })

        const cart_url = domain + `/store/product-variations/${old_product.id}/`;
        return await axios.put(cart_url, body, config)
            .then(async (response) => {
                return "Success"
            })
            .catch((error) => {
                console.log("Error while updating a product ", error);
                return "Error"
            });
    }

    const updateProduct = async (product_variation) => {
        const config = get_const_config();

        var token = null
        if (check_valid(cart)) token = cart.token;

        const body = JSON.stringify({
            product: product_variation.product.id,
            size: product_variation.size,
            sleeve: product_variation.sleeve,
            principal_color: product_variation.principal_color.id,
            quantity: product_variation.quantity,
            cart_token: token,
        })

        const product_in_cart = is_product_in_cart(cart, product_variation.product.id, product_variation.principal_color, product_variation.size, product_variation.sleeve, product_variation.id)
        if (product_in_cart !== null) {
            const new_quantity = product_variation.quantity + product_in_cart.quantity
            await updateProductQuantity(product_in_cart, new_quantity, product_variation.principal_color).then(async (res) => {
                await deleteProduct(product_variation.id).then(async (res) => {
                    const temp_cart = await getCart();
                    setCart(temp_cart['cart']);
                    router.push('/cart');
                }
                );
            })
        }
        else {
            const cart_url = domain + `/store/product-variations/${product_variation.id}/`;
            return await axios.put(cart_url, body, config)
                .then(async (response) => {
                    const temp_cart = await getCart();
                    setCart(temp_cart['cart']);
                    router.push('/cart');
                })
                .catch((error) => {
                    console.log("Error while updating a product ", error);
                    return "Error"
                });
        }
    }

    const deleteProduct = async (product_variation_id) => {

        const config = get_const_config()

        const cart_url = domain + `/store/product-variations/${product_variation_id}/`;
        return await axios
            .delete(cart_url, config)
            .then(async (response) => {
                const temp_cart = await getCart()
                setCart(temp_cart['cart'])
                return "Success"
            })
            .catch((error) => {
                console.log("Error while deleting a product ", error);
                return "Error"
            });
    };

    const makeOrder = async(body, setOrderResult) => {
        const config = get_const_config()
        const order_url = domain + `/store/orders/`;
            return await axios
                .post(order_url, body, config)
                .then(async (response) => {
                    setCart(null);
                    window.localStorage.removeItem("token")
                    router.push('/');
                })
                .catch((error) => {
                    console.log("Error while adding a new product to a cart ", error);
                    setOrderResult('Error')
                });
    }

    return (
        <CartContext.Provider value={{ cart, addProduct, updateProduct, deleteProduct, makeOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
export const CartConsumer = CartContext.Consumer;