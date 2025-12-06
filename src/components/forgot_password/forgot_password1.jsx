import React, {useEffect, useRef, useState} from 'react';
import leftarrow from '../../assets/arrow-left.png';
import mail from "../../assets/mail.svg";
import plumes from "../../assets/plumes.png";
import { setOTPValue } from '../../redux/actions/otpActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/icon.svg';






export const ForgotPassword1 = ({  onSubmit }) => {
    
    const [attempts, setAttempts] = useState(0);
    const dispatch = useDispatch();
    const otpValues = useSelector(state => state.otpReducer.values);
    const inputRefs = useRef([]);
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState("");
   

    const handleChange = (e, index) => {
        dispatch(setOTPValue(index, e.target.value));
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const emailParam = searchParams.get("email");
        if (emailParam) {
          setEmail(emailParam); // Set the 'email' variable with the value from the URL query parameter
        }
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
                }, 50);  // delay of 50ms
            }
        };

        // Attach the event listener to all input fields
        otpValues.forEach((_, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].addEventListener('keydown', (e) => handleKeyDown(e, index));
            }
        });

        // Cleanup: Remove event listeners when component unmounts
        return () => {
            otpValues.forEach((_, index) => {
                if (inputRefs.current[index]) {
                    inputRefs.current[index].removeEventListener('keydown', (e) => handleKeyDown(e, index));
                }
            });
        };
    }, [otpValues]);


    const handleVerifyOTP = async () => {
        const otp = otpValues.join('');
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/verifyOTP?email=${email}&enteredOTP=${otp}`, {
                method: 'POST',
               
            });

            const result = await response.json();
            console.log(result)
            if (result.status === 200) {
                // Handle OTP successfully verified
                if (onSubmit) {
                    onSubmit(otp);
                }
                window.location.href = `/resetPassword?email=${encodeURIComponent(email)}`;
            } else {
                // Handle OTP verification failed
                setAttempts(attempts + 1);
                if (attempts >= 2) {
                    alert('You have exceeded the maximum number of attempts. Please try again later.');
                    // Call regenerate OTP function here if needed
                }
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
        }
    };

    const handleResendOTP = async () => {
        setShowPopup(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/resendOTP?email=${email}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

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

        <div className='w-screen h-screen flex items-center justify-center z-10'>
        <div className='flex flex-col justify-center'>
        <img src={logo} className="logoCompanyDetails" />
        <div className="font-bold text-[20px] ml-15 text-center ">Password Reset</div>
        <div className="text-[16px] text-grey  -mb-4 [font-family:'Inter-Regular',Helvetica] mt-2 text-center">We sent a code to {email} </div>
        <div className='flex justify-center mr-4' id="otpFields">
                {otpValues.map((value, index) => (
                    <input
                        key={index}
                        value={value}
                        maxLength="1"
                        style={{ width: '2.75rem', height: '2.75rem', textAlign: 'center', margin: '7px', border: 'solid 1px #d0d5dd', borderRadius: '13px' }}
                        onChange={(e) => handleChange(e, index)}
                        ref={(ref) => (inputRefs.current[index] = ref)} // Store a reference to the input element
                    />
                ))}
            </div>
            <div className='flex justify-center'>
                <button onClick={handleVerifyOTP}
                        className="w-56 h-11 p-2.5 pl-36 pr-36 rounded-xl bg-blue font-inter text-base font-normal text-left text-white mb-15"
                        id="button" style={{width :'22.375rem', backgroundColor: '#5E8E85'}}>Continue</button>
            </div>
           <Link to="/login">
            <div className="flex flex-row ml-32">
                <img  className="mt-8 w-4 h-4" src={leftarrow}/>
                <div className="mt-7 text-[13px] text-lightestGrey ml-2"> Back to login</div>                
                </div>
                </Link>
            </div>
            <div className="absolute flex flex-row justify-between bottom-4 left-4 right-4">
            <div className="text-[14px] text-lightestGrey">©Ovii copyright</div>
            <div className="flex flex-row items-center">
                <img
                    className="mt-1.5 mr-2"
                    alt="mail"
                    src={mail}
                />
                <div className=" mr-2 [font-family:'Inter-Regular',Helvetica] font-normal text-[14px] text-lightestGrey">
                    <span>help@ovii.ai</span>
                </div>
            </div>
        </div>
    </div>
  );
};
