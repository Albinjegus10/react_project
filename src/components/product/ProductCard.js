// import React, { useContext } from 'react';
// import { IoMdStar } from 'react-icons/io';
// import { Link } from 'react-router-dom';
// import { displayMoney } from '../../helpers/utils';
// import cartContext from '../../contexts/cart/cartContext';
// import useActive from '../../hooks/useActive';


// const ProductCard = (props) => {

//     const { id, images, title, info, finalPrice, originalPrice, rateCount, path } = props;

//     const { addItem } = useContext(cartContext);
//     const { active, handleActive, activeClass } = useActive(false);


//     // handling Add-to-cart
//     const handleAddItem = () => {
//         const item = { ...props };
//         addItem(item);

//         handleActive(id);

//         setTimeout(() => {
//             handleActive(false);
//         }, 3000);
//     };

//     const newPrice = displayMoney(finalPrice);
//     const oldPrice = displayMoney(originalPrice);


//     return (
//         <>
//             <div className="card products_card">
//                 <figure className="products_img">
//                     <Link to={`${path}${id}`}>
//                         <img src={images[0]} alt="product-img" />
//                     </Link>
//                 </figure>
//                 <div className="products_details">
//                     <span className="rating_star">
//                         {
//                             [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
//                         }
//                     </span>
//                     <h3 className="products_title">
//                         <Link to={`${path}${id}`}>{title}</Link>
//                     </h3>
//                     <h5 className="products_info">{info}</h5>
//                     <div className="separator"></div>
//                     <h2 className="products_price">
//                         {newPrice} &nbsp;
//                         <small><del>{oldPrice}</del></small>
//                     </h2>
//                     <button
//                         type="button"
//                         className={`btn products_btn ${activeClass(id)}`}
//                         onClick={handleAddItem}
//                     >
//                         {active ? 'Added' : 'Add to cart'}
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ProductCard;

// import React, { useContext } from 'react';
// import { IoMdStar } from 'react-icons/io';
// import { Link } from 'react-router-dom';
// import { displayMoney } from '../../helpers/utils';
// import cartContext from '../../contexts/cart/cartContext';
// import useActive from '../../hooks/useActive';

// const ProductCard = (props) => {
//     const { id, images, title, info, final_price, original_price, rate_count, path } = props;
//     console.log(images,"images");
//     const { addItem } = useContext(cartContext);
//     const { active, handleActive, activeClass } = useActive(false);

//     // handling Add-to-cart
//     const handleAddItem = () => {
//         const item = { ...props };
//         addItem(item);

//         handleActive(id);

//         setTimeout(() => {
//             handleActive(false);
//         }, 3000);
//     };

//     const newPrice = displayMoney(final_price);
//     const oldPrice = displayMoney(original_price);

//     return (
//         <div className="card products_card">
//             <figure className="products_img">
//                 <Link to={`${path}${id}`}>
//                     {images && images.length > 0 && <img src={images[0]} alt="product-img" />}
//                 </Link>
//             </figure>
//             <div className="products_details">
//                 <span className="rating_star">
//                     {[...Array(rate_count)].map((_, i) => <IoMdStar key={i} />)}
//                 </span>
//                 <h3 className="products_title">
//                     <Link to={`${path}${id}`}>{title}</Link>
//                 </h3>
//                 <h5 className="products_info">{info}</h5>
//                 <div className="separator"></div>
//                 <h2 className="products_price">
//                     {newPrice} &nbsp;
//                     <small><del>{oldPrice}</del></small>
//                 </h2>
//                 <button
//                     type="button"
//                     className={`btn products_btn ${activeClass(id)}`}
//                     onClick={handleAddItem}
//                 >
//                     {active ? 'Added' : 'Add to cart'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

import React, { useContext } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios';
import { displayMoney } from '../../helpers/utils';
import cartContext from '../../contexts/cart/cartContext';
import useActive from '../../hooks/useActive';
import { jwtDecode } from 'jwt-decode';


const ProductCard = (props) => {
    const { id, images, title, info, final_price, original_price, rate_count, path } = props;
    const { addItem } = useContext(cartContext);
    const { active, handleActive, activeClass } = useActive(false);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // handling Add-to-cart
    const isAuthenticated = !!localStorage.getItem('jwt_token'); // Check if token exists
    

    // Handle Add to Cart
    const handleAddItem = async () => {
        if (!isAuthenticated) {
            // If user is not authenticated, redirect to login
            navigate('/login');
            return;
        }

        const token = localStorage.getItem('jwt_token'); // Get JWT token
        let userId;

        try {
            // Decode JWT token to get user ID
            const decodedToken = jwtDecode(token);
            userId = decodedToken.user_id; // Adjust the field name based on your token's structure

            if (!userId) {
                throw new Error('User ID not found in token');
            }

            const item = { ...props };

            // Make API request to add item to cart
            await axios.post('http://127.0.0.1:8000/api/cart-items/', {
                product: id,
                quantity: 1,
                user: userId // Use the user ID from the token
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send token in Authorization header
                }
            });

            // Add item to local context (cart)
            addItem(item);

            handleActive(id);

            setTimeout(() => {
                handleActive(false);
            }, 3000);

        } catch (error) {
            console.error('Error adding item to cart:', error.response || error);
            alert('Failed to add item to cart.');
        }
    };

    const newPrice = displayMoney(final_price);
    const oldPrice = displayMoney(original_price);

    return (
        <div className="card products_card">
            <figure className="products_img">
                <Link to={`${path}${id}`}>
                    {images && images.length > 0 && <img src={images[0]} alt="product-img" />}
                </Link>
            </figure>
            <div className="products_details">
                <span className="rating_star">
                    {[...Array(rate_count)].map((_, i) => <IoMdStar key={i} />)}
                </span>
                <h3 className="products_title">
                    <Link to={`${path}${id}`}>{title}</Link>
                </h3>
                <h5 className="products_info">{info}</h5>
                <div className="separator"></div>
                <h2 className="products_price">
                    {newPrice} &nbsp;
                    <small><del>{oldPrice}</del></small>
                </h2>
                <button
                    type="button"
                    className={`btn products_btn ${activeClass(id)}`}
                    onClick={handleAddItem}
                >
                    {active ? 'Added' : 'Add to cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;