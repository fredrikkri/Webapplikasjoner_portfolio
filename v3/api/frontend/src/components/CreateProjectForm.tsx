import { useState } from "react";
import useProjects from "../hooks/useProjects"
import { ENDPOINTS } from "../config/config";

ENDPOINTS.add

export default function CreateProjectForm() {
  const useProjectsHook = useProjects().projectData;

  const [chosenStatus, setchosenStatus] = useState<string>("No status");

    const [formData, setFormData] = useState({
      projectTitle: "",
      githubLink: "",
      description: "",
      liveDemoLink: "",
      imgUrl: "",
      projectStatus: chosenStatus,
    });

    // Handle sumbit metode
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    const newProject = {
        id: crypto.randomUUID(), 
        userId: "3",
        projectTitle: formData.projectTitle,
        description: formData.description,
        githubLink: formData.githubLink,
        liveDemoLink: formData.liveDemoLink,
        imgUrl: formData.imgUrl,
        createdAt: new Date(), 
        projectStatus: chosenStatus,
      };
      console.log("Sending project data:", newProject); 

      try {
        const response = await fetch(ENDPOINTS.add, {
          credentials: "include", 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProject),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Project added:", data);
          setFormData({
            projectTitle: "",
            description: "",
            githubLink: "",
            liveDemoLink: "",
            imgUrl: "",
            projectStatus: ""
          });
          useProjectsHook
          window.history.go()
        } else {
          console.error("err:", response.statusText);
        }
      } catch (error) {
        console.error("err, server comunication:", error);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [id]: value,
        }));
      };
    
      const handlechosenStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTarget = event.target.value;
        setchosenStatus(event.target.value);
        setFormData((prevData) => ({
          ...prevData,
          status: selectedTarget,
        }));
      };

    // Return of formfield
    return (
        <form id="create-project-form" onSubmit={handleSubmit}>
          
          {/* Left side */}
            <section id="create-project-left">
                <label htmlFor="title">Title</label>
                <input type="text" id="projectTitle" name="label" placeholder="projectTitle" onChange={handleChange} required/>
                <label htmlFor="githubLink">Github-link</label>
                <input type="text" id="githubLink" name="label" placeholder="URL" onChange={handleChange} required/>


                <label htmlFor="liveDemoLink">Live demo</label>
                <input type="text" id="liveDemoLink" name="label" placeholder="URL" onChange={handleChange}/>

                <label htmlFor="imgUrl">Image</label>
                <input type="text" id="imgUrl" name="label" placeholder="imgUrl" onChange={handleChange}/>
            </section>

            {/* Right side */}
            <section id="create-project-right">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="label" placeholder="Tell us about your project..." onChange={handleChange} required/>
                <section id="chose-status-section">
                    <p>Set Status</p>
                    <span>
                    <label>New
                      <input type="radio" name="chosenStatus" value="New" checked={chosenStatus === "New"} onChange={handlechosenStatus} />
                    </label>

                    <label>In Progress
                      <input type="radio" name="chosenStatus" value="In Progress" checked={chosenStatus === "In Progress"} onChange={handlechosenStatus} />
                    </label>

                    <label>Finished
                      <input type="radio" name="chosenStatus" value="Finished" checked={chosenStatus === "Finished"} onChange={handlechosenStatus} />
                    </label>
                    </span>
                </section>  
            </section>
            <input id="submit-button" type="submit"/>
        </form>
    );
}
