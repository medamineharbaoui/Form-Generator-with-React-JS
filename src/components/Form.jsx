import React from "react";
import { useSelector } from "react-redux";
import { selectForm } from "../slices/formSlice";
import FileSaver from "file-saver";

export const Form = () => {
  const form = useSelector(selectForm);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (form.length === 0) return <div></div>;
  const handleExportJSON = () => {
    const data = JSON.stringify(form);
    const blob = new Blob([data], { type: "application/json" });
    FileSaver.saveAs(blob, "form-data.json");
  };

  return (
    <form
      className="w-full max-w-md bg-slate-300 p-5 drop-shadow-md rounded-2xl mt-5"
      onSubmit={handleSubmit}
    >
      {form.map((item, i) => (
        <div key={i} className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor={item.name}
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              {item.label}
            </label>
          </div>
          <div className="md:w-2/3">
            {item.fieldType === "textarea" ? (
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id={item.name}
                name={item.name}
                placeholder={item.placeholder}
                required={item.required}
              />
            ) : item.type === "checkbox" || item.type === "radio" ? (
              <>
                {item.options?.map((opt, i) => (
                  <div key={i} className="flex items-center my-1">
                    <input
                      className="w-4 h-4 mr-5"
                      type={item.type}
                      id={opt.option}
                      value={opt.value}
                      name={item.name}
                    />
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor={opt.option}
                    >
                      {opt.option}
                    </label>
                    <br />
                  </div>
                ))}
              </>
            ) : item.type === "select" ? (
              <select
                name={item.name}
                id={item.type}
                className="bg-gray-200  border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              >
                {item.options?.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type={item.type}
                id={item.name}
                name={item.name}
                placeholder={item.placeholder}
                required={item.required}
              />
            )}
          </div>
        </div>
      ))}

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            submit
          </button>
        </div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={handleExportJSON}
          >
            Export to JSON
          </button>
        </div>
      </div>
    </form>
  );
};
