import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type SearchComponentProps = ComponentProps<"input"> & {
  value?: string;
  handleChange: (value: string) => void;
};

const SearchComponent = (props: SearchComponentProps) => {
  const { value, handleChange, placeholder } = props;

  const { t } = useTranslation("global");

  return (
    <div className="bg-secondary border border-border  flex rounded-md items-center p-2">
      <Search className="text-muted-foreground" />
      <Input
        className="border-none! bg-transparent! ring-transparent! text-lg! font-medium placeholder:text-lg placeholder:font-medium"
        placeholder={placeholder || t("search")}
        value={value}
        onChange={(evt) => handleChange(evt.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
