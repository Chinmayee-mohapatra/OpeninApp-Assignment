import React, { useRef, useState } from "react";
import Papa from "papaparse";
import ColumnData from "./ColumnData";
import { useSelector } from "react-redux";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const Body = () => {
  const [row, setRow] = useState([]);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const fileInputRef = useRef(null);

  const user = useSelector((store) => store.user.displayName);

  // handle file upload
  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object?.keys(d));
          valuesArray.push(Object?.values(d));
        });

        // Parsed Data Response in array format
        setData(results?.data);
        // Filtered Column Names
        setRow(rowsArray[0]);
        // Filtered Values
        setColumns(valuesArray);
      },
    });
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-[#F8FAFF] h-full">
      <div className="flex justify-between px-10 py-8">
        <h3 className="text-2xl font-semibold">Upload CSV</h3>
        <div className="flex items-center gap-4">
          <IoNotifications size={24} />
          <p className="flex gap-2">
            <FaUser size={20} /> {user}
          </p>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center">
        {
          <div
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) {
                handleFileUpload(file);
              }
            }}
            className={` w-2/3 h-1/5 sm:w-1/2 sm:h-full bg-white rounded-md p-4 flex flex-col justify-end gap-4`}
          >
            <div className="h-full flex flex-col items-center justify-center gap-1 border border-dashed rounded-md">
              <span>
                <RiFileExcel2Fill fill="#1c6923" size={28} />
              </span>
              <p>
                Drop your excel sheet here or
                <span
                  onClick={handleButtonClick}
                  className="text-[#605BFF] font-medium cursor-pointer"
                >
                  {" "}
                  browse
                </span>
              </p>
            </div>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={(e) => {
                e.preventDefault();
                handleFileUpload(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />
            <button
              onClick={() => {
                handleButtonClick();
              }}
              className={`${
                data.length !== 0 && "bg-[#8a86f5]"
              } w-full bg-[#605BFF] hover:bg-[#4c48cb] gap-2 text-white py-2 px-4 font-semibold rounded-md shadow-sm hover:shadow-md duration-200 flex items-center justify-center`}
            >
              <MdOutlineFileUpload size={22} />
              Upload
            </button>
          </div>
        }

        {data && (
          <div
            className={`my-10 md:my-20 w-full ${
              columns.length !== 0 ? "overflow-scroll " : ""
            } px-2 py-1 sm:p-5 md:p-10 `}
          >
            <div className="flex font-semibold text-start capitalize ">
              {row.map((rows, index) => {
                return (
                  <div
                    key={index}
                    className=" w-2/3 flex gap-2 justify-between md:w-1/5"
                  >
                    {rows}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col ">
              {columns.map((value, index) => (
                <div key={index} className=" py-1">
                  <ColumnData value={value} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
