import '../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-react-inputs/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import 'react-phone-input-2/lib/style.css';
import React, { useEffect, useState } from 'react';
import PhoneNumberInput from '../../utilities/phoneInput';
import { enableRipple } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import logo from '../../../assets/icon.svg';
import './step1.css';
import Textbox from '../../utilities/textBox';
import { FormValidator } from '@syncfusion/ej2-react-inputs';
enableRipple(true);

const Step1 = ({ onRegisterSuccess }) => {
    const [phone, setPhone] = useState('');

    // const passwordValidator = (value) => {
    //     const passwordExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;
    //     return passwordExp.test(value || '');
    // };

    // Function to ensure name has no special characters
    const noSpecialCharValidator = (value) => {
        const specialCharExp = /^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        return specialCharExp.test(value.value.trim() || '')
    };

// Function to ensure name has no numbers
    const noNumberValidator = (value) => {
        const numberExp = /^[^\d]*$/;
        return numberExp.test(value.value.trim() || '');
    };

    const hasUppercase = (value) => {
        const password = /[A-Z]/;
        return password.test(value.value || '');
    };
    const hasLowercase = (value) => {
        const password = /[a-z]/
        return password.test(value.value || '');
    };
    const hasNumber = (value) => {
        const password = /\d/
        return password.test(value.value || '');
    };
    const hasSpecialChar = (value) => {
        const password = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        return password.test(value.value || '');
    };

    const phoneValidator = (value) => {
        const phoneExp = /^\d+$/;
        return phoneExp.test(value.value.trim() || '');
    };

    const nameValidator = (value) => {
        const nameExp = /^[A-Za-zà-ÿ\-]+(?: [A-Za-zà-ÿ]+)*$/;
        return nameExp.test(value.value.trim() || '');
    };

    const institutionalEmailValidator = (args) => {
        args.value = args.value.trim(); // Trim the input value
        const disallowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'aol.com',
            'icloud.com', 'protonmail.com', 'zoho.com', 'yandex.com', 'mail.com', 'gmx.com',
            'tutanota.com', 'fastmail.com', 'hushmail.com', 'gawab.com', 'inbox.com', 'aim.com',
            'fastmail.com', 'tutanota.com', 'pobox.com', 'yandex.ru', 'yandex.mail',
            'aol.com', 'gmx.net', 'rediff.com']; // Add more as needed
        const emailDomain = args.value.split('@')[1];

        return !disallowedDomains.includes(emailDomain);
    };

    // Validation
    const option = {
        rules: {
            name: {
                required: [true, 'Name is required'],
                maxLength: [80, 'Name should not exceed 80 characters'],
                noSpecialCharValidator: [noSpecialCharValidator, 'Name should not contain special characters'],
                noNumberValidator: [noNumberValidator, 'Name should not contain numbers'],
            },
            email: {
                required: [true, 'Email is required'],
                email: [true, 'Enter a valid email address'],
                rules: [institutionalEmailValidator, 'Enter a valid organisational email address'],
            },
            phone: {
                required: [true, 'Phone number is required'],
                rules: [phoneValidator, 'Enter a valid phone number'],
            },
            password: {
                required: [true, 'Password is required'],
                minLength: [8, 'Password should have at least 8 characters'],
                hasUppercase: [hasUppercase, 'Password must contain at least one uppercase letter'],
                hasLowercase: [hasLowercase, 'Password must contain at least one lowercase letter'],
                hasNumber: [hasNumber, 'Password must contain at least one number'],
                hasSpecialChar: [hasSpecialChar, 'Password must contain \n at least one special character'],
            },
            terms: {
                required: [true, 'You must agree to terms of use and privacy policy'],
            },
        },
    };

    let formObject = null;

    useEffect(() => {
        formObject = new FormValidator('#form-element', option);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let isValid = formObject.validate();
        if (!isValid) {
            console.error('Validation failed.');
            return;
        }

        const formData = new FormData(event.target);
        const data = {
            firstName: formData.get('name').trim(),
            email: formData.get('email').trim(),
            password: formData.get('password').trim(),
            phoneNumber: formData.get('phone').trim(),
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (response.ok && result.message === 'User registered successfully') {
                // Make a request to generate OTP
                await fetch(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/generateOTP?email=${data.email}`,
                    {
                        method: 'POST',
                        body: JSON.stringify(data),
                    }
                );

                onRegisterSuccess(data.email, data.password);
            } else if (
                response.ok &&
                result.message === 'User for this organisation already exists'
            ) {
                alert(
                    'User for this organization already exists. Please contact help@plumes.ai for assistance.'
                );
            }
        } catch (error) {
            console.error('There was an error:', error);
        }
    };

    return (
        <div>
            <form
                id='form-element'
                onSubmit={handleSubmit}
            >
                <div>
                    <img
                        src={logo}
                        alt='boltcode logo'
                        className='w-1/15 mb-10 max-h-30 p-0 mx-auto'
                    />
                    <h1
                        className='text-black font-sans font-bold text-xl text-center'
                        id='heading'
                    >
                        Get started with plumes
                    </h1>
                    <p
                        className='text-black font-sans font-base text-center mt-4'
                        id='h2'
                    >
                        Experience our complete hiring platform: 15-day free trial, no credit card
                        required
                    </p>
                </div>

                <div className='inputFields mt-14 flex flex-col justify-center items-center gap-y-12 mx-auto '>
                    <div className='flex justify-between w-max gap-x-8'>
                        <Textbox
                            label='Name'
                            id='name'
                            name='name'
                            placeholder='Your Name Here'
                            type='text'
                            className='w-80'
                            showImage = {false}
                        />
                        <Textbox
                            label='Email'
                            id='email'
                            name='email'
                            placeholder='Your Email Here'
                            type='email'
                            className='w-80'
                            showImage = {false}
                        />
                    </div>

                    <div className=' flex justify-between w-max  gap-x-10 '>
                        <PhoneNumberInput
                            id='phone'
                            name='phone'
                        />

                        <Textbox
                            label='Password'
                            id='password'
                            name='password'
                            placeholder='Your Password Here'
                            type='password'
                            className='w-80 '
                            showImage = {false}
                        />
                    </div>
                </div>

                <div className='continue flex'>
                    <div className='checkbox flex'>
                        <input
                            type='checkbox'
                            name='terms'
                            id='terms'
                            className='my-auto'

                        />
                        <span className='text-sm ml-2'>
                            Agree to our terms of use and privacy policy
                            </span>
                    </div>
                </div>
                <div>
                    <div className='buttonContainer flex'>
                        <button
                            type='submit'
                            className='button1'
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Step1;
