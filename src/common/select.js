const Select = ({ className, children, ...props }) => (
    <select
      className={`bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
  
  export default Select;