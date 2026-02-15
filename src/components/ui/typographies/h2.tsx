import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type H2TypoProps = {
  children: ReactNode;
  className: string;
};

const H2Typo = (props: H2TypoProps) => {
  const { children, className } = props;

  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default H2Typo;
