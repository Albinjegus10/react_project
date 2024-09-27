import React, { useContext, useEffect, useState } from 'react';
import { BsCartX } from 'react-icons/bs';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { calculateTotal, displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import cartContext from '../contexts/cart/cartContext';
import CartItem from '../components/cart/CartItem';
import EmptyView from '../components/common/EmptyView';

const Cart = () => {
    useDocTitle('Cart');
    const { cartItems, setCartItems } = useContext(cartContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.user_id;
                console.log("userId",userId)

                const response = await axios.get(`http://127.0.0.1:8000/api/cart-items-u/${userId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("response",response)
                const fetchedCartItems = response.data.map(item => ({
                    id: item.id,
                    title: item.product.title,
                    image: item.product.image1,
                    final_price: item.product.final_price,
                    original_price: item.product.original_price,
                    quantity: item.quantity
                }));

                setCartItems(fetchedCartItems);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching cart items:', err);
                setError('Failed to fetch cart items');
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [setCartItems]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const cartQuantity = cartItems.length;

    // total original price
    const cartTotal = cartItems.map(item => item.original_price * item.quantity);
    const calculateCartTotal = calculateTotal(cartTotal);
    const displayCartTotal = displayMoney(calculateCartTotal);

    // total discount
    const cartDiscount = cartItems.map(item => (item.original_price - item.final_price) * item.quantity);
    const calculateCartDiscount = calculateTotal(cartDiscount);
    const displayCartDiscount = displayMoney(calculateCartDiscount);

    // final total amount
    const totalAmount = calculateCartTotal - calculateCartDiscount;
    const displayTotalAmount = displayMoney(totalAmount);

    return (
        <>
            <section id="cart" className="section">
                <div className="container">
                    {cartQuantity === 0 ? (
                        <EmptyView
                            icon={<BsCartX />}
                            msg="Your Cart is Empty"
                            link="/all-products"
                            btnText="Start Shopping"
                        />
                    ) : (
                        <div className="wrapper cart_wrapper">
                            <div className="cart_left_col">
                                {cartItems.map(item => (
                                    <CartItem key={item.id} {...item} />
                                ))}
                            </div>

                            <div className="cart_right_col">
                                <div className="order_summary">
                                    <h3>
                                        Order Summary &nbsp;
                                        ( {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} )
                                    </h3>
                                    <div className="order_summary_details">
                                        <div className="price">
                                            <span>Original Price</span>
                                            <b>{displayCartTotal}</b>
                                        </div>
                                        <div className="discount">
                                            <span>Discount</span>
                                            <b>- {displayCartDiscount}</b>
                                        </div>
                                        <div className="delivery">
                                            <span>Delivery</span>
                                            <b>Free</b>
                                        </div>
                                        <div className="separator"></div>
                                        <div className="total_price">
                                            <b><small>Total Price</small></b>
                                            <b>{displayTotalAmount}</b>
                                        </div>
                                    </div>
                                    <button type="button" className="btn checkout_btn">Checkout</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Cart;