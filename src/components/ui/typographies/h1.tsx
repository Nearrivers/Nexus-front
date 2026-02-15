import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type H1TypoProps = {
  children: ReactNode;
  className?: string;
};

const H1Typo = (props: H1TypoProps) => {
  const { children, className } = props;

  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default H1Typo;
