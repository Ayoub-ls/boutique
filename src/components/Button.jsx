import { cn } from "../lib/utils";

export default function Button({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  ...props 
}) {
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 border-transparent hover:shadow-lg hover:shadow-slate-900/10",
    outline: "bg-transparent border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm",
    ghost: "bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50",
    secondary: "bg-white text-slate-900 border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-12 py-4 text-base",
    icon: "p-2",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 border rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
