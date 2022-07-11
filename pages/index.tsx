import type { NextPage } from "next";

import { useState } from "react";
import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Search } from "tabler-icons-react";

import Layout from "components/Layout";
import { useSearch } from "hooks/useSearch";

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 1000);
  const { data, isLoading, isFetching } = useSearch(debouncedValue);

  return (
    <Layout>
      <TextInput
        placeholder="Search image here..."
        icon={<Search size={14} />}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </Layout>
  );
};

export default Home;
