import { type ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";

type DroppableComponentProps = {
  id: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

const Droppable = ({
  id,
  disabled,
  className,
  children,
}: DroppableComponentProps) => {
  const { ref } = useDroppable({
    id,
    disabled,
  });

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default Droppable;
