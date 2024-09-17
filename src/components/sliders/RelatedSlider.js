import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper';
import axios from 'axios';
import ProductCard from '../product/ProductCard';
import 'swiper/scss';
import 'swiper/scss/pagination';


const RelatedSlider = (props) => {
    const { category } = props;
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/category/${category}`);
                setRelatedProducts(response.data);
                console.log("Fetched related products:", response.data);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        if (category) {
            fetchRelatedProducts();
        }
    }, [category]);

    return (
        <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={10}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 4 },
            }}
            className="related_swiper"
        >
            {
                relatedProducts.map(item => (
                    <SwiperSlide key={item.id}>
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
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default RelatedSlider;
