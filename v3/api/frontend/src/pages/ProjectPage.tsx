import { useState, useEffect } from "react";
import CreateProjectSection from "../components/CreateProjectSection";
import MyProjects from "../components/MyProjects";

function ProjectPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    if (userId === "1") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      {/* <Title title={"Portfolio"} /> */}
      {isAdmin && <CreateProjectSection />}
      <MyProjects />
    </>
  );
}

export default ProjectPage;
