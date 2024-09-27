// const filtersReducer = (state, action) => {
//     switch (action.type) {

//         case 'LOAD_ALL_PRODUCTS':

//             const { products, minPrice, maxPrice } = action.payload;

//             return {
//                 ...state,
//                 allProducts: products,
//                 selectedPrice: {
//                     ...state.selectedPrice,
//                     price: maxPrice,
//                     minPrice: minPrice,
//                     maxPrice,
//                 }
//             };


//         case 'SET_SORTED_VALUE':
//             return {
//                 ...state,
//                 sortedValue: action.payload.sortValue
//             };


//         case 'CHECK_BRANDS_MENU':
//             return {
//                 ...state,
//                 updatedBrandsMenu: state.updatedBrandsMenu.map(item => {
//                     if (item.id === action.payload.id) {
//                         return {
//                             ...item,
//                             checked: !item.checked
//                         };
//                     } else {
//                         return item;
//                     }
//                 })
//             };


//         case 'CHECK_CATEGORY_MENU':
//             return {
//                 ...state,
//                 updatedCategoryMenu: state.updatedCategoryMenu.map(item => {
//                     if (item.id === action.payload.id) {
//                         return {
//                             ...item,
//                             checked: !item.checked
//                         };
//                     } else {
//                         return item;
//                     }
//                 })
//             };


//         case 'HANDLE_PRICE':
//             return {
//                 ...state,
//                 selectedPrice: {
//                     ...state.selectedPrice,
//                     price: action.payload.value
//                 }
//             };


//         case 'FILTERED_PRODUCTS':
//             return {
//                 ...state,
//                 allProducts: action.payload.updatedProducts,
//             };


//         case 'MOB_SORT_VISIBILITY':
//             return {
//                 ...state,
//                 mobFilterBar: {
//                     ...state.mobFilterBar,
//                     isMobSortVisible: action.payload.toggle
//                 }
//             };


//         case 'MOB_FILTER_VISIBILITY':
//             return {
//                 ...state,
//                 mobFilterBar: {
//                     ...state.mobFilterBar,
//                     isMobFilterVisible: action.payload.toggle
//                 }
//             };


//         case 'CLEAR_FILTERS':
//             return {
//                 ...state,
//                 sortedValue: null,
//             };


//         default:
//             return state;
//     }
// };

// export default filtersReducer;

// const filtersReducer = (state, action) => {
//     switch (action.type) {
//         case 'LOAD_ALL_PRODUCTS':
//             return {
//                 ...state,
//                 allProducts: action.payload.products,
//                 updatedBrandsMenu: action.payload.brands.map((brand, index) => ({
//                     id: index + 1,
//                     label: brand,
//                     checked: false,
//                 })),
//                 updatedCategoryMenu: action.payload.categories.map((category, index) => ({
//                     id: index + 1,
//                     label: category,
//                     checked: false,
//                 })),
//                 selectedPrice: {
//                     price: action.payload.maxPrice,
//                     minPrice: action.payload.minPrice,
//                     maxPrice: action.payload.maxPrice,
//                 }
//             };
//         // Other cases...
//         default:
//             return state;
//     }
// };

// export default filtersReducer;

// const filtersReducer = (state, action) => {
//     switch (action.type) {
//         case 'LOAD_ALL_PRODUCTS':
//             return {
//                 ...state,
//                 allProducts: action.payload.products,
//                 updatedBrandsMenu: action.payload.brands.map((brand, index) => ({
//                     id: index + 1,
//                     label: brand,
//                     checked: false,
//                 })),
//                 updatedCategoryMenu: action.payload.categories.map((category, index) => ({
//                     id: index + 1,
//                     label: category,
//                     checked: false,
//                 })),
//                 selectedPrice: {
//                     price: action.payload.maxPrice,
//                     minPrice: action.payload.minPrice,
//                     maxPrice: action.payload.maxPrice,
//                 }
//             };

//         // New case for toggling brand selection
//         case 'CHECK_BRANDS_MENU':
//             const updatedBrandsMenu = state.updatedBrandsMenu.map((brand) => {
//                 if (brand.id === action.payload.id) {
//                     return { ...brand, checked: !brand.checked }; // Toggle the checked state
//                 }
//                 return brand;
//             });
//             return {
//                 ...state,
//                 updatedBrandsMenu, // Update the state with the new brands menu
//             };

