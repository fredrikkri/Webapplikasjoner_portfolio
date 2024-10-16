import Layout from "./components/Layout";
import Title from "./components/Title";
import CreateProjectSection from "./components/CreateProjectSection";
import MyProjects from "./components/MyProjects";

function App() {

  return (
    <Layout>
      <Title title={"Portfolio"} />
      <CreateProjectSection/>
      <MyProjects/>
    </Layout>
  );
}

export default App