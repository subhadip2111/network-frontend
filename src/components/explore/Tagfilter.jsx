const allTags = [
  'AI',
  'Web3',
  'Side Hustle',
  'No Degree',
  'Student Startup',
  'HealthTech',
  '30+ Builder',
  'Govt Exam Hack',
  'B2B Product',
  'Creator Economy',
];

const TagFilter = ({ selectedTags, onChange }) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition border
            ${
              selectedTags.includes(tag)
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
            }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
