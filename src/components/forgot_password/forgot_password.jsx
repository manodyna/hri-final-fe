import React, { useState } from 'react';
import leftarrow from '../../assets/arrow-left.png';
import mail from '../../assets/mail.svg';
import plumes from '../../assets/plumes.png';
//import Textbox from '../utilities/textBox';
import { Link } from 'react-router-dom';
import logo from '../../assets/icon.svg';


function Textbox(props) {
    return (
        <div>
            <div className='flex flex-col'>
                <p className="text-[14px] font-medium" style={{ color: "#344053" }}>
                    {props.label}
                </p>
            </div>
            <div
                style={{ display: "flex", alignItems: "center" }}
                className={`companyNameTextBox border-lightGrey border rounded-md pr-2 pl-2 w-${props.width} h-${props.height} mt-1`}
            >
                {props.subhead ? (
                    <div
                        style={{ display: "flex", alignItems: "center" }}
                        className={`border-lightGrey border w-${props.width} h-${props.height} pr-2 pl-2  subHeadingTextBox onlyRightBorder`}
                    >
                        {props.subhead}
                    </div>
                ) : null}

                <input
                    id={props.id}
                    name={props.name || props.id}
                    placeholder={props.placeholder}
                    type={props.type}
                    className={props.class}
                    value={props.value}
                    onChange={props.onChange}
                    required
                />
            </div>
        </div>
    );
}

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleContinue = async () => {
        // if (!email) {
        //   alert("Please enter a valid email address");
        //   return;
        // }

        const apiUrl =
            `${process.env.REACT_APP_BASE_URL}/api/v1/initiatePasswordReset?email=` +
            encodeURIComponent(email);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Please check your email for OTP to reset your password.');
                window.location.href = `/codeverification?email=${encodeURIComponent(email)}`;
            } else {
                alert('Failed to send password reset instructions.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while sending the email.');
        }
    };

    return (
            <div className='w-screen h-screen flex items-center justify-center z-10'>
            <div className=' flex-grow flex items-center justify-center'>
                <div className='flex-col flex items-center justify-center'>
                    <img src={logo} className="logoCompanyDetails" />
                    <div className="font-bold text-[20px] mt-4">Reset your password?</div>

                    <div className=" text-[16px]  text-grey text-center [font-family:'Inter-Regular',Helvetica] mt-4">
                        {' '}
                        Check your email for further reset instructions
                    </div>
                    <div className='mt-10'>
                        <div className='email'>
                            <Textbox
                                label="Email"
                                id="email"
                                name="name"
                                placeholder="olivia@untitledui.com"
                                type="text"
                                class="marginTextBox invisible-border"
                                height="11"
                                width="80"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-80 mt-4 mb-4 p-[0.813rem 9rem 0.75rem 9.063rem] rounded-xl bg-blue font-inter text-white" on onClick={handleContinue} style={{ height: '2.75rem', align: 'center', backgroundColor: '#5E8E85'}}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                Continue
                            </div>
                        </button>
                    </div>
                    <Link to='/'>
                        <div className='flex mt-7 text-center justify-center'>
                            &larr;
                            <p className=' text-sm hover:underline text-lightestGrey '>
                                Back to login
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            {/*<div className='absolute flex flex-row justify-between bottom-4 left-4 right-4'>*/}
            {/*    <div className='text-[14px] text-lightestGrey'>©Ovii copyright</div>*/}
            {/*    <div className='flex flex-row items-center'>*/}
            {/*        <img*/}
            {/*            className='mt-1.5 mr-2'*/}
            {/*            alt='mail'*/}
            {/*            src={mail}*/}
            {/*        />*/}
            {/*        <div className=" mr-2 [font-family:'Inter-Regular',Helvetica] font-normal text-[14px] text-lightestGrey">*/}
            {/*            <span>help@ovii.ai</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="absolute bottom-4 left-4 flex flex-row">
                {/*<span className="footText">help@ovii.ai</span>*/}
            </div>
        </div>
    );
};
