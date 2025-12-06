import React from "react";
import bookmark from "../../assets/bookmark.png";

export const MemebersCard = () => {
  return (
    <div>
      <div className="bg-[white] drop-shadow-md px-7 py-4">
        <div className="border-b-2 border-dashed pb-3  border-[#68759120]">
          <h3 className="text-[15px] font-medium relative">Product Designer</h3>
          <p className="text-[13px] font-medium mt-1 text-[#687591]">
            Invite your team members on Nook to work faster and collaborate
            easily together. Manage their permissions to better structure
            projects.
          </p>
          <img className="absolute top-[50%]" src={bookmark} alt="" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-3 ">
            <div className="bg-[#68759124] text-[11px] font-medium flex items-center rounded-md py-1 px-4">
              Full Time
            </div>
            <div className="bg-[#68759121] text-[11px] font-medium flex items-center rounded-md py-1 px-4">
              Sanfransisco
            </div>
          </div>
          <div>
            <div className="bg-[#f995957c] text-[11px] font-medium flex items-center rounded-md py-1 px-4">closed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
