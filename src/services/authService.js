const API_URL = 'http://127.0.0.1:8000/api'; // Replace with your API URL

// Function to get the JWT token from local storage
export const getToken = () => {
    return localStorage.getItem('jwt_token');
};

// Function to log in a user
export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log('Login response:', data);

        if (response.ok) {
            if (data.user && data.user.access_token) {
                localStorage.setItem('jwt_token', data.user.access_token);
                localStorage.setItem('refresh_token', data.user.refresh_token);
                localStorage.setItem('username', data.user.username); 
                console.log('Token stored:', data.user.access_token);
                return data.user;
            } else {
                console.error('Token not found in expected structure');
                throw new Error('Token not found in expected structure');
            }
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login failed', error);
        throw error;
    }
};
// Function to register a user
export const register = async (username, email, password) => {
    try {
        const response = await fetch(`${API_URL}/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration failed', error);
        throw error;
    }
};

export const getUsername = () => {
    return localStorage.getItem('username');
};
// Function to log out a user
export const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
    return !!getToken();
};

