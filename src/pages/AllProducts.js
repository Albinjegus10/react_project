// import React, { useContext } from 'react';
// import { BsExclamationCircle } from 'react-icons/bs';
// import useDocTitle from '../hooks/useDocTitle';
// import FilterBar from '../components/filters/FilterBar';
// import ProductCard from '../components/product/ProductCard';
// import Services from '../components/common/Services';
// import filtersContext from '../contexts/filters/filtersContext';
// import EmptyView from '../components/common/EmptyView';


// const AllProducts = () => {

//     useDocTitle('All Products');

//     const { allProducts } = useContext(filtersContext);


//     return (
//         <>
//             <section id="all_products" className="section">
//                 <FilterBar />

//                 <div className="container">
//                     {
//                         allProducts.length ? (
//                             <div className="wrapper products_wrapper">
//                                 {
//                                     allProducts.map(item => (
//                                         <ProductCard
//                                             key={item.id}
//                                             {...item}
//                                         />
//                                     ))
//                                 }
//                             </div>
//                         ) : (
//                             <EmptyView
//                                 icon={<BsExclamationCircle />}
//                                 msg="No Results Found"
//                             />
//                         )
//                     }
//                 </div>
//             </section>

//             <Services />
//         </>
//     );
// };

// export default AllProducts;

// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios'; // Import axios
// import { BsExclamationCircle } from 'react-icons/bs';
// import useDocTitle from '../hooks/useDocTitle';
// import FilterBar from '../components/filters/FilterBar';
// import ProductCard from '../components/product/ProductCard';
// import Services from '../components/common/Services';
// import filtersContext from '../contexts/filters/filtersContext';
// import EmptyView from '../components/common/EmptyView';

// const AllProducts = () => {
//     useDocTitle('All Products');

//     const { setAllProducts } = useContext(filtersContext); // Assuming you have a setter in your context
//     const [allProducts, setAllProductsLocal] = useState([]); // Local state to store products
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state

//     // Fetch products from the API when component mounts
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get('http://localhost:8000/api/products/');
//                 console.log("ggggg",response.data)

                
              
//                 setAllProductsLocal(response.data); // Update local state
//             } catch (err) {
//                 setError('Failed to fetch products');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, [setAllProducts]);

//     if (loading) {
//         return <div>Loading...</div>; // Show loading state
//     }

//     if (error) {
//         return <div>{error}</div>; // Show error message
//     }

//     return (
//         <>
//             <section id="all_products" className="section">
//                 <FilterBar />

//                 <div className="container">
//                     {
//                         allProducts.length ? (
//                             <div className="wrapper products_wrapper">
//                                 {
//                                     allProducts.map(item => (
//                                         <ProductCard
//                                             key={item.id}
//                                         id={item.id}
//                                         title={item.title}
//                                         // Filter the images array to remove any falsy values (like null or undefined)
//                                         images={[item.hero_image, item.image2, item.image3, item.image4].filter(Boolean)}
//                                         final_price={item.final_price}  // Ensure final_price is being sent correctly
//                                         original_price={item.original_price}
//                                         rate_count={item.rate_count}  // Assuming this is a number
//                                         path={item.path} 
//                                         />
//                                     ))
//                                 }
//                             </div>
//                         ) : (
//                             <EmptyView
//                                 icon={<BsExclamationCircle />}
//                                 msg="No Results Found"
//                             />
//                         )
//                     }
//                 </div>
//             </section>

//             <Services />
//         </>
//     );
// };

// export default AllProducts;


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import FilterBar from '../components/filters/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
import filtersContext from '../contexts/filters/filtersContext';
import EmptyView from '../components/common/EmptyView';

const AllProducts = () => {
    useDocTitle('All Products');

    const { 
        allProducts, 
        filteredProducts, 
        setAllProducts, 
        applyFilters 
    } = useContext(filtersContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8000/api/products/');
                setAllProducts(response.data);
                applyFilters(); // Apply initial filters
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array to only fetch products once

    useEffect(() => {
        applyFilters();
    }, [allProducts, applyFilters]); // Apply filters whenever allProducts changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : allProducts;

    return (
        <>
            <section id="all_products" className="section">
                <FilterBar />

                <div className="container">
                    {
                        productsToDisplay.length ? (
                            <div className="wrapper products_wrapper">
                                {
                                    productsToDisplay.map(item => (
                                        <ProductCard
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            images={[item.hero_image, item.image2, item.image3, item.image4].filter(Boolean)}
                                            final_price={item.final_price}
                                            original_price={item.original_price}
                                            rate_count={item.rate_count}
                                            path={item.path} 
                                        />
                                    ))
                                }
                            </div>
                        ) : (
                            <EmptyView
                                icon={<BsExclamationCircle />}
                                msg="No Results Found"
                            />
                        )
                    }
                </div>
            </section>

            <Services />
        </>
    );
};

export default AllProducts;
