import { Container } from "@mantine/core";

type AppProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: AppProps) => {
  return (
    <Container p="lg">
      <main>{children}</main>
    </Container>
  );
};

export default Layout;
