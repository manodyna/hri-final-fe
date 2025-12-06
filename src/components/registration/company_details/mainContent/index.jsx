import './index.css'
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-react-inputs/styles/material.css';
import suitcase from "../../../../assets/suitcase.svg";
import logo from '../../../../assets/icon.svg'
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import React, { useEffect, useState } from 'react';
import mark from "../../../../assets/questionmark.png";
import { setWithExpiry, getWithExpiry } from '../../verifier';
import EmployeeBenefits from '../../employee_benefits/employeebenefits';
import axios from 'axios';
import {FormValidator, FormValidatorModel} from "@syncfusion/ej2-react-inputs";

function Textbox(props) {
    return (
        <div>
            <>
            <div>
                <p className="text-[14px] font-medium" style={{ color: "#344053" }}>{props.label}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}
                 className={`companyNameTextBox border-lightGrey border 
                 rounded-md pr-2 pl-2 w-${props.width} h-${props.height} mt-1`}>

                    {props.img? (<img src={props.img}/>) : null}
                    {props.subhead? ( <div style={{ display: 'flex', alignItems: 'center' }}
                                           className={`border-lightGrey relative border w-${props.width} h-${props.height} 
                                           pr-2 pl-2  subHeadingTextBox onlyRightBorder`}>{props.subhead}</div>): null}
                    <input
                            id={props.id}
                            name={props.name || props.id}
                            placeholder={props.placeholder}
                            type={props.type}
                            className={props.class}
                            required
                            />
                    {props.img2? (<img src={props.img2} id={props.img2id} className='ml-1'/>):null}
            </div>
            <div>
                  <span id={`${props.id}-error`} className="validation-message text-sm text-red-500"></span>
            </div>
            </>
        </div>
    );
};

