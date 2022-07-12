import Link from "next/link";
import { SimpleGrid, Text, Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import Layout from "components/Layout";
import ImageCard from "components/ImageCard";

import type { Favorite } from "types/common";
import config from "constants/config";

const FavoritePage = () => {
  const [favorite, setFavorite] = useLocalStorage<Favorite[]>({
    key: config.favoriteImageKey,
    defaultValue: [],
  });

  const handleOnClickRemoveFavorite = (id: string) => {
    const copiedFavoriteState = [...favorite];
    const indexOfValueById = copiedFavoriteState.findIndex(
      (favorite) => favorite.id === id
    );

    copiedFavoriteState.splice(indexOfValueById, 1);

    setFavorite(copiedFavoriteState);
  };

  return (
    <Layout>
      {favorite.length === 0 ? (
        <Stack justify="center" align="center" sx={{ height: "400px" }}>
          <Text size="xl" weight={700} color="dark">
            Please add some images to this favorite list page
          </Text>
          <Link href="/" passHref>
            <Text component="a" variant="link">
              Go to search page
            </Text>
          </Link>
        </Stack>
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
          {favorite.map(
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
                  imageSrc={regular as string}
                  alt={alt_description as string}
                  blurHash={blur_hash as string}
                  color={color as string}
                  onClickRemoveFavoriteButton={() =>
                    handleOnClickRemoveFavorite(id)
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

export default FavoritePage;
