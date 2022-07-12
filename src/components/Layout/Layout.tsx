import type { AppProps } from "./Layout.types";

import { Container } from "@mantine/core";

const Layout = ({ children }: AppProps) => {
  return (
    <Container p="lg">
      <main>{children}</main>
    </Container>
  );
};

export default Layout;
