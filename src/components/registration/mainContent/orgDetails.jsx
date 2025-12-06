import React, { useRef, useEffect } from 'react';
import icon from '../../../assets/icon.svg';
import Textbox from "../../utilities/textBox";
import TextArea from "../../utilities/textArea";
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-react-inputs';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-react-inputs/styles/material.css';

const OrgDetails = () => {
    // Create a ref for the form
    const formRef = useRef(null);

    // Callback for successful upload
    const onUploadSuccess = (args) => {
        console.log('File uploaded successfully:', args.file.name);
    };

    // Form submission handler
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formRef.current.validate()) {
            console.log('Form is valid! Submitting...');

        }
    };

    const nameValidator = (value) => {
        const nameExp = /^[A-Za-zà-ÿ]+(?: [A-Za-zà-ÿ]+)*$/ ;
        return nameExp.test(value.value  || '');
    }

    // Setting up the form validator
    useEffect(() => {
        let options = {
            rules: {
                name: {
                    required: [true, "Company name is required"],
                    minLength: [3, "Company name must be at least 3 characters long"] ,
                    rules: [nameValidator, 'Enter a valid name'],
                },
                website: {
                    required: [true, "Website is required"],
                    url: [true, "Enter a valid URL"]
                },
                description: {
                    required: [true, "Description is required"]
                }
            }
        };
        new FormValidator('#orgDetailsForm', options);
    }, []);

    return (
        <div>
            <div>
                <img src={icon} alt="boltcode icon"/>
                <h1>Company details</h1>
                <p>This is a place holder text that spans a long line remove it or change it</p>
            </div>
            <form id="orgDetailsForm" ref={formRef} onSubmit={handleSubmit}>
                <div>
                    <Textbox label="Company name" id="name" name="name" placeholder="ABC corp" type="text"></Textbox>
                    <Textbox label="Website" id="website" name="website" placeholder="https://plumes.ai" type="text"></Textbox>
                    <TextArea label="Company description" id="description" name="description" placeholder="Please enter your company description" />

                    {/* Syncfusion File Uploader */}
                    <div>
                        <label>Upload Company Logo:</label>
                        <UploaderComponent
                            asyncSettings={{ saveUrl: 'YOUR_BACKEND_ENDPOINT', removeUrl: 'YOUR_BACKEND_ENDPOINT' }}
                            success={onUploadSuccess}
                        />
                    </div>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default OrgDetails;
