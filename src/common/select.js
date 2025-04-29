import Option from "./option";

const Select = ({ className, options = [], ...props }) => (
  <select
    className={`bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:text-black ${className}`}
    {...props}
  >
    {options.map((option, index) => (
      <Option key={index} value={option.value} label={option.label} className="" />
    ))}
  </select>
);

export default Select;