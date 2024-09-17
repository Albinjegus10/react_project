import { useContext, useState } from 'react';
import commonContext from '../contexts/common/commonContext';
import axios from 'axios';

const useForm = () => {
    const { toggleForm, setFormUserInfo } = useContext(commonContext);
    const [inputValues, setInputValues] = useState({});

    // handling input-values
    const handleInputValues = (e) => {
        const { name, value } = e.target;

        setInputValues((prevValues) => {
            return {
                ...prevValues,
                [name]: value
            };
        });
    };

    // handling form-submission
    const handleFormSubmit = async (e ,isSignupVisible) => {
        e.preventDefault();

        console.log("newdata",inputValues);
        // console.log(inputValues);

        const payload = {
            email : inputValues.mail,
            password:inputValues.password,
            username :inputValues.username,
            confirm_password : inputValues.password}

        // const endpoint =   'http://localhost:8000/api/signup/';
        const endpoint = isSignupVisible ? 'http://localhost:8000/api/signup/' : 'http://localhost:8000/api/login/';

        try {
            const response = await axios.post(endpoint, payload);
            console.log("nnnn",response);
            
            if (response.status === 201 || response.status === 200) {
                console.log("nen",response.data);
                console.log("user",response.data.user.username);
                console.log(response.data.user.username);
                
                setFormUserInfo(response.data.user.username);
                toggleForm(false);
                alert(`Hello  you're successfully logged-in.`);
              
            }
        } catch (error) {
           console.log ( 'Something went wrong. Please try again.');
        } finally {
            // setLoading(false);
        }

        
        // const loggedUserInfo = inputValues.mail.split('@')[0].toUpperCase();

        // setInputValues({ });
    //    
    };

    return { inputValues, handleInputValues, handleFormSubmit };
};

export default useForm;