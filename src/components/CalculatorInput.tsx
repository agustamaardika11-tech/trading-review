import React from 'react';

interface CalculatorInputProps {
  label: string;
  id: string;
  type?: 'text' | 'number' | 'select';
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  label,
  id,
  type = 'number',
  value,
  onChange,
  placeholder,
  options,
  min,
  max,
  step,
}) => {
  const baseClasses =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 shadow-sm transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20';

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      {type === 'select' && options ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClasses}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={baseClasses}
        />
      )}
    </div>
  );
};

export default CalculatorInput;
