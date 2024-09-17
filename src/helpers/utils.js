
// Display Money in Indian Format
export const displayMoney = (n) => {
    const numFormat = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    return numFormat.format(n).split('.', 1);
};


// Calculate Discount Percentage
export const calculateDiscount = (discountedPrice, original_price) => {
    const discountedPercent = (discountedPrice / original_price) * 100;

    return Math.round(discountedPercent);
};


// Calculate Total Amount
export const calculateTotal = (arr) => {
    const total = arr.reduce((accum, val) => accum + val, 0);

    return total;
};