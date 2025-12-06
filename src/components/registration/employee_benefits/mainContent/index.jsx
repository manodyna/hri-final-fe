import './index.css'
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-react-inputs/styles/material.css';
import logo from '../../../../assets/icon.svg'
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import React, {useState, useEffect } from 'react';
import {setWithExpiry, getWithExpiry } from '../../verifier';


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

    const [showNetworkError, setShowNetworkError] = useState(false);
    var [benefits, setBenefits] =  useState({});
    var [arry, setArry] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        // Fetch the token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleClick = (id) => {
      var updatedBenefits = {...benefits};
      var updateArry = [...arry]
      if (updatedBenefits[id].state==="false"){
        updatedBenefits[id].state="true";
        updateArry.push(id);
      }
      else{
        updatedBenefits[id].state="false";
        updateArry = updateArry.filter(item => item !== id)
      }
      setBenefits(updatedBenefits);
      setArry(updateArry);
    };


    const BenefitsContainer = (props) =>{
      return (
        <div className= {` ${props.show=="true" ? 'rectangle-25' : 'rectangle-24'} ${props.additonal} font-sans font-bold text-l text-center`} id = {props.id} onClick={() => handleClick(props.id)} >
          {props.text}
        </div>
      );
    }

    
    const closeNetworkError = () => {
        setShowNetworkError(false);
    };

    

    async function list_of_benefits(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        var bens = {};


        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/getBenefits`, requestOptions);
            var result = await response.json()
            result.data.forEach(item => {
              bens[item.id] = {
                name: item.name,
                state: "false"
              };
            });
            

        } catch (error) {
            setShowNetworkError(true);
            console.error(error);
        }
        setBenefits(bens);
    
    }

    const handleSubmit = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
      var raw = JSON.stringify(arry);
    
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
        


        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/addBenefits`, requestOptions);
            const result = await response.json();
            if (response.ok) {
              window.location.href = "/";
              localStorage.setItem('token23',getWithExpiry('Token_Key'));
              console.log(arry)

          } else {
              console.error('Error:', result);
              setShowNetworkError(true);

              
          }

            

        } catch (error) {
            setShowNetworkError(true);
            console.error(error);
        }
    }
    
    var arr = []
    var arr1 = []
    var arr2 = []

    return(
        <div onLoad={list_of_benefits}>
            
            <img src={logo} className="logoCompanyDetails"/>
            <div className="text-black font-sans font-bold text-xl text-center mt-1.5">Employee benefit</div>
            <div className="text-black font-sans font-base text-center mt-1.5">Select the benefits from below list</div>
            <div className="text-black font-sans font-base mt-1.5 employeeBenefits">
            {
            Object.keys(benefits).map((key, index) => { 
              if (index%3==0){
                arr.push(
                  <BenefitsContainer
                    show={benefits[key].state}
                    id={key}
                    text={benefits[key].name}
                    additonal = {""}
                  />
                );
              }
              if (index%3==1){
                arr1.push(
                  <BenefitsContainer
                    show={benefits[key].state}
                    id={key}
                    text={benefits[key].name}
                    additonal = {"between"}

                  />
                );
              }
              if (index%3==2){
                arr2.push(
                  <BenefitsContainer
                    show={benefits[key].state}
                    id={key}
                    text={benefits[key].name}
                    additonal = {""}
                  />
                );
              }
              

              

              

            })}
            <div>{arr}</div>
            <div>{arr1}</div>
            <div>{arr2}</div>

            </div>
            
            
            <div style={{display:'flex'}}>
                    <div className="buttonContainer">
                        <button type="submit" className="button1" onClick={handleSubmit}>Done</button>
                    </div>
            </div>

            <NetworkErrorPopup show={showNetworkError} onClose={closeNetworkError} />

        </div>
    );

}

export default ContentFirst;