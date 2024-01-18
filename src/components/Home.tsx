import { Layout } from "./Layout";
import { SearchBar } from "./SearchBar";
import { Title } from "./Title";

export const Home = () => {
  return (
    <Layout>
      <>
        <Title />
        <SearchBar />
      </>
    </Layout>
  );
};
