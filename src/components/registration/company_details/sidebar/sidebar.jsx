import logo from "../../../../assets/logo.png"
import checkCircle from "../../../../assets/checkCircle.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import checkCircleBlue from "../../../../assets/checkCircleBlue.svg"
import checkCircleGrey from "../../../../assets/checkCircleGrey.svg"
import "./sidebar.css"
import mail from "../../../../assets/mail.svg"
import styles from '../../../../index.css'
const Sidebar = () => {

    return (
        <div className="sidebarContainer">
            {/*<img src={logo} alt="plumes logo" className="logo"/>*/}
            <div>
                <div className="titleDiv">
                    <img src={checkCircle} alt="check circle" className="checkCircle" id="circle-1"/>
                    <span className="text-black font-sans font-semibold text-base" id="text-1">Your Details</span>
                </div>
                <p className="headDescription text-black text-sm font-sans">Enter your name and email address</p>
            </div>
            <div>
                <div className="titleDiv">
                    <img src={checkCircle} alt="check circle" className="checkCircle"/>
                    <span className="text-black font-sans font-semibold text-base">Email Verification</span>
                </div>
                <p className="headDescription text-black text-sm font-sans">Enter the OTP sent to your email</p>
            </div>
            <div>
                <div className="titleDiv">
                    <img src={checkCircleBlue} alt="check circle" className="checkCircle"/>
                    <span className="text-black font-sans font-semibold text-base">Company Information</span>
                </div>
                <p className="headDescription text-black text-sm font-sans">Share your company details</p>
            </div>
            <div>
                <div className="titleDiv">
                    <img src={checkCircleGrey} alt="check circle" className="checkCircle"/>
                    <span className="text-gray-600 font-sans font-semibold text-base">Employee benefits</span>
                </div>
                <p className="headDescription text-gray-600 text-sm font-sans">Choose the benefits offered to your employees</p>
            </div>

            <div className="footIcons">
                <FontAwesomeIcon icon="fas fa-copyright"/><span className="footText">Plumes</span>
                <img src={mail} alt="mail icon" className="mailIcon" /><span className="footText">help@plumes.ai</span>
            </div>
        </div>
    );
};

export default Sidebar;