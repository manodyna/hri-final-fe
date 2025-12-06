import React, { useState } from "react";
import map from "../../../assets/map.png";
import style from "../cards/memberCard.css";
import close from "../../../assets/close.png";
import upArrow from "../../../assets/upArrow.png";
import downArrow from "../../../assets/downArrow.png";

const MemberSidecard = ({ accordian1, data, requestType, bg,questionData }) => {
  
  // console.log("check dataaaaa10aaaaaa ==>>>>",questionData)
  // let accordian1 = [
  //   {
  //     id: 1,
  //     question: "Is there a free trial available?",
  //     answer:
  //       "Invite your team members on Nook to work faster and collaborate easily together. Manage their permissions to better structure projects. Invite your team members on Nook to work faster and collaborate easily together. Manage their permissions to better structure projects.",
  //   },
  //   {
  //     id: 2,
  //     question: "Is there a free trial available??",
  //     answer:
  //       "Invite your team members on Nook to work faster and collaborate easily together. Manage their permissions to better structure projects. Invite your team members on Nook to work faster and collaborate easily together. Manage their permissions to better structure projects.",
  //   },
  //   {
  //     id: 3,
  //     question: "Is there a free trial available?",
  //     answer:
  //       "Invite your team members on Nook to work faster and collaborate easily together. Manage their permissions to better structure projects. Invite your team members on Nook to work faster and collaborate easily together. Manage their permissions to better structure projects.",
  //   },
  // ];

  let [buttonIndex, setButtonIndex] = useState(0);
  let [buttonIndex2, setButtonIndex2] = useState(0);
  let [open, setOpen] = useState(false);
  let [open2, setOpen2] = useState(false);

  
  let handleAccordian = (i) => {
    setButtonIndex(i);
    if (open && buttonIndex === i) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  let handleSecondAccordian = (i) => {
    setButtonIndex2(i);
    if (open2 && buttonIndex2 === i) {
      setOpen2(false);
    } else {
      setOpen2(true);
    }
  };
  let type = requestType;
  return (
    <div>
      {type !== "categories" ? (
        <div className="border-b-2 border-[#6875911b] pb-4">
          <h3 className="text-[15px] text-[#2E333E] font-medium">
            {data?.jobTitle}
          </h3>
          <p className="text-[13px] font-medium mt-1 text-[#687591]">
            {data?.jobDescription}
          </p>
          <div className="flex gap-3 mt-3">
            <div className="bg-[#68759124] text-[11px] font-medium flex items-center rounded-md py-1 px-4">
              <h5 className="text-[#687591]">{data?.jobType && data?.jobType[0]}</h5>
            </div>
            <div className="bg-[#68759121] text-[11px] font-medium flex items-center rounded-md py-1 px-4">
              <h5 className="text-[#687591] flex w-[100%] items-center">
                <span className="mr-1">
                  <img src={map} alt="" />
                </span>
                {data?.jobLocation}
              </h5>
            </div>
            <div>
              <div className="">
                {/* <h5 className="text-[#687591]">{}</h5> */}
                <div
                  className={`${
                    data?.status == "Closed"
                      ? "bg-[#f9959572]"
                      : data?.status == "New"
                      ? "bg-[#1d4dde69]"
                      : "bg-[#95f9b181]"
                  } w-[62px] text-[11px] justify-center font-medium flex items-center rounded-md py-1 px-4`}
                >
                  <h5 className="text-[#687591]">{data?.status}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="sideDescription">
            {data?.categoryDescription}
          </p>

          {JSON.parse(questionData)?.length > 0 && (
            <div className="box-border-red mt-14 relative">
              {JSON.parse(questionData)?.map((e, i) => (
                <div
                  className={`my-2 py-1 px-2 ${
                    JSON.parse(questionData)?.length - 1 !== i ? "border-b" : ""
                  }`}
                  key={e.id}
                >
                  <div className="flex items-center mt-2 pb-1">
                    <div className="border  mr-2 inline-block rounded-xl p-1 cursor-pointer">
                      <img className="w-[8px] h-[8px]" src={close} alt="" />
                    </div>
                    <div className="flex w-[95%] items-center justify-between">
                      <div
                        onClick={() => handleAccordian(i)}
                        className="w-[95%] flex items-center justify-between"
                      >
                        <h2 className=" max-w-[100%] text-[14px]">
                          {e?.question}
                        </h2>
                      </div>
                      <div>
                        {open && buttonIndex === i ? (
                          <img
                            onClick={() => handleAccordian(i)}
                            className="w-[10px] cursor-pointer"
                            src={upArrow}
                            alt=""
                          />
                        ) : (
                          <img
                            onClick={() => handleAccordian(i)}
                            className="w-[10px] cursor-pointer"
                            src={downArrow}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div></div>
                  {open && buttonIndex == i ? (
                    <div>
                      <p className="ml-7 mt-3 text-[11px] font-medium text-textDescription">
                        {e.expectedAnswer}
                      </p>
                      <div className="flex gap-2 my-1 justify-end">
                        <button className="text-textDescription bg-bgDescription text-[11px] font-medium px-3 py-[2px] rounded-[3px]">Retake</button>
                        <button className="text-textDescription bg-bgDescription text-[11px] font-medium px-3 py-[2px] rounded-[3px]">Think Time</button>
                        <button className="text-textDescription bg-bgDescription text-[11px] font-medium px-3 py-[2px] rounded-[3px]">4 Minutes</button>
                      </div>
                    </div>
                  ) : (
                    <p className="ml-7 font-medium mt-3 text-[11px] text-textDescription truncate max-w-[75%]">
                      {e.expectedAnswer}
                    </p>
                  )}
                </div>
              ))}
              <p className="bg-[#EE626B] inline-block px-3 text-[10px] text-white border-none font-semibold absolute top-[-16px] left-[55px]">
                First impression
              </p>
            </div>
          )}

          {data?.technicalSkill?.length > 0 && (
            <div className="box-border-green mt-16 relative">
          
              {data?.technicalSkill?.map((e, i) => (
                <div
                  className={` my-2 py-1 px-2 ${
                    data?.technicalSkill.length - 1 == i ? "" : "border-b"
                  }`}
                  key={e.id}
                >
                  <div className="flex items-center mt-2 pb-1">
                    <div className="border  mr-2 inline-block rounded-xl p-1 cursor-pointer">
                      <img className="w-[8px] h-[8px]" src={close} alt="" />
                    </div>
                    <div className="flex items-center justify-between w-[100%]">
                      <div
                        className="w-[100%]"
                        onClick={() => handleSecondAccordian(i)}
                      >
                        <h2 className="w-[100%] text-[14px]">{e.question}</h2>
                      </div>
                      <div>
                        {open2 && buttonIndex2 == i ? (
                          <img
                            onClick={() => handleSecondAccordian(i)}
                            className="w-[10px] cursor-pointer"
                            src={upArrow}
                            alt=""
                          />
                        ) : (
                          <img
                            onClick={() => handleSecondAccordian(i)}
                            className="w-[10px] cursor-pointer"
                            src={downArrow}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {open2 && buttonIndex2 == i ? (
                    <div>
                    <p className="ml-7 mt-3 text-[11px] font-medium text-textDescription">
                      {e.answer}
                    </p>
                    <div className="flex gap-2 my-1 justify-end">
                      <button className="text-textDescription bg-bgDescription text-[11px] font-medium px-3 py-[2px] rounded-[3px]">Retake</button>
                      <button className="text-textDescription bg-bgDescription text-[11px] font-medium px-3 py-[2px] rounded-[3px]">Think Time</button>
                      <button className="text-textDescription bg-bgDescription text-[11px] font-medium px-3 py-[2px] rounded-[3px]">4 Minutes</button>
                    </div>
                  </div>
                  ) : (
                    <p className="ml-7 mt-3 text-[13px] text-[#687591] truncate max-w-[75%]">
                      {e.answer}
                    </p>
                  )}
                </div>
              ))}
              <p className="bg-[#7ACA7D] inline-block px-3 text-[10px] text-white border-none font-semibold absolute top-[-16px] left-[55px]">
                Technical Skill
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberSidecard;
