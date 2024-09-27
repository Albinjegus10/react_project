import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { dropdownMenu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import SearchBar from './SearchBar';
import AccountForm from '../form/AccountForm';
import { isAuthenticated, logout, getUsername} from '../../services/authService';
import axios from 'axios';

const Header = () => {
    const { toggleForm, toggleSearch } = useContext(commonContext);
    const { cartItems } = useContext(cartContext);
    const [isSticky, setIsSticky] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleIsSticky = () => window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);
        window.addEventListener('scroll', handleIsSticky);

        // Check authentication status
        const checkAuth = () => {
            const authStatus = isAuthenticated();
            setIsLoggedIn(authStatus);
            if (authStatus) {
                setUsername(getUsername() || '');
            }
        };

        checkAuth();
        setIsLoggedIn(isAuthenticated());

        return () => {
            window.removeEventListener('scroll', handleIsSticky);
        };
    }, []);

    const cartQuantity = cartItems.length;

    const handleCartClick = async () => {
        if (!isLoggedIn) {
            toggleForm(true);
            return;
        }
        const token = localStorage.getItem('jwt_token');  // Retrieve the JWT token

    if (!token) {
        console.error('No token found. Please log in.');
        return;
    }

        try {
            // Make an API request to check the cart or perform some action
            const response = await axios.get('http://127.0.0.1:8000/api/cart-items/', {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the JWT token in the header
                }
            });

            // Handle the response and navigate to the cart page if successful
            if (response.status === 200) {
                navigate('/cart');
            } else {
                // Handle other status codes or errors
                console.error('Failed to fetch cart information');
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <>
            <header id="header" className={isSticky ? 'sticky' : ''}>
                <div className="container">
                    <div className="navbar">
                        <h2 className="nav_logo">
                            <Link to="/" className="logo-container">
                                <img src="/download.jpg" alt="Dark World Deals Logo" className="logo-image" />
                                <span className="logo-text">* * * Dark World Deals * * *</span>
                            </Link>
                        </h2>
                        <nav className="nav_actions">
                            <div className="search_action">
                                <span onClick={() => toggleSearch(true)}>
                                    <AiOutlineSearch />
                                </span>
                                <div className="tooltip">Search</div>
                            </div>
                            <div
    className="shop_action"
    style={{
        display: 'inline-block',
        margin: '0 10px', // Adjust margins as needed
        padding: '5px',
    }}
>
    <Link to="/products">
        <button
            type="button"
            className="shop_button"
            style={{
                backgroundColor: '#007bff',
                color: '#ffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
            }}
        >
            Shop now
        </button>
    </Link>
</div>

                            <div className="cart_action" onClick={handleCartClick}>
                                <AiOutlineShoppingCart />
                                {cartQuantity > 0 && <span className="badge">{cartQuantity}</span>}
                                <div className="tooltip">Cart</div>
                            </div>

                            <div className="user_action">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                <div className="dropdown_menu">
                                    
                                <h4>
                                        Hello!{' '}
                                        {isLoggedIn ? (
                                            <span style={{ color: '#007bff', fontWeight: 'bold' }}>
                                                {username}
                                            </span>
                                        ) : (
                                            'Guest'
                                        )}
                                    </h4>
                                    <p>Access account and manage orders</p>

                                    {!isLoggedIn ? (
                                        <button type="button" onClick={() => toggleForm(true)}>
                                            Login / Signup
                                        </button>
                                    ) : (
                                        <button type="button" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    )}

                                    <div className="separator"></div>
                                    <ul>
    {dropdownMenu.map((item) => (
        <li key={item.id}>
            <Link to={item.path}>{item.link}</Link>
        </li>
    ))}
</ul>
                                </div>
                            </div>

                            <div className="admin_action">
                                <Link to="/adminlogin">
                                    <button type="button"
            className="shop_button"
            style={{
                backgroundColor: '#007bff',
                color: '#ffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
            }}>
                                        Admin
                                    </button>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <SearchBar />
            <AccountForm setIsLoggedIn={setIsLoggedIn} />
        </>
    );
};

export default Header;