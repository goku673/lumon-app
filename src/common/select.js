const Select = ({ className, options = [], ...props }) => (
  <select
    className={`bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
    {...props}
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;