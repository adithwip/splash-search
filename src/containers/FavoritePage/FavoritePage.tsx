import { SimpleGrid, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import Layout from "components/Layout";
import ImageCard from "components/ImageCard";

import type { Favorite } from "types/common";
import config from "constants/config";
import useStyles from "./styles";

const FavoritePage = () => {
  const [favorite, setFavorite] = useLocalStorage<Favorite[]>({
    key: config.favoriteImageKey,
    defaultValue: [],
  });
  const { classes } = useStyles();

  if (favorite.length === 0) {
    return <Text>Please add some images to this favorite list page</Text>;
  }

  return (
    <Layout>
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
                imageSrc={regular}
                alt={alt_description as string}
                blurHash={blur_hash as string}
                color={color as string}
              />
            );
          }
        )}
      </SimpleGrid>
    </Layout>
  );
};

export default FavoritePage;