const NetworkErrorPopup = ({ show, onClose }) => {
    return (
        <div className={`network-error-popup ${show ? 'visible' : ''}`}>
            <div className="network-error-content">
                <h2>Network Error</h2>
                <p>There was an issue connecting to the network. Please try again later.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
const ContentFirst = () => {
    const [token, setToken] = useState('');
    const [fileName, setFileName] = useState('');
    const [showNetworkError, setShowNetworkError] = useState(false);

    const noSpecialCharValidator = (value) => {
        const specialCharExp = /^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        return specialCharExp.test(value.value.trim() || '')
    };

    useEffect(() => {
        // Fetch the token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }

        let FormValidatorModel = {
            rules: {
                'companyName': {
                    required: [true, 'Please enter a company name.'],
                    minLength: [3, 'Please enter a valid company name.'],
                    noSpecialCharValidator: [true, 'Company name cannot contain special characters.'],
                    maxLength: [120, 'Company name cannot exceed 120 characters.']
                },
                'website': {
                    required: [true, 'Please enter a website.'],
                    url: [true, 'Please enter a valid website.']
                },
                'desc': {
                    required: [true, 'Please enter a description.'],
                    maxLength: [5000, 'Description cannot exceed 5000 characters.'],
                    minLength: [50, 'Please enter a valid description.']
                },
                'companyLogoImg': {
                    required: [true, 'Please upload a company logo.']
                },
                'terms': {
                    required: [true, 'Please accept to display this info on the company details page.']
                }
            },
            customPlacement: (inputElement, error) => {
                // This should be the div that contains the input field
                let inputFieldContainer = inputElement.parentElement;
                if (!inputFieldContainer) {
                    console.error('Could not find the input field container element.');
                    return;
                }

                // The querySelector should be scoped to the inputFieldContainer's next sibling element
                let errorContainer = inputFieldContainer.nextElementSibling.querySelector('.validation-message');
                if (!errorContainer) {
                    // Creates a new <span> element for the validation message
                    errorContainer = document.createElement('span');
                    errorContainer.classList.add('validation-message', 'text-sm', 'text-red-500');
                    // Append the error message to the next sibling element of the input's div container
                    inputFieldContainer.nextElementSibling.appendChild(errorContainer);
                }

                // Set or clear the error message
                errorContainer.textContent = error || '';
            }


        };

        let formElement = document.getElementById('form-element');
        new FormValidator(formElement);
    }, []);

    const closeNetworkError = () => {
        setShowNetworkError(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        let formElement = document.getElementById('form-element');
        if (formElement && formElement.ej2_instances) {
            let validator = formElement.ej2_instances[0];
            if (!validator.validate()) {
                return;
            }
        }
        
        let termsYes = document.getElementById("yescompanyDetails").checked;

        if (!termsYes) {
            alert("Please check the Box.")
        }

        else {

            // const token = getWithExpiry('Token_Key');
            console.log(token)
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const fileSelector = document.getElementById("companyLogoImg");
            const file = fileSelector.files[0];
            const formData = new FormData();
            formData.append('file', file);

            var file_path = ""

            try {

                const response = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/upload`, formData, { headers: headers }
                );
                console.log(headers)
                if (response.status === 200) {
                    file_path = response.data.data.split(" ")
                    file_path = file_path[file_path.length - 1]
                    console.log(file_path)
                } else {
                    setShowNetworkError(true);
                    console.error('Error:', response.data);
                }
            } catch (error) {
                setShowNetworkError(true);
                console.error(error);
            }



            var myHeaders = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            var raw = JSON.stringify({
                "orgName": document.getElementById("companyName").value,
                "website": document.getElementById("website").value,
                "address": "",
                "companyContact": "",
                "companyProfile": document.getElementById("desc").value,
                "companyLogo": file_path,
                "companySize": ""
            })

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };


            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/modifyOrgDetails`, requestOptions);
                const result = await response.json();

                if (response.ok) {
                    window.location.href = "/employeeBenefits";
                } else {
                    console.error('Error:', result);
                }

            } catch (error) {
                setShowNetworkError(true);
                console.error(error);
            }
        }
    }

    
  const handleFileChange = ({ target: { files } }) => {
    const selectedFile = files[0];

    // Check if a file is selected
    if (selectedFile) {
      // Check file type (accept only png and jpeg)
      if (!/^image\/(png|jpeg)$/.test(selectedFile.type)) {
        alert('Please upload a valid PNG or JPEG file.');
        return;
      }

      // Check file size (max size: 400KB)
      const maxSizeInBytes = 400 * 1024;
      if (selectedFile.size > maxSizeInBytes) {
        alert('File size exceeds the maximum allowed (400KB).');
        return;
      }

      // Set file name and handle further actions if needed
      setFileName(selectedFile.name);
      // ... additional logic ...
    }
  };


    return (
        <div>
            <form id="form-element" onSubmit={handleSubmit}>
                <img src={logo} className="logoCompanyDetails" />
                <div className="text-black font-sans font-bold text-xl text-center mt-1.5">Company Details</div>
                <div className="text-black font-sans font-base text-center mt-1.5">This is a place holder text that spans a long line remove it or change it</div>

                <div className="inputFields mt-5" style={{ display: 'flex' }}>
                    <div >
                        <Textbox  id="companyName" label="Company Name" placeholder="ABC Corp" type="text" class="marginTextBox invisible-border" showImage={false}  height="11" width="80"/>
                    </div>
                    <div className='inputGroup'>
                        <Textbox id="website" label="Website" placeholder="www.untitledui.com" type="url" class="marginTextBox invisible-border" showImage={false} subhead="http://" height="11" width="80"/>
                    </div>

                </div>
                <div className="inputCenter mt-5">
                    <div>
                        <p className="text-[14px] font-medium" style={{ color: "#344053" }}>Description</p>
                        <div style={{ display: 'flex' }} className="companyDescBox border-lightGrey border rounded-md pr-2 pl-2 mt-1">
                            <textarea
                                id="desc"
                                name="desc"
                                placeholder="XYZ is a tech industry trailblazer,
                                delivering innovative solutions with a commitment to quality.
                                Our professional team utilizes the latest technologies to enhance user experience
                                and streamline services. We prioritize continuous improvement, creativity,
                                 and strategic innovation, ensuring every client interaction adds value and drives success."
                                type="text"
                                className="marginDescBox invisible-border"
                                required
                            />
                        </div>
                    </div>


                </div>

                <div className="inputCenter mt-5">
                    <div>
                        <p className="text-[14px] font-medium" style={{ color: "#344053" }}> Company Logo </p>
                        <div className="uploader border-lightGrey border rounded-md pr-2 pl-2" onClick={() => document.querySelector(".input-field").click()}>
                            <input type="file" accept="image/*" className="input-field" required hidden id="companyLogoImg" name="companyLogoImg"
                            onChange={handleFileChange}
                                />
                            <p className='textUploader'>{fileName?fileName:"Upload your logo here"}</p>
                        </div>
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
                            Opting this will display the company profile in careers site job detail page
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className="buttonContainer">
                        <button type="submit" className="button1">Done</button>
                    </div>
                </div>


            </form>

            <NetworkErrorPopup show={showNetworkError} onClose={closeNetworkError} />

        </div>
    );

}

export default ContentFirst;