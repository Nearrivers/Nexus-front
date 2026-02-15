import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type H4TypoProps = {
  children: ReactNode;
  className: string;
};

const H4Typo = (props: H4TypoProps) => {
  const { children, className } = props;

  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
};

export default H4Typo;
