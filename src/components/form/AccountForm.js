// import React, { useContext, useState, useRef } from 'react';
// import commonContext from '../../contexts/common/commonContext';
// import useForm from '../../hooks/useForm';
// import useOutsideClose from '../../hooks/useOutsideClose';
// import useScrollDisable from '../../hooks/useScrollDisable';
// import { login, register } from '../../services/authService';

// const AccountForm = () => {
//     const { isFormOpen, toggleForm } = useContext(commonContext);
//     const { inputValues, handleInputValues } = useForm();
//     const formRef = useRef();
//     const [isSignupVisible, setIsSignupVisible] = useState(false);

//     useOutsideClose(formRef, () => {
//         toggleForm(false);
//     });

//     useScrollDisable(isFormOpen);

//     const handleIsSignupVisible = () => {
//         setIsSignupVisible(prevState => !prevState);
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (isSignupVisible) {
//                 // Signup logic
//                 await register(inputValues.username, inputValues.email, inputValues.password);
//             } else {
//                 // Login logic
//                 await login(inputValues.email, inputValues.password);
//             }
//             toggleForm(false);
//         } catch (error) {
//             console.error('Authentication failed:', error);
//         }
//     };

//     return (
//         <>
//             {isFormOpen && (
//                 <div className="backdrop">
//                     <div className="modal_centered">
//                         <form id="account_form" ref={formRef} onSubmit={handleFormSubmit}>
//                             {/*===== Form-Header =====*/}
//                             <div className="form_head">
//                                 <h2>{isSignupVisible ? 'Signup' : 'Login'}</h2>
//                                 <p>
//                                     {isSignupVisible ? 'Already have an account ?' : 'New to Dark World ?'}
//                                     &nbsp;&nbsp;
//                                     <button type="button" onClick={handleIsSignupVisible}>
//                                         {isSignupVisible ? 'Login' : 'Create an account'}
//                                     </button>
//                                 </p>
//                             </div>

//                             {/*===== Form-Body =====*/}
//                             <div className="form_body">
//                                 {isSignupVisible && (
//                                     <div className="input_box">
//                                         <input
//                                             type="text"
//                                             name="username"
//                                             className="input_field"
//                                             value={inputValues.username || ''}
//                                             onChange={handleInputValues}
//                                             required
//                                         />
//                                         <label className="input_label">Username</label>
//                                     </div>
//                                 )}

//                                 <div className="input_box">
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         className="input_field"
//                                         value={inputValues.email || ''}
//                                         onChange={handleInputValues}
//                                         required
//                                     />
//                                     <label className="input_label">Email</label>
//                                 </div>

//                                 <div className="input_box">
//                                     <input
//                                         type="password"
//                                         name="password"
//                                         className="input_field"
//                                         value={inputValues.password || ''}
//                                         onChange={handleInputValues}
//                                         required
//                                     />
//                                     <label className="input_label">Password</label>
//                                 </div>

//                                 {isSignupVisible && (
//                                     <div className="input_box">
//                                         <input
//                                             type="password"
//                                             name="conf_password"
//                                             className="input_field"
//                                             value={inputValues.conf_password || ''}
//                                             onChange={handleInputValues}
//                                             required
//                                         />
//                                         <label className="input_label">Confirm Password</label>
//                                     </div>
//                                 )}

//                                 <button
//                                     type="submit"
//                                     className="btn login_btn"
//                                 >
//                                     {isSignupVisible ? 'Signup' : 'Login'}
//                                 </button>
//                             </div>

//                             {/*===== Form-Footer =====*/}
//                             <div className="form_foot">
//                                 <p>or login with</p>
//                                 <div className="login_options">
//                                     <a href="/">Facebook</a>
//                                     <a href="/">Google</a>
//                                     <a href="/">Twitter</a>
//                                 </div>
//                             </div>

//                             {/*===== Form-Close-Btn =====*/}
//                             <div
//                                 className="close_btn"
//                                 title="Close"
//                                 onClick={() => toggleForm(false)}
//                             >
//                                 &times;
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default AccountForm;


import React, { useContext, useState, useRef } from 'react';
import commonContext from '../../contexts/common/commonContext';
import useForm from '../../hooks/useForm';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
import { login, register } from '../../services/authService';

const AccountForm = ({ setIsLoggedIn }) => {
    const { isFormOpen, toggleForm } = useContext(commonContext);
    const { inputValues, handleInputValues, resetForm } = useForm();
    const formRef = useRef();
    const [isSignupVisible, setIsSignupVisible] = useState(false);
    const [error, setError] = useState('');

    useOutsideClose(formRef, () => {
        toggleForm(false);
        resetForm();
        setError('');
    });

    useScrollDisable(isFormOpen);

    const handleIsSignupVisible = () => {
        setIsSignupVisible(prevState => !prevState);
        resetForm();
        setError('');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignupVisible) {
                if (inputValues.password !== inputValues.conf_password) {
                    setError("Passwords don't match");
                    return;
                }
                await register(inputValues.username, inputValues.email, inputValues.password);
                setIsSignupVisible(false);
            } else {
                await login(inputValues.email, inputValues.password);
                setIsLoggedIn(true);
                toggleForm(false);
            }
            resetForm();
        } catch (error) {
            setError(error.message || 'Authentication failed');
        }
    };

    return (
        <>
            {isFormOpen && (
                <div className="backdrop">
                    <div className="modal_centered">
                        <form id="account_form" ref={formRef} onSubmit={handleFormSubmit}>
                            <div className="form_head">
                                <h2>{isSignupVisible ? 'Signup' : 'Login'}</h2>
                                <p>
                                    {isSignupVisible ? 'Already have an account ?' : 'New to Dark World ?'}
                                    &nbsp;&nbsp;
                                    <button type="button" onClick={handleIsSignupVisible}>
                                        {isSignupVisible ? 'Login' : 'Create an account'}
                                    </button>
                                </p>
                            </div>

                            <div className="form_body">
                                {error && <div className="error_message">{error}</div>}
                                
                                {isSignupVisible && (
                                    <div className="input_box">
                                        <input
                                            type="text"
                                            name="username"
                                            className="input_field"
                                            value={inputValues.username || ''}
                                            onChange={handleInputValues}
                                            required
                                        />
                                        <label className="input_label">Username</label>
                                    </div>
                                )}

                                <div className="input_box">
                                    <input
                                        type="email"
                                        name="email"
                                        className="input_field"
                                        value={inputValues.email || ''}
                                        onChange={handleInputValues}
                                        required
                                    />
                                    <label className="input_label">Email</label>
                                </div>

                                <div className="input_box">
                                    <input
                                        type="password"
                                        name="password"
                                        className="input_field"
                                        value={inputValues.password || ''}
                                        onChange={handleInputValues}
                                        required
                                    />
                                    <label className="input_label">Password</label>
                                </div>

                                {isSignupVisible && (
                                    <div className="input_box">
                                        <input
                                            type="password"
                                            name="conf_password"
                                            className="input_field"
                                            value={inputValues.conf_password || ''}
                                            onChange={handleInputValues}
                                            required
                                        />
                                        <label className="input_label">Confirm Password</label>
                                    </div>
                                )}

                                <button type="submit" className="btn login_btn">
                                    {isSignupVisible ? 'Signup' : 'Login'}
                                </button>
                            </div>

                            <div className="form_foot">
                                <p>or login with</p>
                                <div className="login_options">
                                    <a href="/">Facebook</a>
                                    <a href="/">Google</a>
                                    <a href="/">Twitter</a>
                                </div>
                            </div>

                            <div
                                className="close_btn"
                                title="Close"
                                onClick={() => {
                                    toggleForm(false);
                                    resetForm();
                                    setError('');
                                }}
                            >
                                &times;
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountForm;