import { type ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";

type DroppableComponentProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

const Droppable = ({ id, className, children }: DroppableComponentProps) => {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default Droppable;
