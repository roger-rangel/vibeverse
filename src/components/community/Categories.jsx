import React, { useState } from 'react';

const categories = [
  { id: 1, initials: 'AI Music', bgColor: 'bg-pink-600' },
  { id: 2, initials: 'AI Films', bgColor: 'bg-purple-600' },
  { id: 3, initials: 'AI Trailers', bgColor: 'bg-yellow-500' },
  { id: 4, initials: 'AI and 3D', bgColor: 'bg-green-500' },
  { id: 5, initials: 'Learn AI', bgColor: 'bg-orange-600' },
  { id: 6, initials: 'AI Ads', bgColor: 'bg-blue-600' },
  { id: 7, initials: 'AI Gaming', bgColor: 'bg-slate-500' },
  { id: 8, initials: 'AI and VR/AR', bgColor: 'bg-fuchsia-500' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Categories() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (id) => {
    setSelectedCategories((current) => {
      if (current.includes(id)) {
        return current.filter((categoryId) => categoryId !== id);
      } else {
        return [...current, id];
      }
    });
  };

  return (
    <div>
      <label
        htmlFor="username"
        className="block text-sm font-medium leading-6 text-white"
      >
        Choose a Category:
      </label>
      <ul role="list" className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <li 
            key={category.id} 
            className={classNames(
              "flex rounded-md shadow-sm border-2",
              selectedCategories.includes(category.id) ? "border-2 border-gray-200" : "border-transparent"
            )}
            onClick={() => toggleCategory(category.id)}
          >
            <div
              className={classNames(
                category.bgColor,
                'flex h-7 w-full flex-shrink-0 items-center justify-center rounded text-sm font-medium text-white'
              )}
            >
              {category.initials}
            </div> 
          </li>
        ))}
      </ul>
    </div>
  );
}
