// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { BsArrowRight } from 'react-icons/bs';
// import useActive from '../../hooks/useActive';
// import ProductCard from './ProductCard';

// const TopProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { activeClass, handleActive } = useActive(0);

//     // Fetch products from the API on component mount
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/products/');  // Replace with your API endpoint
//                 setProducts(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Error fetching products');
//                 setLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);

//     // Making a unique set of product categories
//     const productsCategory = [
//         'All',
//         ...new Set(products.map(item => item.category))
//     ];

//     // Handling product filtering
//     const handleProducts = (category, i) => {
//         if (category === 'All') {
//             setProducts(products);  // Reset to all products
//             handleActive(i);
//             return;
//         }

//         const filteredProducts = products.filter(item => item.category === category);
//         setProducts(filteredProducts);
//         handleActive(i);
//     };

//     if (loading) return <p>Loading products...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <>
//             <div className="products_filter_tabs">
//                 <ul className="tabs">
//                     {
//                         productsCategory.map((item, i) => (
//                             <li
//                                 key={i}
//                                 className={`tabs_item ${activeClass(i)}`}
//                                 onClick={() => handleProducts(item, i)}
//                             >
//                                 {item}
//                             </li>
//                         ))
//                     }
//                 </ul>
//             </div>
//             <div className="wrapper products_wrapper">
//                 {
//                     products.slice(0, 11).map(item => (
//                         <ProductCard
//                             key={item.id}
//                             {...item}
//                         />
//                     ))
//                 }
//                 <div className="card products_card browse_card">
//                     <Link to="/all-products">
//                         Browse All <br /> Products <BsArrowRight />
//                     </Link>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default TopProducts;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { BsArrowRight } from 'react-icons/bs';
// import useActive from '../../hooks/useActive';
// import ProductCard from './ProductCard';

// const TopProducts = () => {
//     const [allProducts, setAllProducts] = useState([]);
//     const [displayedProducts, setDisplayedProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { activeClass, handleActive } = useActive(0);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/products/');
//                 setAllProducts(response.data);
//                 setDisplayedProducts(response.data);
//                 setLoading(false);
//                 console.log("top",response.data)
//             } catch (err) {
//                 setError('Error fetching products');
//                 setLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);

//     const productsCategory = [
//         'All',
//         ...new Set(allProducts.map(item => item.category))
//     ];

//     const handleProducts = (category, i) => {
//         if (category === 'All') {
//             setDisplayedProducts(allProducts);
//         } else {
//             const filteredProducts = allProducts.filter(item => item.category === category);
//             setDisplayedProducts(filteredProducts);
//         }
//         handleActive(i);
//     };

//     if (loading) return <p>Loading products...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <>
//             <div className="products_filter_tabs">
//                 <ul className="tabs">
//                     {productsCategory.map((item, i) => (
//                         <li
//                             key={i}
//                             className={`tabs_item ${activeClass(i)}`}
//                             onClick={() => handleProducts(item, i)}
//                         >
//                             {item}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="wrapper products_wrapper">
//                 {displayedProducts.slice(0, 11).map(item => (
//                     <ProductCard key={item.id} {...item} />
//                 ))}
//                 <div className="card products_card browse_card">
//                     <Link to="/all-products">
//                         Browse All <br /> Products <BsArrowRight />
//                     </Link>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default TopProducts;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import useActive from '../../hooks/useActive';
import ProductCard from './ProductCard';
import useProducts from '../../pages/useProducts';

const TopProducts = () => {
    const { products: allProducts, loading, error } = useProducts();
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const { activeClass, handleActive } = useActive(0);

    useEffect(() => {
        if (allProducts.length > 0) {
            setDisplayedProducts(allProducts);
        }
    }, [allProducts]);

    const productsCategory = ['All', ...new Set(allProducts.map(item => item.category))];

    const handleProducts = (category, i) => {
        if (category === 'All') {
            setDisplayedProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(item => item.category === category);
            setDisplayedProducts(filteredProducts);
        }
        handleActive(i);
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="products_filter_tabs">
                <ul className="tabs">
                    {productsCategory.map((item, i) => (
                        <li
                            key={i}
                            className={`tabs_item ${activeClass(i)}`}
                            onClick={() => handleProducts(item, i)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="wrapper products_wrapper">
                {displayedProducts.slice(0, 11).map(item => (
                    <ProductCard 
                        key={item.id} 
                        id={item.id}
                        title={item.title}
                        images={[item.hero_image, item.image2, item.image3, item.image4].filter(Boolean)}
                        final_price={item.final_price}  // Ensure this is a number
                        original_price={item.original_price}
                        rate_count={item.rate_count} 
                        path={item.path}
                    />
                ))}
                <div className="card products_card browse_card">
                    <Link to="/products">
                        Browse All <br /> Products <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;