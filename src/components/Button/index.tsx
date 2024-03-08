import { twMerge } from "tailwind-merge";

type ButtonProps = {
  type: "button" | "submit";
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
};

export const Button = ({ className, children, ...props }: ButtonProps) => {
  const classes = twMerge(
    "p-2 rounded-md border-2 border-brown-400 bg-brown-200 text-white hover:bg-brown-400 active:bg-brown-400",
    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
