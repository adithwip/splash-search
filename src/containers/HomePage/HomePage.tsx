import { useState } from "react";
import Image from "next/image";
import {
  TextInput,
  SimpleGrid,
  Box,
  Text,
  ActionIcon,
  Avatar,
  Group,
} from "@mantine/core";
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { Search, Heart, Download } from "tabler-icons-react";

import Layout from "components/Layout";
import { useSearch } from "hooks/useSearch";

import type { Favorite } from "types/common";
import config from "constants/config";
import useStyles from "./styles";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue] = useDebouncedValue(searchValue, 1000);
  const { data, isLoading, isError } = useSearch(debouncedValue);
  const [favorite, setFavorite] = useLocalStorage<Favorite[]>({
    key: config.favoriteImageKey,
    defaultValue: [],
  });

  const { classes } = useStyles();

  const handleOnClickFavorite = ({
    id,
    urls: { small },
    alt_description,
    blur_hash,
    color,
  }: Favorite) => {
    const copiedFavoriteState = [...favorite];
    const newFavoriteState = [
      ...copiedFavoriteState,
      {
        id,
        urls: { small },
        alt_description,
        blur_hash,
        color,
      },
    ];

    setFavorite(newFavoriteState);
  };

  return (
    <Layout>
      <TextInput
        sx={() => ({
          marginTop: "2rem",
        })}
        variant="filled"
        radius="xl"
        size="md"
        placeholder="Search amazing images here..."
        icon={<Search size={14} />}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
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
        {data?.response?.results.map(
          ({
            id,
            urls: { regular, small },
            alt_description,
            blur_hash,
            color,
            links: { download },
            user: {
              username,
              profile_image: { medium: profileImage },
            },
          }) => {
            return (
              <Box key={id} className={classes.image_wrapper}>
                <Box className={classes.hover_wrapper}>
                  <Box className={classes.favorite_action_wrapper}>
                    <ActionIcon
                      onClick={() =>
                        handleOnClickFavorite({
                          id,
                          urls: { small },
                          alt_description,
                          blur_hash,
                          color,
                        })
                      }
                      component="button"
                      variant="filled"
                      size="lg"
                      className={classes.favorite_action_button}
                    >
                      <Heart size={20} color="black" />
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
                      variant="hover"
                      size="md"
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
          }
        )}
      </SimpleGrid>
    </Layout>
  );
};

export default HomePage;
