import React, { useState } from "react";
import { toast } from "react-toastify";

const CharacteristicsInputs = ({inputs, setInputs, setFormData, formData, currentProduct}) => {
  //characteristics inputs handling

  const [inputsKeyValues, setInputsKeyValues] = useState(Object.entries(formData.characteristics).map(([key, value]) => ({ key, value })));
  

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
    const obj = inputs.reduce((acc, { key, value }) => {
      if (key) acc[key] = value;
      return acc;
    }, {});
    setFormData({...formData, characteristics: obj});
  };

  const handleEditInput = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputsKeyValues];
    newInputs[index][name] = value;
    setInputsKeyValues(newInputs);
    const newObj = inputsKeyValues.reduce((acc, { key, value }) => {
      if (key) acc[key] = value;
      return acc;
    }, {});
    setFormData({...formData, characteristics: newObj});
  };

  const handleAddInput = () => {
    setInputs([...inputs, { key: "", value: "" }]);
    setInputsKeyValues([...inputsKeyValues, { key: "", value: "" }]);
  };

  const handleRemoveInput = (index) => {
    if(index < 2) {
      toast.error('You must have at least 2 characteristics lines.');
      return
    } else {
      setInputs(inputs.filter((_, i) => i !== index));
      setInputsKeyValues(inputsKeyValues.filter((_, i) => i !== index));
      setFormData({...formData, characteristics: inputsKeyValues.filter((_, i) => i !== index)});
    }
  };

  return (
    <div className="flex flex-col overflow-scroll h-[140px] gap-2 p-2 outline-2 w-full bg-neutral-600 text-white outline-neutral-500 rounded-2xl">
      <div className="flex items-center justify-between">
        <p className="text-white text-lg">Characteristics</p>
        <p
          onClick={handleAddInput}
          className="p-2 bg-neutral-800 outline-2 outline-fuchsia-600 rounded-2xl text-white font-bold cursor-pointer"
        >
          Add line
        </p>
      </div>
      {currentProduct !== null ? (
        inputsKeyValues.map((input, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              onChange={(event) => handleEditInput(index, event)}
              type="text"
              name="key"
              value={input.key}
              placeholder="Detail"
              className="p-2 w-1/4 outline-2 bg-neutral-600 text-white outline-neutral-500 rounded-2xl"
            />
            -
            <input
              onChange={(event) => handleEditInput(index, event)}
              type="text"
              name="value"
              value={input.value}
              placeholder="Characteristic"
              className="p-2 outline-2 w-full bg-neutral-600 text-white outline-neutral-500 rounded-2xl"
            />
            <p
              onClick={() => handleRemoveInput(index)}
              className="p-2  text-white font-bold cursor-pointer"
            >
              &times;
            </p>
          </div>
        ))
      ) : (
        inputs.map((input, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              onChange={(event) => handleInputChange(index, event)}
              type="text"
              name="key"
              required
              value={input.key}
              placeholder="Detail"
              className="p-2 w-1/4 outline-2 bg-neutral-600 text-white outline-neutral-500 rounded-2xl"
            />
            -
            <input
              onChange={(event) => handleInputChange(index, event)}
              type="text"
              name="value"
              value={input.value}
              required
              placeholder="Characteristic"
              className="p-2 outline-2 w-full bg-neutral-600 text-white outline-neutral-500 rounded-2xl"
            />
            <p
              onClick={() => handleRemoveInput(index)}
              className="p-2  text-white font-bold cursor-pointer"
            >
              &times;
            </p>
          </div>
      )))}     
    </div>
  );
};

export default CharacteristicsInputs;
