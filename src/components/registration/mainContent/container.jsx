import OTPInput from './OTP/OTP';
import Step1 from './step1';
import Sidebar from '../sidebar/sidebar';
import { useState } from 'react';
import ResendPopup from './OTP/resendPopup';
import OrgDetails from './orgDetails';
import { setWithExpiry, getWithExpiry } from '../verifier';
import CompanyDetails from '../company_details/companydetails';
import './container.css';
import { useNavigate } from 'react-router-dom';

const Container = () => {
    const [showOTP, setShowOTP] = useState(false); // State to determine which component to display

    const [companydetailspage, setCompanyDetails] = useState(false);

    const [email, setEmail] = useState(''); // New state for email

    const [otpGeneration, setOtpGeneration] = useState('');

    const [password, setPassword] = useState(''); // New state for password

    const handleRegistrationSuccess = (registeredEmail, registeredPassword) => {
        setShowOTP(true);
        setEmail(registeredEmail); // Set the email state
        setPassword(registeredPassword);
    };

    const navigate = useNavigate();

    const handleOtp = (value) => {
        setEmail(value);
        setOtpGeneration(true);
    };

    if (otpGeneration) {
        <OTPInput email={email} />;
    }

    if (companydetailspage) {
        return <CompanyDetails />;
    }

    return (
        <div className='flex containerClass'>
            <Sidebar />
            <div className='flex-grow '>
                <div className='text-right m-9'>
                    <p className='text-black font-medium font-sans text-sm'>
                        Already have an account?
                        <a
                            href='/login'
                            className='text-blue text-sm'
                        >
                            Login
                        </a>
                    </p>
                </div>
                <div>
                    {/*<Step1 onRegisterSuccess={handleOtp}/>*/}

                    {showOTP ? (
                        <OTPInput
                            email={email}
                            password={password}
                        />
                    ) : (
                        <Step1 onRegisterSuccess={handleRegistrationSuccess} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Container;
