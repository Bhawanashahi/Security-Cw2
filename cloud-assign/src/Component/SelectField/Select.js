import React from "react";
import { BiDownArrow } from "react-icons/bi";

const Select = ({
  showDropDown,
  selectedList,
  list,
  getDropdownData,
  onClickDropdownOption,
  label,
}) => {
  return (
    <div className="text-sm relative">
      <div className="pb-1">{label}</div>
      <div
        className="border w-full py-2.5 rounded-md px-2 border-gray-300 cursor-pointer outline-gray-300 flex justify-between items-center"
        onClick={getDropdownData}
      >
        {selectedList}
        <BiDownArrow className="text-lg" />
      </div>

      {showDropDown ? (
        <div className="absolute border w-full mt-1 rounded-md border-gray-400 mb-5 bg-gray-100 shadow-md z-50 h-40 overflow-auto">
          {list?.map((item) => {
            return (
              <div
                className=" cursor-pointer p-2 z-50 border-gray-400 border-b"
                key={item._id}
                onClick={(e) => {
                  return (
                    e.preventDefault(),
                    onClickDropdownOption(item.name, item._id)
                  );
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
