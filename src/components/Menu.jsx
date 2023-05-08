import React from "react";
import { useDispatch } from "react-redux";
import { addFormField } from "../slices/formSlice";

export const Menu = () => {
  const fields = [
    "Text Field",
    "Text Area",
    "Chekbox",
    "Select Input",
    "Radio Button",
    "Email",
    "Password",
    "Number",
    "Date",
  ];

  const dispatch = useDispatch();

  const handleClick = (field) => {
    switch (field) {
      case "Text Field":
        dispatch(
          addFormField({
            fieldType: "Text Field",
            type: "text",
            name: "",
            label: "Text Field",
            required: false,
            placeholder: "Text Field",
          })
        );
        break;
      case "Text Area":
        dispatch(
          addFormField({
            fieldType: "Text Area",
            type: "text",
            name: "",
            label: "Text Area",
            required: false,
            placeholder: "Text Area",
          })
        );
        break;
      case "Chekbox":
        dispatch(
          addFormField({
            fieldType: "Checkbox",
            type: "checkbox",
            label: "Checkbox",
            name: "",
            required: false,
            options: [
              {
                option: "",
                value: "",
                checked: false,
              },
            ],
          })
        );
        break;
      case "Select Input":
        dispatch(
          addFormField({
            fieldType: "Select Input",
            type: "select",
            label: "Select Input",
            name: "",
            required: false,
            options: [
              {
                option: "",
                value: "",
                checked: false,
              },
            ],
          })
        );
        break;
      case "Radio Button":
        dispatch(
          addFormField({
            fieldType: "Radio Button",
            type: "radio",
            label: "Radio Button",
            name: "",
            required: false,
            options: [
              {
                option: "",
                value: "",
                checked: false,
              },
            ],
          })
        );
        break;
      case "Email":
        dispatch(
          addFormField({
            fieldType: "Email",
            type: "email",
            name: "",
            label: "Email",
            required: false,
            placeholder: "johndoe@gmail.com",
          })
        );
        break;
      case "Password":
        dispatch(
          addFormField({
            type: "password",
            fieldType: "Password",
            name: "",
            label: "Password",
            required: false,
            placeholder: "Password",
          })
        );
        break;
      case "Number":
        dispatch(
          addFormField({
            fieldType: "Number",
            type: "number",
            name: "",
            label: "Number",
            required: false,
            placeholder: "Number",
          })
        );
        break;
      case "Date":
        dispatch(
          addFormField({
            fieldType: "Date",
            type: "date",
            name: "",
            label: "Date",
            required: false,
          })
        );
        break;
      default:
        break;
    }
  };

  return (
    <nav className="mt-10 ml-10">
      <ul className="flex flex-col space-y-5">
        {fields.map((field, i) => (
          <li
            key={i}
            className="font-semibold text-lg cursor-pointer hover:text-neutral-500"
            onClick={() => handleClick(field)}
          >
            {field}
          </li>
        ))}
      </ul>
    </nav>
  );
};
