
// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { IoMdStar, IoMdCheckmark } from 'react-icons/io';
// import axios from 'axios';
// import { calculateDiscount, displayMoney } from '../helpers/utils';
// import useDocTitle from '../hooks/useDocTitle';
// import useActive from '../hooks/useActive';
// import cartContext from '../contexts/cart/cartContext';
// import SectionsHead from '../components/common/SectionsHead';
// import RelatedSlider from '../components/sliders/RelatedSlider';
// import ProductSummary from '../components/product/ProductSummary';
// import Services from '../components/common/Services';

// const ProductDetails = () => {
//     useDocTitle('Product Details');
//     const { handleActive, activeClass } = useActive(0);
//     const { addItem } = useContext(cartContext);
//     const { productId } = useParams();

//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`);
//                 console.log('API Response:', response.data);
//                 setProduct(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching product:', err);
//                 setError('Failed to fetch product details');
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [productId]);

//     const [previewImg, setPreviewImg] = useState('');

//     useEffect(() => {
//         if (product) {
//             const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
//             if (images.length > 0) {
//                 const initialImage = images[0];
//                 console.log("Initial Image URL:", initialImage);
//                 setPreviewImg(initialImage);
//                 handleActive(0);
//             }
//         }
//     }, [product, handleActive]);

//     const handleAddItem = () => {
//         if (product) {
//             addItem(product);
//         }
//     };

//     const handlePreviewImg = (i) => {
//         const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
//         if (images[i]) {
//             console.log('Selected Image Index:', i);
//             console.log('Selected Image URL:', images[i]);
//             setPreviewImg(images[i]);
//             handleActive(i); // Ensure this function is properly updating active class
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//     if (!product) return <div>Product not found</div>;

//     const {
//         tag,
//         tagline,
//         hero_image,
//         image1,
//         image2,
//         image3,
//         image4,
//         brand,
//         title,
//         info,
//         category,
//         type,
//         connectivity,
//         final_price,
//         original_price,
//         quantity,
//         ratings,
//         rate_count,
//         path
//     } = product;

//     const images = [image1, image2, image3, image4].filter(Boolean);

//     const discountedPrice = original_price - final_price;
//     const newPrice = displayMoney(final_price);
//     const oldPrice = displayMoney(original_price);
//     const savedPrice = displayMoney(discountedPrice);
//     const savedDiscount = calculateDiscount(discountedPrice, original_price);

//     return (
//         <>
//             <section id="product_details" className="section">
//                 <div className="container">
//                     <div className="wrapper prod_details_wrapper">
//                         {/*=== Product Details Left-content ===*/}
//                         <div className="prod_details_left_col">
//                             <div className="prod_details_tabs">
//                                 {images.map((img, i) => (
//                                     <div
//                                         key={i}
//                                         className={`tabs_item ${activeClass(i)}`}
//                                         onClick={() => handlePreviewImg(i)}
//                                     >
//                                         <img src={img} alt={`product-img-${i}`} />
//                                     </div>
//                                 ))}
//                             </div>
//                             <figure className="prod_details_img">
//                                 <img src={previewImg} alt="product-img" />
//                             </figure>
//                         </div>

//                         {/*=== Product Details Right-content ===*/}
//                         <div className="prod_details_right_col">
//                             {/* {tag && <span className="prod_details_tag">{tag}</span>} */}
//                             {tagline && <p className="prod_details_tagline">{tagline}</p>}
//                             <h1 className="prod_details_title">{title}</h1>
//                             <h4 className="prod_details_info">{info}</h4>
//                             {/* {brand && <p className="prod_details_brand">Brand: {brand}</p>}
//                             {type && <p className="prod_details_type">Type: {type}</p>}
//                             {connectivity && <p className="prod_details_connectivity">Connectivity: {connectivity}</p>} */}

