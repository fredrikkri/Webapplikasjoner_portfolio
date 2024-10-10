import { useState } from "react";

export default function CreateProjectForm({loadProjects }: { loadProjects: () => void}) {

    const [formData, setFormData] = useState({
      name: "",
      repoUrl: "",
      description: "",
      imageUrl: "",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    const newProject = {
        name: formData.name,
        repoUrl: formData.repoUrl,
        description: formData.description,
        image: formData.imageUrl,
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
            name: "",
            repoUrl: "",
            description: "",
            imageUrl: "",
          });
          loadProjects();
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

    return (
        <form id="create-project-form" onSubmit={handleSubmit}>
            <section id="create-project-left">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="label" placeholder="Project-title" onChange={handleChange} required/>
                <label htmlFor="githubLink">Github-link</label>
                <input type="text" id="githubLink" name="label" placeholder="URL" onChange={handleChange} required/>


                <label htmlFor="liveDemo">Live demo</label>
                <input type="text" id="liveDemo" name="label" placeholder="URL" onChange={handleChange}/>

                <label htmlFor="imgUrl">Image</label>
                <input type="text" id="imgUrl" name="label" placeholder="ImageURL" onChange={handleChange}/>
            </section>

            <section id="create-project-right">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="label" placeholder="Descriptive text..." onChange={handleChange} required/>
            </section>

            <input id="submit-button" type="submit"/>
        </form>
    );
}


