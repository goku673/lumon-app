export function Badge({ variant = "default", className = "", children, ...props }) {
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "text-gray-950 border border-gray-200 hover:bg-gray-100 hover:text-gray-900",
    }
  
    return (
      <div
        className={`inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
  