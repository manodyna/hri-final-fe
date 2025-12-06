import React, { useState } from "react";
import plumes from "../../assets/headerplumes.svg";
import search from "../../assets/headersearch.svg";
import bell from "../../assets/headerbell.svg";
import mark from "../../assets/headermark.svg";
import circle from "../../assets/Ellipse.svg";
import data from "../../data.json";
import mail from "../../assets/mail.svg";
import settings from "../../assets/settings.png";
import downlaod from "../../assets/download.png";
import ellipse from "../../assets/Ellipse7.png";
import profile from "../../assets/Ellipse.svg";
import trash from "../../assets/trash.png";
import Textbox from "../utilities/textBox";
import PhoneNumberInput from "../utilities/phoneInput";
import { MemberCard } from "../commonComponents/cards/memberCard";
import MemberSidecard from "../commonComponents/cards/memberSidecard";
import close from "../../assets/close.png";
import {
  CheckBoxComponent,
  SwitchComponent,
} from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import roundPlus from "../../assets/roundPlus.png";
import textTypeImg from "../../assets/textType.png";
import DragDrop from "./dragDrop";
import { useEffect } from "react";
import style from "../commonComponents/cards/memberCard.css";

export const PopUpReferral = ({ isOpen, onClose }) => {
  let [errorShow, setErrorShow] = useState(false);
  let [resumePDF, setResumePDF] = useState();
  let [forCheck, setForCheck] = useState("");
  let [genderCheck, setGenderCheck] = useState([false, false, false]);
  let [portfolio, setPortfolio] = useState([]);

  let [validation, setValidation] = useState({
    first_Name: "",
    last_Name: "",
    email: "",
    contact_No: "",
    gender: "",
    address: "",
    postal_Code: 0,
    isFresher: true,
    current_Designation: "",
    current_Organization: "",
    current_Ctc: 0,
    expected_Ctc: 0,
    notice_Period: 0,
    know_Candidate: "",
    linkdin_Portfolio: "",
    cover_Latter: "",
    resume: [],
  });

  function checkValidate() {
    return (
      validation.first_Name !== "" &&
      validation.last_Name !== "" &&
      validation.email?.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      ) &&
      validation.contact_No?.length == 10 &&
      validation.address?.length !== "" &&
      validation.postal_Code?.length == 6 &&
      validation.current_Designation !== "" &&
      validation.current_Organization !== "" &&
      (!validation.current_Ctc == 0 || !validation.current_Ctc?.length == 0) &&
      (!validation.expected_Ctc == 0 ||
        !validation.expected_Ctc?.length == 0) &&
      (!validation.notice_Period == 0 ||
        !validation?.notice_Period?.length == 0) &&
      !validation.know_Candidate == "" &&
      !validation.linkdin_Portfolio?.length == 0 &&
      !validation.cover_Latter?.length == 0 &&
      validation?.resume?.name
    );
  }

  let handleSubmit = () => {
    if (!checkValidate()) {
      setErrorShow(true);
    } else {
      onClose();
      setErrorShow(false);
      setValidation({
        first_Name: "",
        last_Name: "",
        email: "",
        contact_No: "",
        gender: "",
        address: "",
        postal_Code: 0,
        isFresher: false,
        current_Designation: "",
        current_Organization: "",
        current_Ctc: 0,
        expected_Ctc: 0,
        notice_Period: 0,
        know_Candidate: "",
        linkdin_Portfolio: "",
        cover_Latter: "",
        resume: [],
      });
    }
  };
  let handlePortfolio = (value) => {
    setPortfolio([
      ...portfolio,
      { id: Math.floor(Math.random() * 100), value: value },
    ]);
  };
  let handlePortfolioDelete = (id) => {
    let data = portfolio.filter((e, i) => e.id !== id);
    setPortfolio(data);
  };
  let handleChange = (name) => (event) => {
    setValidation({ ...validation, [name]: event.target.value });
  };
  let handleGender = (check, value) => {
    if (value == validation.gender) {
      setValidation({ ...validation, ["gender"]: "" });
    } else {
      setValidation({ ...validation, ["gender"]: value });
      setGenderCheck(check);
    }
  };
  if (!isOpen) return null;

  const knowCandidate = [
    { text: "", value: "", label: "" },
    { text: "Relative", value: "Relative", label: "Relative" },
    { text: "Other", value: "Other", label: "Other" },
  ];
  const currency = [
    { text: "USD", value: "USD", label: "USD" },
    { text: "INDRS", value: "INDRS", label: "INDRS" },
  ];
  const timePeriod = [
    { text: "Per Annum", value: "Per Annum", label: "Per Annum" },
    { text: "Per Month", value: "Per Month", label: "Per Month" },
  ];
  const textType = [
    { text: "Normal Text", value: "Normal Text", label: "Normal Text" },
    { text: "Bold Text", value: "PeBold Text label", label: "PeBold Text" },
  ];
  const handleResumePutData = (val) => {
    console.log(val.path);
    setValidation({ ...validation, ["resume"]: val });
  };
  const handleCheck = () => {
    console.log("ok");
  };
  console.log("gender => ",validation.gender);

  return (
    <div className=" fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
      <div
        style={{ width: "50vw", height: "100vh", overflowY: "scroll" }}
        className="absolute top-0 right-0 max-h-screen bg-white  pt-4 z-10"
      >
        {/* Pop-up content */}
        <div className="bg-lightSky mt-3">
          <div className=" text-xl font-medium ml-10 py-3 px-4 ">
            Electrical systems specialist
          </div>
        </div>
        {/* Add content and form elements for inviting a new member here */}
        <div className="py-6 my-8 px-9 w-[100%] ">
          <div className=" w-[100%] gap-[7%]  mt-0 flex justify-between">
            <div className="w-[50%]">
              <Textbox
                onChange={handleChange("first_Name")}
                label="First Name"
                id="name"
                name="name"
                placeholder="olivia@untitledui.com"
                type="text"
                className="w-[100%]"
                labelClassName="text-semiGrey"
                showImage={false}
              />
              {validation.first_Name == "" && errorShow && (
                <p className="text-red-500 text-[12px] mt-1 ">{`${"First Name is required"}`}</p>
              )}
            </div>
            <div className="w-[50%]">
              <Textbox
                onChange={handleChange("last_Name")}
                label="Last Name"
                id="name"
                name="name"
                placeholder="olivia@untitledui.com"
                type="text"
                className="w-[100%]"
                labelClassName="text-semiGrey"
                showImage={false}
              />
              {validation.first_Name == "" && errorShow && (
                <p className="text-red-500 text-[12px] mt-1 ">{`${"Last Name is required"}`}</p>
              )}
            </div>
          </div>
          <div className=" mt-7 gap-[7%] flex justify-between w-[100%]">
            <div className="w-[50%]">
              <Textbox
                label="Email"
                id="name"
                onChange={handleChange("email")}
                name="name"
                className="w-[100%]"
                placeholder="olivia@untitledui.com"
                type="text"
                labelClassName="text-semiGrey"
                showImage={false}
              />
              {!validation.email?.match(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
              ) &&
                errorShow && (
                  <p className="text-red-500 text-[12px] mt-1 ">
                    Enter valid Email
                  </p>
                )}
            </div>
            <div className="w-[50%]">
              <PhoneNumberInput
                onChange={handleChange("contact_No")}
                id="phone"
                name="phone"
                label="Contact Number"
                isFrom={"referral"}
              />
              {validation.contact_No?.length !== 10 && errorShow && (
                <p className="text-red-500 text-[12px] mt-1 ">{`${"Contact number is required"}`}</p>
              )}
            </div>
          </div>

          <div>
            <div className="text-gray-700 font-medium text-[14px]">
              <div className="mt-7 w-[100%]  items-end flex gap-[7%]  mb-1">
                Gender
              </div>
              <div className="flex sm:max-lg:flex-col sm:max-xl:gap-4  gap-[7%] justify-between w-[100%] relative">
                <div className="w-[50%] sm:max-lg:w-[100%] sm:max-md:w-[100%] flex gap-[7%]">
                  <div className="border border-solid flex items-center gap-2 rounded-md justify-start border-lightGrey gender-input">
                    {/* <input type="checkbox" className="ml-[10%]" name="gender" onClick={handleCheck}/> */}
                    <div className="ml-[10%] h-[100%] flex items-center">
                      <CheckBoxComponent
                        onChange={() =>
                          handleGender([true, false, false], "male")
                        }
                        cssClass="e-custom"
                        name="gender"
                        id="male"
                        checked={genderCheck[0]}
                        className="pl-[10%]"
                        // onClick={() => handleCheck()}
                        // onClick={handleCheck}
                      >
                        <span>Male</span>
                      </CheckBoxComponent>
                    </div>

                    <label className="text-gray-400">Male</label>
                  </div>
                  <div className="border border-solid flex items-center gap-2 rounded-md justify-start border-lightGrey h-[45px] w-[50%]">
                    {/* <input type="checkbox" className="ml-[10%]" name="gender" /> */}
                    <div className="ml-[10%]">
                      <CheckBoxComponent
                        cssClass="e-custom"
                        name="gender"
                        id="female"
                        checked={genderCheck[1]}
                        className="pl-[10%]"
                        onChange={() =>
                          handleGender([false, true, false], "female")
                        }
                      >
                        <span>Female</span>
                      </CheckBoxComponent>
                    </div>
                    <label className="text-gray-400">Female</label>
                  </div>
                </div>
                <div className="border border-solid flex items-center gap-2 rounded-md justify-start border-lightGrey h-[45px] w-[50%] sm:max-lg:w-[100%]">
                  {/* <input type="checkbox" className="ml-[5%]" name="gender" /> */}
                  <div className="ml-[5%]">
                    <CheckBoxComponent
                      cssClass="e-custom"
                      name="gender"
                      id="other"
                      checked={genderCheck[2]}
                      onChange={() =>
                        handleGender([false, false, true], "not prefer to say")
                      }
                      className="pl-[10%]"
                    >
                      <span>Prefer not to say</span>
                    </CheckBoxComponent>
                  </div>
                  <label className="text-gray-400">Prefer not to say</label>
                </div>
              </div>
              {validation.gender == "" && errorShow && (
                <p className="text-red-500 text-[12px] mt-1 ">{`${"Gender is required"}`}</p>
              )}
            </div>
          </div>

          <div className="mt-7 w-[100%] gap-[7%]  flex justify-between">
            <div className="w-[70%]">
              <Textbox
                onChange={handleChange("address")}
                label="Address"
                id="name"
                name="name"
                placeholder="Source"
                type="text"
                className=" w-[100%]"
                labelClassName="text-semiGrey"
                showImage={false}
              />
              {validation.address == "" && errorShow && (
                <p className="text-red-500 text-[12px] mt-1 ">{`${"Address is required"}`}</p>
              )}
            </div>
            <div className="w-[30%]">
              <Textbox
                onChange={handleChange("postal_Code")}
                label="Postal Code"
                id="name"
                name="name"
                placeholder="000-000"
                type="number"
                className=" w-[100%]"
                labelClassName="text-semiGrey"
                showImage={false}
              />
              {(validation.postal_Code?.length < 6 ||
                validation.postal_Code == 0) &&
                errorShow && (
                  <p className="text-red-500 text-[12px] mt-1 ">{`${"Postal code is required"}`}</p>
                )}
            </div>
          </div>

          <div className="mt-7 w-[100%]  flex items-center">
            <h6 className="text-[14px] mr-2 mt-2 text-gray-700 font-medium">
              Candidate is fresher
            </h6>
            <SwitchComponent
              checked={validation.isFresher}
              cssClass="e-switch"
            />
          </div>

          <div className="mt-7 items-end gap-[7%] w-[100%] flex">
            <div className="w-[50%]">
              <Textbox
                onChange={handleChange("current_Designation")}
                label="Designation at current organization"
                id="name"
                name="name"
                placeholder="UX Design"
                type="text"
                className=" w-[100%]"
                labelClassName="text-semiGrey"
                showImage={false}
              />
              {validation.current_Designation == "" && errorShow && (
                <p className="text-red-500 text-[12px] mt-1 ">{`${"Contact number is required"}`}</p>
              )}
            </div>
            <div className="w-[50%]">
              <Textbox
                onChange={handleChange("current_Organization")}
                label="Current organisation"
                id="name"
                name="name"
                placeholder="ABC"
                type="text"
                className="w-[100%]"
                labelClassName="text-semiGrey"
                showImage={false}
              />
              {validation.current_Organization == "" && errorShow && (
                <p className="text-red-500 text-[12px] mt-1 ">{`${"Contact number is required"}`}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-start w-[100%] gap-[7%] justify-between">
              <div className="w-[50%]">
                <h6 className="mt-7 text-gray-700 font-medium text-[14px] left-0">
                  Current ctc
                </h6>
                <div className=" border-lightGrey border flex items-end relative rounded-md pr-2 pl-2 w-[100%] h-11 mt-1">
                  <div className="flex gap-2 items-center">
                    <div className="">
                      <DropDownListComponent
                        dataSource={currency}
                        value={currency[0].label}
                      />
                    </div>
                    <input
                      onChange={handleChange("current_Ctc")}
                      type="number"
                      placeholder="$40,000"
                      className="w-[100%] mb-2"
                    />
                    <DropDownListComponent
                      width={"50%"}
                      dataSource={timePeriod}
                      value={timePeriod[0].label}
                    />
                  </div>
                </div>
                {errorShow &&
                  (validation?.current_Ctc == 0 ||
                    validation?.current_Ctc?.length == 0) && (
                    <p className="text-red-500 text-[12px] mt-1 ">{`${"Currency is required"}`}</p>
                  )}
              </div>
              <div className="w-[50%]">
                <h6 className="text-gray-700 mt-7 font-medium  text-[14px]">
                  Expected ctc
                </h6>
                <div className="flex justify-center items-start w-[100%]">
                  <div className="w-[100%]">
                    <div className=" border-lightGrey border flex items-end relative rounded-md pr-2 pl-2 w-[100%] h-11 mt-1">
                      <div className="flex gap-2">
                        <div>
                          <DropDownListComponent
                            dataSource={currency}
                            className="w-[100%]"
                            value={currency[0].label}
                          />
                        </div>
                        <input
                          onChange={handleChange("expected_Ctc")}
                          type="text"
                          placeholder="$40,000"
                          className="w-[100%] mb-2 "
                        />
                        <DropDownListComponent
                          width={"50%"}
                          dataSource={timePeriod}
                          value={timePeriod[0].label}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {errorShow &&
                  (validation?.expected_Ctc == 0 ||
                    validation?.expected_Ctc?.length == 0) && (
                    <p className="text-red-500 text-[12px] mt-1 ">{`${"Currency is required"}`}</p>
                  )}
              </div>
            </div>
          </div>

          <div>
            <div className=" mt-7 w-[100%] flex justify-between items-end gap-[7%]">
              <div className="w-[50%] ">
                <Textbox
                  onChange={handleChange("notice_Period")}
                  label="Notice Period (days)"
                  id="name"
                  name="name"
                  placeholder="0"
                  type="number"
                  className=" w-[100%]"
                  labelClassName="text-semiGrey"
                  showImage={false}
                />
                {errorShow &&
                  (validation.notice_Period == 0 ||
                    validation.notice_Period?.length == 0) && (
                    <p className="text-red-500 text-[12px] mt-1 ">{`${"Notice Period is required"}`}</p>
                  )}
              </div>
              <div className="w-[50%]">
                <div className="w-[100%]">
                  <div className=" text-gray-700 w-[100%] font-medium  text-[14px] left-0">
                    How do you know the candidate?
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="border-lightGrey border flex items-end relative rounded-md pr-2 pl-2 w-[100%] h-11 mt-1"
                  >
                    <div className="w-[100%]">
                      <DropDownListComponent
                        onChange={handleChange("know_Candidate")}
                        dataSource={knowCandidate}
                        placeholder="Know Candidate"
                      />
                    </div>
                  </div>
                  {validation.know_Candidate == "" && errorShow && (
                    <p className="text-red-500 text-[12px] mt-1 ">{`${"Know Candidate is required"}`}</p>
                  )}
                  {/* {validation.notice_Period.toString()?.length <= 0 && errorShow && (
                  <p className="text-red-500 text-[12px] mt-1 ">{`${"Know Cabndidate required"}`}</p>
                )} */}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 w-[100%]">
            <div className="w-[100%] relative">
              <Textbox
                onChange={handleChange("linkdin_Portfolio")}
                label="Linkedin/work related portfolio"
                id="name"
                name="name"
                placeholder="Source"
                type="text"
                className=" w-[100%]"
                labelClassName="text-semiGrey"
                showImage={false}
              />
              <img
                onClick={() => handlePortfolio(validation.linkdin_Portfolio)}
                src={roundPlus}
                className="absolute top-[50%] right-3 cursor-pointer"
                alt=""
              />
            </div>
            {validation.linkdin_Portfolio == "" && errorShow && (
              <p className="text-red-500 text-[12px] mt-1 ">{`${"Portfolio is required"}`}</p>
            )}
            {portfolio?.length > 0 && (
              <div className="border flex flex-wrap gap-3  mt-3 py-2 px-2 rounded-md border-lightGrey">
                {portfolio.map((e, i) => {
                  return (
                    <div
                      key={e.value + i}
                      className="text-gray-500 boder border flex items-center border-gray-300 px-3 rounded-md"
                    >
                      {e.value}
                      <span
                        className="ml-3 cursor-pointer"
                        onClick={() => handlePortfolioDelete(e.id)}
                      >
                        <img src={close} alt="del" width={"10px"} />
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-7 w-[100%]">
            <h5 className="text-gray-700 font-medium  text-[14px]">
              Cover letter
            </h5>
            <div className="w-[100%]">
              <div className="w-[100%] flex items-center">
                <div className="border-lightGrey border flex items-center relative rounded-md pr-2 pl-2 w-80 h-11 mt-1">
                  <DropDownListComponent
                    dataSource={textType}
                    placeholder="text"
                    value={textType[0].label}
                  />
                </div>
                <div className="ml-3">
                  <img src={textTypeImg} alt="img" />
                </div>
              </div>
              <div className="w-[100%] mt-2 ">
                <textarea
                  onChange={handleChange("cover_Latter")}
                  className="border-lightGrey border relative rounded-md mt-1 w-[100%] h-[100px]"
                  rows={0}
                ></textarea>
                <h6 className="text-lightLabel text-[12px]">
                  276 Characters left
                </h6>
              </div>
              {validation.cover_Latter == "" && errorShow && (
                <p className="text-red-500 text-[12px] mt-1 ">{`${"Cover Latter is required"}`}</p>
              )}
            </div>
          </div>

          <div className="mt-7 w-[100%]">
            <div className="w-[100%] h-[80px] flex items-center justify-center  border-lightGrey border">
              <h4 className="text-blue font-semibold text-[14px]">
                <DragDrop
                  data={resumePDF}
                  accept={"image/*"}
                  setData={(val) => handleResumePutData(val)}
                />
              </h4>
            </div>
            {validation.resume == "" && errorShow && (
              <p className="text-red-500 text-[12px] mt-1 ">{`${"Resume is required"}`}</p>
            )}
          </div>
        </div>

        <div className="">
          <button
            onClick={() => handleSubmit()}
            className=" bottom-5 font-light  w-[100px] h-11 ml-10   mb-7 hover:bg-blue-600 text-blue bg-[#0000ff28] py-2 px-1 rounded-lg"
          >
            Submit
          </button>
        </div>
        {/* <button className="absolute bottom-5 bg-blue text-white right-10 border w-72 h-11 ml-10 mt-4 bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-xl">
          Save
        </button> */}
      </div>
    </div>
  );
};
