import { useState } from "react";
import { useTranslation } from "react-i18next";

import SearchComponent from "@/components/inputs/Search.component";
import TagFilterComponents from "@/screens/auth/home/components/TagFilters.component";

const HomeScreen = () => {
  const { t } = useTranslation("home");

  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <SearchComponent
        placeholder={t("search.placeholder")}
        value={search}
        handleChange={(value) => setSearch(value)}
      />
      <TagFilterComponents />
    </div>
  );
};

export default HomeScreen;
