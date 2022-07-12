import Image from "next/image";
import { SimpleGrid, Box, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import Layout from "components/Layout";

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
          ({ id, urls: { small }, alt_description, blur_hash, color }) => {
            return (
              <Box key={id} className={classes.image_wrapper}>
                <Image
                  src={small as string}
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

export default FavoritePage;
