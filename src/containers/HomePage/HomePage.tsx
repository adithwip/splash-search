import { useState } from "react";
import {
  TextInput,
  SimpleGrid,
  Loader,
  Center,
  Button,
  Text,
} from "@mantine/core";
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Search } from "tabler-icons-react";

import Layout from "components/Layout";
import ImageCard from "components/ImageCard";
import { useInfiniteSearch } from "hooks/useSearch";

import type { Favorite } from "types/common";
import config from "constants/config";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useLocalStorage({
    key: config.searchKey,
    defaultValue: "",
  });
  const [debouncedValue] = useDebouncedValue(searchValue, 1000);
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteSearch(debouncedValue, page);

  /**
   * This is the core logic to get and set favorite images via localStorage
   */
  const [favorite, setFavorite] = useLocalStorage<Favorite[]>({
    key: config.favoriteImageKey,
    defaultValue: [],
  });

  const handleOnClickFavorite = ({
    id,
    urls: { regular },
    alt_description,
    blur_hash,
    color,
    links: { download },
    user: {
      username,
      profile_image: { medium },
    },
  }: Favorite) => {
    const copiedFavoriteState = [...favorite];
    const newFavoriteState = [
      ...copiedFavoriteState,
      {
        id,
        urls: { regular },
        alt_description,
        blur_hash,
        color,
        links: { download },
        user: {
          username,
          profile_image: { medium },
        },
      },
    ];

    setFavorite(newFavoriteState);
    showNotification({
      title: "You favorited an image",
      message: "Go to Favorites page to see all your favorited image!",
    });
  };

  if (isError) {
    return (
      <Center style={{ height: "600px" }}>
        <Text size="sm" color="dark" weight={500}>
          Error: There is some serious problem occured. Please retry.
        </Text>
      </Center>
    );
  }

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
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
      />

      {isLoading ? (
        <Center style={{ height: "400px" }}>
          <Loader />
        </Center>
      ) : (
        <>
          <SimpleGrid
            cols={3}
            my="xl"
            breakpoints={[
              { maxWidth: 980, cols: 3, spacing: "md" },
              { maxWidth: 755, cols: 2, spacing: "sm" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {data?.pages.map((page) => {
              return page?.response?.results.map(
                ({
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
                }) => {
                  return (
                    <ImageCard
                      key={id}
                      profileImage={profileImage}
                      username={username}
                      download={download}
                      imageSrc={regular}
                      alt={alt_description as string}
                      blurHash={blur_hash as string}
                      color={color as string}
                      onClickFavoriteButton={() =>
                        handleOnClickFavorite({
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
                        })
                      }
                    />
                  );
                }
              );
            })}
          </SimpleGrid>

          <Center>
            <Button
              onClick={() => {
                fetchNextPage();
                /**
                 * Because by default Unsplash API not giving us any page information
                 * we need to manually update the page value with state.
                 */
                setPage((prevState) => prevState + 1);
              }}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </Button>
          </Center>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
