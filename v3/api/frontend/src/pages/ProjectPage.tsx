import Title from "../components/Title";
import CreateProjectSection from "../components/CreateProjectSection";
import MyProjects from "../components/MyProjects";

function ProjectPage() {

  return (
    <>
      <Title title={"Portfolio"} />
      <CreateProjectSection/>
      <MyProjects/>
    </>
  );
}

export default ProjectPage