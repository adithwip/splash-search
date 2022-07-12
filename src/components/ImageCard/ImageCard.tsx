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
import { Heart, Download } from "tabler-icons-react";

import useStyles from "./styles";

interface Props {
  profileImage: string;
  username: string;
  download: string;
  imageSrc: string;
  alt: string;
  blurHash: string;
  color: string;
  onClickFavoriteButton?: () => void;
}

const ImageCard = ({
  onClickFavoriteButton,
  profileImage,
  username,
  download,
  imageSrc,
  alt,
  blurHash,
  color,
}: Props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.image_wrapper}>
      <Box className={classes.hover_wrapper}>
        <Box className={classes.favorite_action_wrapper}>
          <ActionIcon
            onClick={onClickFavoriteButton}
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
            <Avatar src={profileImage} radius="xl" alt={username + " avatar"} />

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
        src={imageSrc}
        alt={alt}
        placeholder="blur"
        blurDataURL={blurHash}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        style={{
          backgroundColor: color,
        }}
      />
    </Box>
  );
};

export default ImageCard;
