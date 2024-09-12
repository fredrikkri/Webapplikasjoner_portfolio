import CreateProjectForm from "./CreateProjectForm";

export default function CreateProjectSection({loadProjects }: { loadProjects: () => void}) {
    return (
    
        <section id="create-project">
            <h2>Create project</h2>
            <CreateProjectForm loadProjects={loadProjects}/>
        </section>
    );
  }