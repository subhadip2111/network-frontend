const InspirationCard = ({ data }) => {
  return (
    <div className="bg-gradient-to-tr from-green-800 to-blue-900 rounded-xl p-5 border border-green-700 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-1">{data.title}</h3>
      <p className="text-gray-200 text-sm mb-3">{data.story}</p>
      <p className="text-xs text-green-300 italic">
        {data.outcome}
      </p>
    </div>
  );
};

export default InspirationCard;
