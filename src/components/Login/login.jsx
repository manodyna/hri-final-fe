import React, { useState,useEffect } from "react";
import leftarrow from "../../assets/arrow-left.png";
import unlock from "../../assets/unlock.svg";
import mail from "../../assets/mail.svg";
import plumes from "../../assets/plumes.png";
//import Textbox from "../../utilities/textBox";
import questionmark from "../../assets/questionmark.png";
import google from "../../assets/signinwithgoogle.svg";
import logo from '../../assets/icon.svg';
import {useNavigate} from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { Input } from "@syncfusion/ej2-react-inputs";
import './login.css'

function Textbox(props) {
    return (
        <div>
            <div>
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

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState("");
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const [isMobileTextVisible, setIsMobileTextVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Check if it's mobile based on screen width
        const isMobile = window.innerWidth >= 600;
        setIsMobileTextVisible(isMobile);

        // Prevent scrolling for mobile
        document.body.style.overflow = isMobile ? 'hidden' : 'auto';

        return () => {
            // Reset overflow property when component unmounts
            document.body.style.overflow = 'hidden';
        };
    }, []);
    
    const handleEmailChange = (e) => {
        const inputValue = e.target.value.trim();
        setEmail(inputValue);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!inputValue) {
            setEmailError("Email is required");
        } else if (!emailRegex.test(inputValue)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };
    const handleLogin = async (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
          setEmailError("Email is required");
        } else if (!emailRegex.test(email.trim())) {
          setEmailError("Invalid email address");
        } else {
          setEmailError(""); 
        }
        e.preventDefault(); // Prevent the default form submission
        setLoading(true);
        // console.log('Handling login...');

        try {
            const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/v1/login`;
            const requestBody = {
                email: email.trim(),
                password: password,
            };
            

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const result = await response.json();
            if (result.status == 201) {
                // Login successful
                // alert(`Successfully logged in`);
                localStorage.setItem('AuthToken', result.data.accessToken);
                localStorage.setItem('UserId', result.data.id);
                navigate("/home")
                // You can handle the success response here
            } else {
                // Login failed
                alert("Failed to login")
                // window.location.href="/forgotpassword"
                // You can display an error message or handle the failure
            }
        } catch (error) {
            console.error("Error during login:", error);
        } finally {
            setLoading(false);
          }
        };

    return (
            <div style={{ marginTop: "80px" ,overflow: isMobile ? 'auto' : 'hidden' }}>
            <div className="container mx-auto p-4">
                <img src={logo} className="logoCompanyDetails w-3/4 mx-auto" alt="Company Logo" />
            <div className="flex flex-col items-center justify-center ">
                <div className="font-bold text-[20px] ">Welcome back!</div>
                <div className="text-14px text-gray-500 font-inter mt-4 text-center">
                    Login to Ona, your AI companion
                </div>
                <form onSubmit={handleLogin}>
                <div className="mt-10 ">
                    <div className="email">
                        <Textbox
                            label="Email"
                            id="email"
                            name="name"
                            placeholder="Your email"
                            type="text"
                            class="marginTextBox invisible-border"
                            height="11"
                            width="80"
                            value={email}
                            onChange={(e) => handleEmailChange(e)}  
                        />
                         {emailError && (
                            <p style={{ color: "red", marginTop: "0.5rem" }}>{emailError}</p>
                        )}
                    </div>
                    <div style={{ height: '20px' }}></div>
                    <div className="mb-6">
                        <Textbox
                            label="Password"
                            id="password"
                            name="name"
                            placeholder="***************"
                            type="password"
                            class="marginTextBox invisible-border"
                            height="11"
                            width="80"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit" // Changed to 'submit' to trigger form submission
                        className="mt-4 justify-center mx-auto rounded-xl mb-4"
                        onClick={handleLogin}
                        style={{ height: '2.75rem', maxWidth: '20rem', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', backgroundColor: '#5E8E85', color: '#fff'}} // Adjusted styles for centering
                        disabled={loading} // Disable the button when loading
                        onTouchStart={handleLogin}
                    >
                        {loading ? 'Loading...' : 'Continue'}
                    </button>
                    <div className="text-center" style={{color: '#5E8E85'}} >
                        <a href="/reset-password">Reset password?</a>
                    </div>
                </div>
                </form>
            </div>
                <div className="absolute bottom-3 left-4 flex flex-row">
                    <p className="mr-2 [font-family:'Inter-Regular',Helvetica] font-normal text-[14px]" style={{color:'#667085'}}>This app is in beta, to sign up, please reach out at help@ovii.ai</p>
                </div>
                {/*</div>*/}
        </div>
     </div>
    );
};

export default Login;
