import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useSelector, useDispatch } from "react-redux";
import {
  selectForm,
  updateFormField,
  deleteFormField,
  updateOption,
  addOption,
  removeOptionByIndex,
  addForm,
} from "../slices/formSlice";
export const FormFields = () => {
  const form = useSelector(selectForm);
  const dispatch = useDispatch();
  const [draggedItem, setDraggedItem] = useState(null);
  const updateOptionFields = (e, opt, optionIndex, itemIndex) => {
    const updatedOption = {
      ...opt,
      [e.target.id]: e.target.value,
    };
    dispatch(
      updateOption({
        updatedOption,
        optionIndex,
        itemIndex,
      })
    );
  };

  // Define a function to handle drag and drop events
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    const newList = [...form];
    newList.splice(source.index, 1);
    newList.splice(destination.index, 0, draggedItem);
    //form = newList;
    dispatch(addForm(newList));
  };
  const handleDragStart = (result) => {
    setDraggedItem(form[result.source.index]);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={handleDragStart}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {form.map((item, i) => (
              <Draggable key={item} draggableId={`item-${i}`} index={i}>
                {(provided, snapshot) => (
                  <form
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={i}
                    className="w-full max-w-md bg-slate-300 p-5 drop-shadow-md rounded-2xl my-5"
                  >
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="Label"
                        >
                          Label
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="label"
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            dispatch(
                              updateFormField({
                                updatedField: {
                                  ...item,
                                  [e.target.id]: e.target.value,
                                },
                                index: i,
                              })
                            );
                          }}
                        />
                      </div>
                    </div>
                    {!(
                      item.fieldType === "date" ||
                      item.type === "checkbox" ||
                      item.type === "select" ||
                      item.type === "radio"
                    ) && (
                      <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                          <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="placeholder"
                          >
                            Placeholder
                          </label>
                        </div>
                        <div className="md:w-2/3">
                          <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="placeholder"
                            type="text"
                            placeholder="placeholder"
                            value={item.placeholder}
                            onChange={(e) => {
                              dispatch(
                                updateFormField({
                                  updatedField: {
                                    ...item,
                                    [e.target.id]: e.target.value,
                                  },
                                  index: i,
                                })
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="type"
                        >
                          Name
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="name"
                          name="name"
                          placeholder="Name"
                          value={item.name}
                          onChange={(e) => {
                            dispatch(
                              updateFormField({
                                updatedField: {
                                  ...item,
                                  [e.target.id]: e.target.value,
                                },
                                index: i,
                              })
                            );
                          }}
                        />
                      </div>
                    </div>
                    {["select", "checkbox", "radio"].includes(item.type) &&
                      item.options.map((opt, optIndex) => (
                        <div
                          key={optIndex}
                          className="md:flex md:items-center mb-6"
                        >
                          <div className="md:w-1/3">
                            <input
                              onChange={(e) => {
                                updateOptionFields(e, opt, optIndex, i);
                              }}
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="option"
                              value={opt.option}
                              name="name"
                              placeholder="Option"
                            />
                          </div>
                          <div className="md:w-1/6"></div>
                          <div className="md:w-1/3">
                            <input
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="value"
                              value={opt.value}
                              name="name"
                              placeholder="Value"
                              onChange={(e) => {
                                updateOptionFields(e, opt, optIndex, i);
                              }}
                            />
                          </div>
                          <div className="md:flex md:items-center">
                            <div
                              onClick={() =>
                                dispatch(
                                  addOption({
                                    newOption: {
                                      value: "",
                                      option: "",
                                      checked: false,
                                    },
                                    index: i,
                                  })
                                )
                              }
                              className="md:w-1/6 ml-10 text-2xl font-bold text-purple-500 hover:text-purple-400 cursor-pointer"
                            >
                              +
                            </div>
                            {item.options.length > 1 && (
                              <div
                                onClick={() =>
                                  dispatch(
                                    removeOptionByIndex({
                                      itemIndex: i,
                                      optionIndex: optIndex,
                                    })
                                  )
                                }
                                className="md:w-1/6 ml-10 text-xl font-bold text-purple-500 hover:text-purple-400 cursor-pointer"
                              >
                                x
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3"></div>
                      <label className="md:w-2/3 block text-gray-500 font-bold">
                        <input
                          className="mr-2 leading-tight"
                          type="checkbox"
                          onChange={(e) => {
                            dispatch(
                              updateFormField({
                                updatedField: {
                                  ...item,
                                  required: e.target.checked,
                                },
                                index: i,
                              })
                            );
                          }}
                        />
                        <span className="text-sm">Required</span>
                      </label>
                      <div className="md:w-2/3">
                        <button
                          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="button"
                          onClick={(e) => {
                            dispatch(
                              deleteFormField({
                                field: item,
                                index: i,
                              })
                            );
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
