import React from "react";
import { addForm } from "../slices/formSlice";
import { useDispatch } from "react-redux";
export const Header = () => {
  const Dispatch = useDispatch();
  function handleFileInputChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const jsonData = JSON.parse(event.target.result);
      Dispatch(addForm(jsonData));
    };

    reader.readAsText(file);
  }
  return (
    <header className="w-full h-16 bg-slate-400 flex items-center justify-between">
      <span className="font-bold text-2xl text-stone-800 pl-10">
        ARSELA Form Builder
      </span>
      <label for="file-input" className="custom-file-upload pr-10">
        <div className="md:w-3/3 ">
          <input id="file-input" type="file" onChange={handleFileInputChange} />
          <span className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Import JSON Form
          </span>
        </div>
      </label>
    </header>
  );
};
