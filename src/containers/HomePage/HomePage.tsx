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
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { Search, Heart, Download } from "tabler-icons-react";

import Layout from "components/Layout";
import { useSearch } from "hooks/useSearch";

import type { Favorite } from "./types";
import config from "constants/config";
import useStyles from "./styles";

const HomePage = () => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 1000);
  const { data, isLoading, isFetching, isError } = useSearch(debouncedValue);
  const [favorite, setFavorite] = useLocalStorage<Favorite[]>({
    key: config.favoriteImageKey,
    defaultValue: [],
  });

  const { classes } = useStyles();

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
            links: { download },
            user: {
              username,
              profile_image: { medium: profileImage },
            },
          } = res;

          const handleOnClickFavorite = () => {
            const copiedFavoriteState = [...favorite];
            const newFavoriteState = [
              ...copiedFavoriteState,
              {
                id,
                urls: { regular },
                alt_description,
                blur_hash,
                color,
              },
            ];

            setFavorite(newFavoriteState);
          };

          return (
            <Box key={id} className={classes.image_wrapper}>
              <Box className={classes.hover_wrapper}>
                <Box className={classes.favorite_action_wrapper}>
                  <ActionIcon
                    onClick={handleOnClickFavorite}
                    component="button"
                    variant="filled"
                    className={classes.favorite_action_button}
                  >
                    <Heart size={16} color="black" />
                  </ActionIcon>
                </Box>

                <Group className={classes.users_and_download_wrapper}>
                  <Group spacing="xs">
                    <Avatar
                      src={profileImage}
                      radius="xl"
                      alt={username + " avatar"}
                    />

                    <Text size="sm" color="dark" weight={500}>
                      {username}
                    </Text>
                  </Group>

                  <ActionIcon
                    component="a"
                    href={download}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                  >
                    <Download size={16} color="black" />
                  </ActionIcon>
                </Group>
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

export default HomePage;
