import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash } from 'react-icons/tb';
import axios from 'axios';
import { displayMoney } from '../../helpers/utils';
import cartContext from '../../contexts/cart/cartContext';
import QuantityBox from '../common/QuantityBox';

const CartItem = ({ id, quantity }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { removeItem } = useContext(cartContext);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError('Failed to fetch product details');
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return null;

    const { title, info, final_price, original_price, image1 } = product;
    const newPrice = displayMoney(final_price);
    const oldPrice = displayMoney(original_price);

    return (
        <div className="cart_item">
            <figure className="cart_item_img">
                <Link to={`/product-details/${id}`}>
                    <img src={image1} alt="product-img" />
                </Link>
            </figure>
            <div className="cart_item_info">
                <div className="cart_item_head">
                    <h4 className="cart_item_title">
                        <Link to={`/product-details/${id}`}>{title} {info}</Link>
                    </h4>
                    <div className="cart_item_del">
                        <span onClick={() => removeItem(id)}>
                            <TbTrash />
                        </span>
                        <div className="tooltip">Remove Item</div>
                    </div>
                </div>

                <h2 className="cart_item_price">
                    {newPrice} &nbsp;
                    <small><del>{oldPrice}</del></small>
                </h2>

                <QuantityBox itemId={id} itemQuantity={quantity} />
            </div>
        </div>
    );
};

export default CartItem;