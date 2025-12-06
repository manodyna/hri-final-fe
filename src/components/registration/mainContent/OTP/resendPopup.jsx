import icon from '../../../../assets/otpIcon.svg';
import './resendPopup.css';
import close from '../../../../assets/close.svg';

const ResendPopup = ({ onClose, mail,  }) => {

    const handleOutsideClick = (e) => {
        // Check if the clicked target is the overlay itself
        if (e.target.className === 'popup-overlay') {
            onClose();  // Close the popup
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/resendOTP?email=${mail}`, {
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
        <div className="popup-overlay" onClick={handleOutsideClick}>
            <div className="popup-content">
                <img src={close} alt='close icon' style={{ display: 'flex'}} onClick={onClose}/>
                <img src={icon} alt="otp icon" style={{ display: 'flex'}} className="w-1/15 mb-10 max-h-30 p-0 mx-auto" id="icon"/>
                <h1 style={{ display: 'flex', justifyContent: 'center' }} className='font-medium' id='title'>Resend verification code</h1>
                <p style={{ display: 'flex', justifyContent: 'center' }} className='text-sm text-grey' id='description'>We have sent an email with a new verification code to {mail}</p>
                <div style={{display:'flex', justifyContent: 'center'}} className='mt-5'>
                    <button id='button1' onClick={onClose}>Got it</button>
                    <button id='button2' onClick={handleResendOTP}>Send Again</button>
                </div>
            </div>
        </div>
    )
}

export default ResendPopup;