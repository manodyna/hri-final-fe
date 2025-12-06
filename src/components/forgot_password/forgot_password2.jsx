import React, {useEffect, useState} from "react";
import leftarrow from '../../assets/arrow-left.png';
import mail from "../../assets/mail.svg";
import plumes from "../../assets/plumes.png";
import Textbox from "../utilities/textBox";
import { Link } from 'react-router-dom';
import logo from '../../assets/icon.svg';

export const ForgotPassword2 = () => {
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Extract email from the URL's query parameter during the initial render
        const searchParams = new URLSearchParams(window.location.search);
        const emailParam = searchParams.get("email");
        if (emailParam) {
            setEmail(emailParam);
        }
    }, []);


    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordMismatch(true);
        }

        try {
            const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/v1/resetPassword`;

            const requestBody = {
                email: email,
                newPassword: newPassword,
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                alert("Password reset successful!");
                window.location.href = "/login";
            } else {
                alert("Failed to reset password. Please try again.");
            }
        } catch (error) {
            console.error('Error during password reset:', error);
        }
    };


    return (
        <div className='w-screen h-screen flex items-center justify-center z-10'>
        <div className=" flex-grow flex items-center justify-center">
            <div className="flex flex-col">   
                <img src={logo} className="logoCompanyDetails" />
                <div className="font-bold text-xl ml-20 ">Password Reset</div>
                <div className=" text-grey text-base -ml-2 mb-1 [font-family:'Inter-Regular',Helvetica] mt-2" >We sent a code to {email} </div>
                <div className="mt-2 -ml-2"><Textbox label="Password" id="name" name="name" className="w-80" type="password" value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} /></div>
                <div className="mt-2 -ml-2"><Textbox label="Confirm Password" id="name1" name="name" className="w-80"  type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}  style={{ borderColor: passwordMismatch ? 'red' : 'initial' }}/>
          {passwordMismatch && <p style={{ color: 'red' }}>Passwords do not match. Please make sure the passwords match.</p>}</div>
                <div className='felx -mt-6 -ml-4 justify-center'>
                <button onClick={handleResetPassword}  className="button1 ml-2" id="button"style={{width:'95%',paddingLeft:'7.1875rem'}}>Continue</button>
                </div>
                <Link to="/login">
                <div className="flex flex-row ml-20">
                    <img  className="mt-8 w-4 h-4" src={leftarrow}/>
                    <div className="mt-7 text-sm text-lightestGrey ml-2"> Back to login</div>                
                </div>
                </Link>
            </div>
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