    const Input = ({className,...props}) => (
        <input
         className={`bg-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
         {...props}
        />
    );

    export default Input;

