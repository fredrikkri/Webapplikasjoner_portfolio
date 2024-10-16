import { useState } from "react";
import useProjects from "../hooks/useProjects"

export default function CreateProjectForm() {

    const [formData, setFormData] = useState({
      projectTitle: "",
      githubLink: "",
      description: "",
      liveDemoLink: "",
      imgUrl: "",
    });

    // Handle sumbit metode
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    const newProject = {
        id: crypto.randomUUID(), 
        projectTitle: formData.projectTitle,
        description: formData.description,
        githubLink: formData.githubLink,
        liveDemoLink: formData.liveDemoLink,
        imgUrl: formData.imgUrl,
        createdAt: new Date(), 
      };

      try {
        const response = await fetch("http://localhost:3999/add", {
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
          });
          useProjects().projectData;
          
        } else {
          console.error("err:", response.statusText);
        }
      } catch (error) {
        console.error("err, server comunication:", error);
      }
    };

    // Handle change metode
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [id]: value,
        }));
      };

    // Return of formfield
    return (
        <form id="create-project-form" onSubmit={handleSubmit}>
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

            <section id="create-project-right">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="label" placeholder="Descriptive text..." onChange={handleChange} required/>
            </section>

            <input id="submit-button" type="submit"/>
        </form>
    );
}


