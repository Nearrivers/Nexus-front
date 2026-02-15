import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ParagraphTypoProps = {
  className?: string;
  children: ReactNode;
};

const ParagraphTypo = (props: ParagraphTypoProps) => {
  const { children, className } = props;

  return <p className={cn("leading-7", className)}>{children}</p>;
};

export default ParagraphTypo;
