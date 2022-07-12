import Image from "next/image";
import { Box, Text, ActionIcon, Avatar, Group } from "@mantine/core";
import { Heart, Download, Trash } from "tabler-icons-react";

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
  onClickRemoveFavoriteButton?: () => void;
}

const ImageCard = ({
  onClickFavoriteButton,
  onClickRemoveFavoriteButton,
  profileImage,
  username,
  download,
  imageSrc,
  alt,
  blurHash,
  color,
}: Props) => {
  const { classes } = useStyles();

  const actionButtons = (
    <>
      {typeof onClickFavoriteButton === "function" ? (
        <ActionIcon
          onClick={onClickFavoriteButton}
          component="button"
          variant="filled"
          size="lg"
          className={classes.favorite_action_button}
        >
          <Heart size={20} color="black" />
        </ActionIcon>
      ) : null}

      {typeof onClickRemoveFavoriteButton === "function" ? (
        <ActionIcon
          onClick={onClickRemoveFavoriteButton}
          component="button"
          variant="filled"
          size="lg"
          className={classes.favorite_action_button}
        >
          <Trash size={20} color="black" />
        </ActionIcon>
      ) : null}
    </>
  );

  const downloadButton = (
    <ActionIcon
      component="a"
      href={download}
      target="_blank"
      rel="noopener noreferrer"
      variant="hover"
      size="md"
      download
    >
      <Download size={16} color="black" />
    </ActionIcon>
  );

  return (
    <Box className={classes.image_wrapper}>
      <Box className={classes.hover_wrapper}>
        <Box className={classes.favorite_action_wrapper}>{actionButtons}</Box>

        <Group className={classes.users_and_download_wrapper}>
          <Group spacing="xs">
            <Avatar src={profileImage} radius="xl" alt={username + " avatar"} />

            <Text size="sm" color="dark" weight={500}>
              {username}
            </Text>
          </Group>

          {downloadButton}
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

      <Group className={classes.mobile_action_wrapper}>
        <Group spacing="xs">
          <Avatar src={profileImage} radius="xl" alt={username + " avatar"} />

          <Text size="sm" color="dark" weight={500}>
            {username}
          </Text>
        </Group>

        <Group>
          {actionButtons}
          {downloadButton}
        </Group>
      </Group>
    </Box>
  );
};

export default ImageCard;
