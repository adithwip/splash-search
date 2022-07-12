import type { AppProps } from "./Layout.types";

import Link from "next/link";
import { Container, Box, ActionIcon, Group, Title } from "@mantine/core";
import { Home, Heart } from "tabler-icons-react";

import useStyles from "./styles";

const Layout = ({ children }: AppProps) => {
  const { classes } = useStyles();

  return (
    <Container p="lg">
      <Box component="nav" className={classes.navbar}>
        <Title order={2}>SplashSearch</Title>
        <Group>
          <Link href="/" passHref>
            <ActionIcon component="a">
              <Home size={24} />
            </ActionIcon>
          </Link>
          <Link href="/favorites" passHref>
            <ActionIcon component="a">
              <Heart size={24} />
            </ActionIcon>
          </Link>
        </Group>
      </Box>

      <main>{children}</main>
    </Container>
  );
};

export default Layout;
