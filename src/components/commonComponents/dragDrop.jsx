import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const DragDrop = (props) => {
  // console.log("props resume --->", props);
  const [resume, setResume] = useState();

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  useEffect(() => {
    handleData();
  }, [acceptedFiles]);

  let handleData = () => {
    if (acceptedFiles[0]) {
      if (acceptedFiles[0]?.type == "application/pdf") {
        console.log("resume -->", acceptedFiles[0].name);
        props.setData(acceptedFiles[0]);
      }
    } else {
      console.log("data not available");
    }
  };

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input value={props.data} className="input-zone" {...getInputProps()} />
      <div
        className={`text-center text-${
          acceptedFiles[0]?.type == "application/pdf" ? "black" : "blue"
        }`}
      >
        <div
          className="dropzone-content cursor-pointer"
          onChange={() => setResume(acceptedFiles[0])}
        >
          {/* 'black' : 'blue' */}
          {acceptedFiles[0] ? (
            acceptedFiles[0]?.type == "application/pdf" ? (
              <div className="">{acceptedFiles[0]?.name}</div>
            ) : (
              ""
            )
          ) : (
            "Upload your resume here"
          )}
          <h6 className="text-red-600">
            {acceptedFiles[0]
              ? acceptedFiles[0]?.type == "application/pdf"
                ? ""
                : "please Enter pdf file"
              : ""}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
