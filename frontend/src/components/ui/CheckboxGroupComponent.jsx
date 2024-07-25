import React from 'react';

const CheckboxGroupComponent = ({ label, items, selectedItems, setSelectedItems, itemLabelKey }) => {
  const handleItemChange = (itemId) => {
    const newSelectedItems = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <div className='mt-1'>
        {items.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={`${label.toLowerCase()}-${item.id}`}
              value={item.id}
              checked={selectedItems.includes(item.id)}
              onChange={() => handleItemChange(item.id)}
              className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
            />
            <label htmlFor={`${label.toLowerCase()}-${item.id}`} className='ml-3 text-sm text-gray-600'>
              {item[itemLabelKey]}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroupComponent;