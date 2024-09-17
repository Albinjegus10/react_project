import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = (tag = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        const allProducts = response.data;
        
        if (tag) {
          const filteredProducts = allProducts.filter(product => product.tag === tag);
          setProducts(filteredProducts);
        } else {
          setProducts(allProducts);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [tag]);

  return { products, loading, error };
};

export default useProducts;