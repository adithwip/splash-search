import type { NextPage } from "next";

import { useState } from "react";
import Image from "next/image";
import {
  TextInput,
  SimpleGrid,
  Box,
  Text,
  ActionIcon,
  Avatar,
  Stack,
  Group,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Search, Heart } from "tabler-icons-react";

import Layout from "components/Layout";
import { useSearch } from "hooks/useSearch";

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 1000);
  const { data, isLoading, isFetching } = useSearch(debouncedValue);

  return (
    <Layout>
      <TextInput
        sx={() => ({
          marginTop: "2rem",
        })}
        variant="filled"
        radius="xl"
        size="md"
        placeholder="Search image here..."
        icon={<Search size={14} />}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <SimpleGrid
        cols={3}
        my="xl"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {data?.response?.results.map((res) => {
          const {
            id,
            urls: { regular },
            alt_description,
            blur_hash,
            color,
            user: {
              username,
              portfolio_url,
              profile_image: { medium: profileImage },
            },
          } = res;

          return (
            <Box
              key={id}
              sx={{
                position: "relative",
                minWidth: "33%",
                height: 400,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  display: "hidden",
                  opacity: 0,
                  zIndex: 10,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  padding: "16px",

                  "&:hover": {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",

                    opacity: 1,
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <ActionIcon
                    component="button"
                    variant="filled"
                    sx={(theme) => ({
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: theme.colors.gray[0] },
                    })}
                  >
                    <Heart size={24} color="black" />
                  </ActionIcon>
                </Box>

                <Stack
                  sx={(theme) => ({
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: theme.colors.gray[0],
                  })}
                >
                  <Group>
                    <Avatar
                      src={profileImage}
                      radius="xl"
                      alt={username + " avatar"}
                    />

                    <Text size="sm" color="dark" weight={500}>
                      {username}
                    </Text>
                  </Group>
                </Stack>
              </Box>
              <Image
                src={regular}
                alt={alt_description as string}
                placeholder="blur"
                blurDataURL={blur_hash as string}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                style={{
                  backgroundColor: color as string,
                }}
              />
            </Box>
          );
        })}
      </SimpleGrid>
    </Layout>
  );
};

export default Home;
