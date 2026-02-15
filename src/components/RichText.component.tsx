import { type ComponentProps, type JSX } from "react";

import {
  PATTERN_CONFIGS,
  type PatternName,
} from "@/store/common/textEditor.model";

type RichTextComponentProps = ComponentProps<"p"> & {
  text: string;
  patternName: PatternName;
};

const RichTextComponent = ({
  text,
  patternName,
  ...props
}: RichTextComponentProps) => {
  const { regex, formatMatch } = PATTERN_CONFIGS.get(patternName)!;

  const parseText = () => {
    const regexp = regex();
    const parts: JSX.Element[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regexp.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${key++}`}>
            {text.slice(lastIndex, match.index)}
          </span>,
        );
      }

      parts.push(formatMatch(match));
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(<span key={`text-${key++}`}>{text.slice(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : text;
  };

  return <p {...props}>{parseText()}</p>;
};

export default RichTextComponent;
