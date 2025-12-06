import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOTPValue } from '../../../../redux/actions/otpActions';
import icon from '../../../../assets/icon.svg';
import '../step1.css';
import './OTP.css';
import ResendPopup from './resendPopup';
import { useNavigate } from 'react-router-dom';
import { setWithExpiry } from '../../verifier';

const OTPInput = ({ email, password, onSubmit }) => {
    const [attempts, setAttempts] = useState(0);
    const dispatch = useDispatch();
    const otpValues = useSelector((state) => state.otpReducer.values);
    const inputRefs = useRef([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e, index) => {
        dispatch(setOTPValue(index, e.target.value));
    };

    useEffect(() => {
        // Function to focus on the next input field
        const focusNextInput = (index) => {
            if (index < otpValues.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        };

        // Add an event listener for the 'keydown' event to automatically focus on the next input
        const handleKeyDown = (e, index) => {
            if (e.key >= '0' && e.key <= '9') {
                // Delay the focus on the next input to allow onChange to capture the value
                setTimeout(() => {
                    focusNextInput(index);
                }, 50); // delay of 50ms
            }
        };

        // Attach the event listener to all input fields
        otpValues.forEach((_, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].addEventListener('keydown', (e) =>
                    handleKeyDown(e, index)
                );
            }
        });

        // Cleanup: Remove event listeners when component unmounts
        return () => {
            otpValues.forEach((_, index) => {
                if (inputRefs.current[index]) {
                    inputRefs.current[index].removeEventListener('keydown', (e) =>
                        handleKeyDown(e, index)
                    );
                }
            });
        };
    }, [otpValues]);

    let navigate = useNavigate();
    const handleVerifyOTP = async () => {
        const otp = otpValues.join('');

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/v1/verifyOTP?email=${email}&enteredOTP=${otp}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (response.status === 200) {
                const result = await response.json();
                if (result.status === 200) {
                    // Handle OTP successfully verified
                    try {
                        const response = await fetch(
                            `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email: email,
                                    password: password,
                                }),
                            }
                        );
                        const result = await response.json();

                        if (response.ok) {
                            localStorage.setItem('token', result.data.accessToken);
                            navigate('/companyDetails');
                        } else {
                            console.error('Error:', result);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    // Handle OTP verification failed
                    setAttempts(attempts + 1);
                    if (attempts >= 2) {
                        alert(
                            'You have exceeded the maximum number of attempts. Please try again later.'
                        );
                    }
                }
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
        }
    };

    const handleResendOTP = async () => {
        setShowPopup(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/v1/resendOTP?email=${email}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const result = await response.json();
            if (result.status === 200) {
                alert('OTP sent successfully');
            } else {
                alert('Error resending OTP');
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
        }
    };

    return (
        <div id='main-container'>
            <div style={{ alignItems: 'center' }}>
                <img
                    src={icon}
                    alt='boltcode logo'
                    className='w-1/15 mb-10 max-h-30 p-0 mx-auto'
                />
                <p
                    className='text-black font-sans font-bold text-xl text-center'
                    id='heading'
                >
                    Email verification
                </p>
                <p
                    className='text-black font-sans font-base text-center mt-4'
                    id='description'
                >
                    Please enter the 6-digit verification code that was sent to your email
                </p>
            </div>
            <div
                style={{ display: 'flex', justifyContent: 'center' }}
                id='otpFields'
            >
                {otpValues.map((value, index) => (
                    <input
                        key={index}
                        value={value}
                        maxLength='1'
                        style={{
                            width: '2.75rem',
                            height: '2.75rem',
                            textAlign: 'center',
                            margin: '0 5px',
                            border: 'solid 1px #d0d5dd',
                            borderRadius: '13px',
                        }}
                        onChange={(e) => handleChange(e, index)}
                        ref={(ref) => (inputRefs.current[index] = ref)} // Store a reference to the input element
                        onKeyDown={(e) => {
                            if (e.key == 'Backspace') {
                                e.preventDefault();
                                inputRefs.current[index].value = '';
                                dispatch(setOTPValue(index, ''));  
                                if (index > 0) {
                                    inputRefs.current[index - 1].focus();
                                }
                            }
                        }}
                        onClick={() => {
                            inputRefs.current[index].focus();
                        }}
                    />
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleVerifyOTP}
                    className='button1'
                    id='button'
                >
                    Submit
                </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p className='mt-10'>
                    Didn’t receive an email?
                    <span
                        className='text-blue'
                        onClick={handleResendOTP}
                    >
                        Resend
                    </span>
                </p>
            </div>
            {showPopup && (
                <ResendPopup
                    mail={email}
                    onClose={() => setShowPopup(false)}
                >
                    <p>OTP has been resent to your email!</p>
                </ResendPopup>
            )}
        </div>
    );
};

export default OTPInput;
