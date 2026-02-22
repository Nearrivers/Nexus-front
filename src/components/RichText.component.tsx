import { Fragment, type ComponentProps } from "react";

import {
  PATTERNS_CONFIG,
  type TextEditorPatternConfigModel,
} from "@/store/common/textEditor.model";

type RichTextComponentProps = ComponentProps<"p"> & {
  text: string;
};

type Match = {
  config: TextEditorPatternConfigModel;
  match: RegExpMatchArray;
  index: number;
  end: number;
};

const RichTextComponent = ({ text, ...props }: RichTextComponentProps) => {
  const parseText = () => {
    const parts = [];

    // 1. Collecter tous les matches de toutes les regex
    const allMatches: Match[] = [];

    PATTERNS_CONFIG.forEach((config) => {
      const regex = config.regex();
      let match;

      while ((match = regex.exec(text)) !== null) {
        allMatches.push({
          config,
          match,
          index: match.index,
          end: match.index + match[0].length,
        });
      }
    });

    // 2. Trier par ordre d'apparition
    allMatches.sort((a, b) => a.index - b.index);

    // 3. Construire les parts
    let lastIndex = 0;
    let key = 0;

    allMatches.forEach((item) => {
      // Texte avant le match
      if (item.index > lastIndex) {
        parts.push(
          <span key={`text-${key++}`}>
            {text.slice(lastIndex, item.index)}
          </span>,
        );
      }

      // Le match (éviter les chevauchements)
      if (item.index >= lastIndex) {
        parts.push(
          <Fragment key={`match-${key++}`}>
            {item.config.formatMatch(item.match)}
          </Fragment>,
        );
        lastIndex = item.end;
      }
    });

    // Texte restant
    if (lastIndex < text.length) {
      parts.push(<span key={`text-${key++}`}>{text.slice(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : text;
  };

  // const parseText = () => {
  //   const regexp = regex();
  //   const parts: JSX.Element[] = [];
  //   let lastIndex = 0;
  //   let match;
  //   let key = 0;
  //
  //   while ((match = regexp.exec(text)) !== null) {
  //     if (match.index > lastIndex) {
  //       parts.push(
  //         <span key={`text-${key++}`}>
  //           {text.slice(lastIndex, match.index)}
  //         </span>,
  //       );
  //     }
  //
  //     parts.push(formatMatch(match));
  //     lastIndex = match.index + match[0].length;
  //   }
  //
  //   if (lastIndex < text.length) {
  //     parts.push(<span key={`text-${key++}`}>{text.slice(lastIndex)}</span>);
  //   }
  //
  //   return parts.length > 0 ? parts : text;
  // };

  return (
    <p role="textbox" {...props}>
      {parseText()}
    </p>
  );
};

export default RichTextComponent;
