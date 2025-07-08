const tabs = [
  { label: 'Startups', value: 'startup' },
  { label: 'Product Demos', value: 'demo' },
  { label: 'Creative Ideas', value: 'idea' },
  { label: 'Inspiring Stories', value: 'inspiration' },
];

const CategoryTabs = ({ active, onChange }) => {
  return (
    <div className="flex gap-3 mb-4">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition 
            ${
              active === tab.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
