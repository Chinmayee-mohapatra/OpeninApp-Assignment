import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const ColumnData = ({ value }) => {
  const [tags, setTags] = useState([]);
  const [selectTags, setSelectTags] = useState(false);

  const options = value[3].split(",")?.map((option) => ({
    value: option,
    label: option,
  }));

  const handleOptionClick = (option) => {
    const isSelected = tags.some((selected) => selected.value === option.value);
    if (!isSelected) {
      setTags([...tags, option]);
    }
  };

  const handleTagButtonClick = (tagName) => {
    setTags(tags.filter((obj) => obj.value !== tagName));
    console.log(tags);
  };

  const handleShowDropDown = () => {
    setSelectTags(!selectTags);
  };

  return (
    <div className="flex justify-around gap-2 w-full h-max text-sm md:text-base">
      <p className="w-1/8 md:w-1/5">{value[0]}</p>
      <p className="w-1/5">
        <a
          href={"https://www." + value[1]}
          rel="noreferrer"
          target="_blank"
          className="text-blue-600 underline text-wrap"
        >
          {value[1]}
        </a>
      </p>
      <p className="w-1/5">{value[2]}</p>
      {/* Custom Drop-down */}
      <div className="w-1/5 flex flex-col relative">
        <div className="flex z-0">
          Select tags{" "}
          {!selectTags ? (
            <button onClick={handleShowDropDown}>
              <MdOutlineKeyboardArrowDown size={24} />
            </button>
          ) : (
            <button onClick={handleShowDropDown}>
              <MdOutlineKeyboardArrowUp size={24} />
            </button>
          )}
        </div>
        {selectTags && (
          <div className="absolute top-8 z-10 h-[100px] bg-[#F8FAFF] bg-opacity-90 flex flex-col overflow-y-scroll no-scrollbar border-[1px] border-slate-900 rounded-lg shadow-md">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-2 py-1 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Selected tags */}
      <div className="w-1/5 px-2 flex flex-wrap">
        {tags &&
          tags?.map((tag) => (
            <div className=" px-2 m-[1px] flex items-center bg-slate-400">
              {tag.value}
              <button
                onClick={() => handleTagButtonClick(tag.value)}
                className="ml-1 bg-slate-300 px-1 my-1"
              >
                x
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColumnData;
