import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formFields: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormField: (state, action) => {
      state.formFields = [...state.formFields, action.payload];
    },
    updateFormField: (state, action) => {
      state.formFields = state.formFields.map((field, i) =>
        action.payload.index === i ? action.payload.updatedField : field
      );
    },
    deleteFormField: (state, action) => {
      state.formFields = state.formFields.filter(
        (_, i) => action.payload.index !== i
      );
    },
    addOption: (state, action) => {
      state.formFields = state.formFields.map((field, i) =>
        action.payload.index === i
          ? { ...field, options: [...field.options, action.payload.newOption] }
          : field
      );
    },
    removeOptionByIndex: (state, action) => {
      state.formFields = state.formFields.map((field, i) =>
        action.payload.itemIndex === i
          ? {
              ...field,
              options: field.options.filter(
                (_, j) => j !== action.payload.optionIndex
              ),
            }
          : field
      );
    },
    addForm: (state, action) => {
      console.log(state.formFields);
      console.log(action.payload);
      state.formFields = action.payload;
    },
    updateOption: (state, action) => {
      const editOption = (item) => {
        const editedOptions = item.options?.map((opt, i) =>
          i === action.payload.optionIndex
            ? { ...opt, ...action.payload.updatedOption }
            : opt
        );
        return { ...item, options: editedOptions };
      };

      state.formFields = state.formFields.map((field, i) =>
        action.payload.itemIndex === i ? editOption(field) : field
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addFormField,
  addForm,
  updateFormField,
  deleteFormField,
  updateOption,
  addOption,
  removeOptionByIndex,
} = formSlice.actions;

// Form Selector
export const selectForm = (state) => state.form.formFields;

export default formSlice.reducer;
