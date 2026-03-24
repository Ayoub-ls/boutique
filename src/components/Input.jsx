import { cn } from "../lib/utils";

export default function Input({ 
  label, 
  error, 
  className, 
  ...props 
}) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-xs font-bold uppercase tracking-widest text-slate-900">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full bg-transparent border-b border-slate-200 py-3 text-sm focus:outline-none focus:border-slate-900 transition-colors placeholder:text-slate-400",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-[10px] text-red-500 font-medium uppercase tracking-wider">
          {error}
        </p>
      )}
    </div>
  );
}
