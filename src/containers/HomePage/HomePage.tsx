import { TextInput, SimpleGrid, Loader, Center } from "@mantine/core";
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Search } from "tabler-icons-react";

import Layout from "components/Layout";
import ImageCard from "components/ImageCard";
import { useSearch } from "hooks/useSearch";

import type { Favorite } from "types/common";
import config from "constants/config";

const HomePage = () => {
  const [searchValue, setSearchValue] = useLocalStorage({
    key: config.searchKey,
    defaultValue: "",
  });
  const [debouncedValue] = useDebouncedValue(searchValue, 1000);
  const { data, isLoading, isError } = useSearch(debouncedValue);
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
          )}
        </SimpleGrid>
      )}
    </Layout>
  );
};

export default HomePage;