//         // New case for toggling category selection
//         case 'CHECK_CATEGORY_MENU':
//             const updatedCategoryMenu = state.updatedCategoryMenu.map((category) => {
//                 if (category.id === action.payload.id) {
//                     return { ...category, checked: !category.checked }; // Toggle the checked state
//                 }
//                 return category;
//             });
//             return {
//                 ...state,
//                 updatedCategoryMenu, // Update the state with the new categories menu
//             };

//         // Other cases...
//         default:
//             return state;
//     }
// };

// export default filtersReducer;



const filtersReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_ALL_PRODUCTS':
            return {
                ...state,
                allProducts: action.payload.products,
                filteredProducts: action.payload.products,
                updatedBrandsMenu: action.payload.brands.map((brand, index) => ({
                    id: index + 1,
                    label: brand,
                    checked: false,
                })),
                updatedCategoryMenu: action.payload.categories.map((category, index) => ({
                    id: index + 1,
                    label: category,
                    checked: false,
                })),
                selectedPrice: {
                    price: action.payload.maxPrice,
                    minPrice: action.payload.minPrice,
                    maxPrice: action.payload.maxPrice,
                }
            };

        case 'SET_SORTED_VALUE':
            return {
                ...state,
                sortedValue: action.payload.sortValue
            };

        case 'CHECK_BRANDS_MENU':
            return {
                ...state,
                updatedBrandsMenu: state.updatedBrandsMenu.map(brand => 
                    brand.id === action.payload.id ? { ...brand, checked: !brand.checked } : brand
                )
            };

        case 'CHECK_CATEGORY_MENU':
            return {
                ...state,
                updatedCategoryMenu: state.updatedCategoryMenu.map(category => 
                    category.id === action.payload.id ? { ...category, checked: !category.checked } : category
                )
            };

        case 'HANDLE_PRICE':
            return {
                ...state,
                selectedPrice: {
                    ...state.selectedPrice,
                    price: Number(action.payload.value)
                }
            };

        case 'MOB_SORT_VISIBILITY':
            return {
                ...state,
                mobFilterBar: {
                    ...state.mobFilterBar,
                    isMobSortVisible: action.payload.toggle
                }
            };

        case 'MOB_FILTER_VISIBILITY':
            return {
                ...state,
                mobFilterBar: {
                    ...state.mobFilterBar,
                    isMobFilterVisible: action.payload.toggle
                }
            };

        case 'APPLY_FILTERS':
            let updatedProducts = [...state.allProducts];

            // Apply sorting
            if (state.sortedValue) {
                switch (state.sortedValue) {
                    case 'Latest':
                        updatedProducts = updatedProducts.slice(0, 6);
                        break;
                    case 'Featured':
                        updatedProducts = updatedProducts.filter(item => item.tag === 'featured-product');
                        break;
                    case 'Top Rated':
                        updatedProducts = updatedProducts.filter(item => item.rate_count > 4);
                        break;
                    case 'Price(Lowest First)':
                        updatedProducts.sort((a, b) => a.final_price - b.final_price);
                        break;
                    case 'Price(Highest First)':
                        updatedProducts.sort((a, b) => b.final_price - a.final_price);
                        break;
                    default:
                        break;
                }
            }

            // Apply brand filter
            const checkedBrands = state.updatedBrandsMenu.filter(brand => brand.checked).map(brand => brand.label);
            if (checkedBrands.length) {
                updatedProducts = updatedProducts.filter(product => checkedBrands.includes(product.brand));
            }

            // Apply category filter
            const checkedCategories = state.updatedCategoryMenu.filter(category => category.checked).map(category => category.label);
            if (checkedCategories.length) {
                updatedProducts = updatedProducts.filter(product => checkedCategories.includes(product.category));
            }

            // Apply price filter
            updatedProducts = updatedProducts.filter(product => product.final_price <= state.selectedPrice.price);

            return {
                ...state,
                filteredProducts: updatedProducts
            };

        case 'CLEAR_FILTERS':
            return {
                ...state,
                sortedValue: null,
                updatedBrandsMenu: state.updatedBrandsMenu.map(brand => ({ ...brand, checked: false })),
                updatedCategoryMenu: state.updatedCategoryMenu.map(category => ({ ...category, checked: false })),
                selectedPrice: {
                    ...state.selectedPrice,
                    price: state.selectedPrice.maxPrice
                },
                filteredProducts: state.allProducts
            };

        default:
            return state;
    }
};

export default filtersReducer;