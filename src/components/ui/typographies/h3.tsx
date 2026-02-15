import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type H3TypoProps = {
  children: ReactNode;
  className?: string;
};

const H3Typo = (props: H3TypoProps) => {
  const { children, className } = props;

  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
};

export default H3Typo;
