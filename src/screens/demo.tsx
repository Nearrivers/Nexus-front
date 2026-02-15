import { useState } from "react";

import SmartTextEditor from "@/components/RichText.component";
import RichTextComponent from "@/components/RichText.component";
import TextAreaFieldComponent from "@/components/inputs/TextAreaField.component";

const DemoScreen = () => {
  const [text, setText] = useState("");

  return (
    <>
      <TextAreaFieldComponent
        id="test"
        label="Test rich"
        value={text}
        handleChange={setText}
      />
      <RichTextComponent text={text} patternName="damage" />;
    </>
  );
};

export default DemoScreen;
