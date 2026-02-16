import { type ReactNode } from "react";
import { useDraggable } from "@dnd-kit/react";

type DraggableComponentProps = {
  id: string;
  children: ReactNode;
};

const Draggable = ({ id, children }: DraggableComponentProps) => {
  const { ref } = useDraggable({
    id,
  });

  return <div ref={ref}>{children}</div>;
};

export default Draggable;