//                             <div className="prod_details_ratings">
//                                 <span className="rating_star">
//                                     {[...Array(ratings || 0)].map((_, i) => <IoMdStar key={i} />)}
//                                 </span>
//                                 <span>|</span>
//                                 <Link to="*">{rate_count || 0} Ratings</Link>
//                             </div>

//                             <div className="separator"></div>

//                             <div className="prod_details_price">
//                                 <div className="price_box">
//                                     <h2 className="price">
//                                         {newPrice} &nbsp;
//                                         <small className="del_price"><del>{oldPrice}</del></small>
//                                     </h2>
//                                     <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p>
//                                     <span className="tax_txt">(Inclusive of all taxes)</span>
//                                 </div>

//                                 <div className="badge">
//                                     <span><IoMdCheckmark /> {quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
//                                 </div>
//                             </div>

//                             <div className="separator"></div>

//                             <div className="prod_details_offers">
//                                 <h4>Offers and Discounts</h4>
//                                 <ul>
//                                     <li>No Cost EMI on Credit Card</li>
//                                     <li>Pay Later & Avail Cashback</li>
//                                 </ul>
//                             </div>

//                             <div className="separator"></div>

//                             <div className="prod_details_buy_btn">
//                                 <button
//                                     type="button"
//                                     className="btn"
//                                     onClick={handleAddItem}
//                                     disabled={quantity <= 0}
//                                 >
//                                     {quantity > 0 ? 'Add to cart' : 'Out of Stock'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <ProductSummary {...product} />

//             <section id="related_products" className="section">
//                 <div className="container">
//                     <SectionsHead heading="Related Products" />
//                     <RelatedSlider category={category} />
//                 </div>
//             </section>

//             <Services />
//         </>
//     );
// };

// export default ProductDetails;



// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { IoMdStar, IoMdCheckmark } from 'react-icons/io';
// import axios from 'axios';
// import { calculateDiscount, displayMoney } from '../helpers/utils';
// import useDocTitle from '../hooks/useDocTitle';
// import useActive from '../hooks/useActive';
// import cartContext from '../contexts/cart/cartContext';
// import SectionsHead from '../components/common/SectionsHead';
// import RelatedSlider from '../components/sliders/RelatedSlider';
// import ProductSummary from '../components/product/ProductSummary';
// import Services from '../components/common/Services';

// const ProductDetails = () => {
//     useDocTitle('Product Details');
//     const { handleActive, activeClass } = useActive(0);
//     const { addItem } = useContext(cartContext);
//     const { productId } = useParams();

//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`);
//                 console.log('API Response:', response.data);
//                 setProduct(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching product:', err);
//                 setError('Failed to fetch product details');
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [productId]);

//     const [previewImg, setPreviewImg] = useState('');

//     useEffect(() => {
//         if (product) {
//             const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
//             if (images.length > 0) {
//                 const initialImage = images[0];
//                 console.log("Initial Image URL:", initialImage);
//                 setPreviewImg(initialImage);
//                 handleActive(0);
//             }
//         }
//     }, [product, handleActive]);

//     const handleAddItem = () => {
//         if (product) {
//             addItem(product);
//         }
//     };

//     const handlePreviewImg = (index) => {
//         if (product) {
//             const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
//             if (images[index]) {
//                 console.log('Selected Image Index:', index);
//                 console.log('Selected Image URL:', images[index]);
//                 setPreviewImg(images[index]);
//                 handleActive(index); // Ensure this function is properly updating active class
//             }
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//     if (!product) return <div>Product not found</div>;

//     const {
//         tagline,
//         title,
//         info,
//         category,
//         final_price,
//         original_price,
//         quantity,
//         ratings,
//         rate_count
//     } = product;

//     const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);

//     const discountedPrice = original_price - final_price;
//     const newPrice = displayMoney(final_price);
//     const oldPrice = displayMoney(original_price);
//     const savedPrice = displayMoney(discountedPrice);
//     const savedDiscount = calculateDiscount(discountedPrice, original_price);

