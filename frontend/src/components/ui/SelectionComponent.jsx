import React from 'react';

const SelectionComponent = ({ title, items, selectedItems, handleChange, titleKey }) => {
  return (
    <div className='mb-4'>
      <fieldset>
        <legend className='text-lg font-semibold'>{title}</legend>
        {items.map(item => (
          <div 
            className='flex flex-row justify-start items-center gap-2'
            key={item.id}>
            <input
              type="checkbox"
              id={`${title.toLowerCase()}-${item.id}`}
              checked={selectedItems.includes(item.id)}
              onChange={() => handleChange(item.id)}
            />
            <label htmlFor={`${title.toLowerCase()}-${item.id}`}>{item[titleKey]}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default SelectionComponent;