import React from 'react';

// Sample data for demonstration
const ordersData = [
    {
        id: 1,
        productName: 'Product 1',
        productImage: 'https://via.placeholder.com/100',
        productDetails: 'Details about Product 1',
        purchaseDate: '2024-09-01',
    },
    {
        id: 2,
        productName: 'Product 2',
        productImage: 'https://via.placeholder.com/100',
        productDetails: 'Details about Product 2',
        purchaseDate: '2024-09-02',
    },
    {
        id: 3,
        productName: 'Product 3',
        productImage: 'https://via.placeholder.com/100',
        productDetails: 'Details about Product 3',
        purchaseDate: '2024-09-03',
    },
];

const Orders = () => {
    return (
        <div>
            <h1>Your Orders</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>S.No</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Image</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Details</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersData.map((order, index) => (
                        <tr key={order.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.productName}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <img src={order.productImage} alt={order.productName} style={{ width: '100px', height: 'auto' }} />
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.productDetails}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.purchaseDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;