//     return (
//         <>
//             <section id="product_details" className="section">
//                 <div className="container">
//                     <div className="wrapper prod_details_wrapper">
//                         {/*=== Product Details Left-content ===*/}
//                         <div className="prod_details_left_col">
//                             <div className="prod_details_tabs">
//                                 {images.length > 0 ? (
//                                     images.map((img, i) => (
//                                         <div
//                                             key={i}
//                                             className={`tabs_item ${activeClass(i)}`}
//                                             onClick={() => handlePreviewImg(i)}
//                                         >
//                                             <img src={img} alt={`product-img-${i}`} />
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No images available</p>
//                                 )}
//                             </div>
//                             <figure className="prod_details_img">
//                                 <img src={previewImg || 'path/to/default/image.jpg'} alt="product-img" />
//                             </figure>
//                         </div>

//                         {/*=== Product Details Right-content ===*/}
//                         <div className="prod_details_right_col">
//                             {tagline && <p className="prod_details_tagline">{tagline}</p>}
//                             <h1 className="prod_details_title">{title}</h1>
//                             <h4 className="prod_details_info">{info}</h4>

//                             <div className="prod_details_ratings">
//                                 <span className="rating_star">
//                                     {[...Array(ratings || 0)].map((_, i) => <IoMdStar key={i} />)}
//                                 </span>
//                                 <span>|</span>
//                                 <Link to="*">{rate_count || 0} Ratings</Link>
//                             </div>

//                             <div className="separator"></div>

//                             <div className="prod_details_price">
//                                 <div className="price_box">
//                                     <h2 className="price">
//                                         {newPrice} &nbsp;
//                                         <small className="del_price"><del>{oldPrice}</del></small>
//                                     </h2>
//                                     <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p>
//                                     <span className="tax_txt">(Inclusive of all taxes)</span>
//                                 </div>

//                                 <div className="badge">
//                                     <span><IoMdCheckmark /> {quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
//                                 </div>
//                             </div>

//                             <div className="separator"></div>

//                             <div className="prod_details_offers">
//                                 <h4>Offers and Discounts</h4>
//                                 <ul>
//                                     <li>No Cost EMI on Credit Card</li>
//                                     <li>Pay Later & Avail Cashback</li>
//                                 </ul>
//                             </div>

//                             <div className="separator"></div>

//                             <div className="prod_details_buy_btn">
//                                 <button
//                                     type="button"
//                                     className="btn"
//                                     onClick={handleAddItem}
//                                     disabled={quantity <= 0}
//                                 >
//                                     {quantity > 0 ? 'Add to cart' : 'Out of Stock'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <ProductSummary {...product} />

//             <section id="related_products" className="section">
//                 <div className="container">
//                     <SectionsHead heading="Related Products" />
//                     <RelatedSlider category={category} />
//                 </div>
//             </section>

//             <Services />
//         </>
//     );
// };

// export default ProductDetails;


