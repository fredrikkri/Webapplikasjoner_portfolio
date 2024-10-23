import Title from "../components/Title";
import CreateProjectSection from "../components/CreateProjectSection";
import MyProjects from "../components/MyProjects";
import useProjects from "../hooks/useProjects";

function ProjectPage() {
  const { projectData } = useProjects();

  return (
    <>
      <Title title={"Portfolio"} />
      <CreateProjectSection/>
      <MyProjects/>
    </>
  );
}

export default ProjectPage