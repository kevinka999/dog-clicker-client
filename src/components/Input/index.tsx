import { twMerge } from "tailwind-merge";

type InputProps = {
  type: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  helperText?: string;
};

export const Input = ({ className, helperText, ...props }: InputProps) => {
  const classes = twMerge("p-2 rounded-md", className);

  return (
    <div className="flex flex-col gap-1">
      <input className={classes} {...props} />
      {helperText ? (
        <span className="text-xs text-yellow-500">{helperText}</span>
      ) : (
        <></>
      )}
    </div>
  );
};
