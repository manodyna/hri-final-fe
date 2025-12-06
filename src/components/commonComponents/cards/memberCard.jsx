import React, { useState } from "react";
import bookmark from "../../../assets/bookmark.png";
import map from "../../../assets/map.png";
import style from "../cards/memberCard.css";

export const MemberCard = ({ bg, data, requestType }) => {
  let [clickedBg, setClickedBg] = useState(false);
  let [save, setSave] = useState(false);
  console.log(bg)
  let type = requestType;
  return (
    <div>
      <div onClick={()=>setClickedBg(true)} className={`main-box transition-colors duration- ${data.categoryId == bg ||data[0] == bg? 'bg-slate-100' : 'bg-white'}`}>
        <div className="dashed-border relative">
          <h3 className="title">{data.categoryName || data[1]}</h3>
          <p className="description">{data.categoryDescription || data[2]}</p>
          <div onClick={() => setSave(!save)} className={`absolute top-[0] right-0 p-1 ${save ? 'border rounded-xl bg-slate-200' :''} cursor-pointer`}>
            <img
              className="w-[12px]"
              src={bookmark}
              alt=""
            />
          </div>
        </div>
        <div className="btn-main-box">
          <div className="left-btns">
            <div className="bg-[#68759124] text-[11px] font-medium flex items-center rounded-md py-1 px-4">
              {type == "categories" ? (
                <h5 className="text-[#687591]">{'Must'}</h5>
              ) : (
                <h5 className="text-[#687591]">{data[4]}</h5>
              )}
            </div>
            <div className="bg-[#68759121] text-[11px] font-medium flex items-center rounded-md py-1 px-4">
              <h5 className="text-[#687591] flex w-[100%] items-center">
                {type == "categories" ? (
                  <div>{`Optional`}</div>
                ) : (
                  <div className="flex items-center">
                    <span className="mr-1">
                      <img src={map} alt="" />
                    </span>
                    {data[3]}
                  </div>
                )}
              </h5>
            </div>
          </div>
          <div>
            {type == "categories" ? (
              ""
            ) : (
              <div
                className={`${
                  data[5] == "Closed"
                    ? "bg-[#f9959572]"
                    : data[5].statusName == "New"
                    ? "bg-[#1d4dde69]"
                    : "bg-[#95f9b181]"
                } w-[62px] text-[11px] justify-center font-medium flex items-center rounded-md py-1 px-4`}
              >
                <h5 className="text-[#687591]">{data[5]}</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