import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoMdStar, IoMdCheckmark } from 'react-icons/io';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { calculateDiscount, displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import cartContext from '../contexts/cart/cartContext';
import SectionsHead from '../components/common/SectionsHead';
import RelatedSlider from '../components/sliders/RelatedSlider';
import ProductSummary from '../components/product/ProductSummary';
import Services from '../components/common/Services';

const ProductDetails = () => {
    useDocTitle('Product Details');
    const { addItem } = useContext(cartContext);
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to fetch product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (product) {
            const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
            if (images.length > 0) {
                setPreviewImg(images[0]);
            }
        }
    }, [product]);

    const handleAddItem = async () => {
        const isAuthenticated = !!localStorage.getItem('jwt_token');

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const token = localStorage.getItem('jwt_token');
        let userId;

        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.user_id;

            if (!userId) {
                throw new Error('User ID not found in token');
            }

            await axios.post('http://127.0.0.1:8000/api/cart-items/', {
                product: productId,
                quantity: 1,
                user: userId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            addItem(product);
            setIsAddedToCart(true);

            setTimeout(() => {
                setIsAddedToCart(false);
            }, 3000);

        } catch (error) {
            console.error('Error adding item to cart:', error.response || error);
            alert('Failed to add item to cart.Product is Already in Cart');
        }
    };

    const handlePreviewImgById = (id) => {
        if (product) {
            const images = [
                { id: 1, url: product.image1 },
                { id: 2, url: product.image2 },
                { id: 3, url: product.image3 },
                { id: 4, url: product.image4 }
            ].filter(img => img.url);

            const selectedImage = images.find(img => img.id === id);
            if (selectedImage) {
                setPreviewImg(selectedImage.url);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    const {
        tagline,
        title,
        info,
        category,
        final_price,
        original_price,
        quantity,
        ratings,
        rate_count
    } = product;
   
    const images = [
        { id: 1, url: product.image1 },
        { id: 2, url: product.image2 },
        { id: 3, url: product.image3 },
        { id: 4, url: product.image4 }
    ].filter(img => img.url);

    const discountedPrice = original_price - final_price;
    const newPrice = displayMoney(final_price);
    const oldPrice = displayMoney(original_price);
    const savedPrice = displayMoney(discountedPrice);
    const savedDiscount = calculateDiscount(discountedPrice, original_price);

    return (
        <>
            <section id="product_details" className="section">
                <div className="container">
                    <div className="wrapper prod_details_wrapper">
                        {/* Product Details Left-content */}
                        <div className="prod_details_left_col">
                            <div className="prod_details_tabs">
                                {images.length > 0 ? (
                                    images.map((img) => (
                                        <div
                                            key={img.id}
                                            className={`tabs_item`}
                                            onClick={() => handlePreviewImgById(img.id)}
                                        >
                                            <img src={img.url} alt={`product-img-${img.id}`} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                            </div>
                            <figure className="prod_details_img">
                                <img src={previewImg || 'path/to/default/image.jpg'} alt="product-img" />
                            </figure>
                        </div>

                        {/* Product Details Right-content */}
                        <div className="prod_details_right_col">
                            {tagline && <p className="prod_details_tagline">{tagline}</p>}
                            <h1 className="prod_details_title">{title}</h1>
                            <h4 className="prod_details_info">{info}</h4>

                            <div className="prod_details_ratings">
                                <span className="rating_star">
                                    {[...Array(ratings || 0)].map((_, i) => <IoMdStar key={i} />)}
                                </span>
                                <span>|</span>
                                <Link to="*">{rate_count || 0} Ratings</Link>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_price">
                                <div className="price_box">
                                    <h2 className="price">
                                        {newPrice} &nbsp;
                                        <small className="del_price"><del>{oldPrice}</del></small>
                                    </h2>
                                    <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p>
                                    <span className="tax_txt">(Inclusive of all taxes)</span>
                                </div>

                                <div className="badge">
                                    <span><IoMdCheckmark /> {quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                </div>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_offers">
                                <h4>Offers and Discounts</h4>
                                <ul>
                                    <li>No Cost EMI on Credit Card</li>
                                    <li>Pay Later & Avail Cashback</li>
                                </ul>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_buy_btn">
                                <button
                                    type="button"
                                    className={`btn ${isAddedToCart ? 'added' : ''}`}
                                    onClick={handleAddItem}
                                    disabled={quantity <= 0}
                                >
                                    {isAddedToCart ? 'Added to Cart' : (quantity > 0 ? 'Add to Cart' : 'Out of Stock')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProductSummary {...product} />

            <section id="related_products" className="section">
                <div className="container">
                    <SectionsHead heading="Related Products" />
                    <RelatedSlider category={category} />
                </div>
            </section>

            <Services />
        </>
    );
};

export default ProductDetails;
