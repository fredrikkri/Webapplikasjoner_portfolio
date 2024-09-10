import Project from "./Project";

export default function MyProjects() {

    const myProjects = [
        {
            "id": crypto.randomUUID(),
            "projectTitle": "test2",
            "description": "Webapp",
            "githubLink": "Link to github repo",
            "liveDemoLink": "link",
            "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/330px-Unofficial_JavaScript_logo_2.svg.png",
            "createdAt": new Date(),
          },
          {
            "id": crypto.randomUUID(),
            "projectTitle": "Website created with Python and Flask",
            "description": "A simple website with sanity database",
            "githubLink": "Link to github repo",
            "liveDemoLink": "link",
            "imgUrl": "https://blog.appseed.us/content/images/size/w600/2024/01/cover-flask.jpg",
            "createdAt": new Date(),
          }
    ];

    return (
        <section id="my-projects">
        <h2>My projects</h2>
        <ul id="list-cards">
        {myProjects.map((project, index) => (
            <Project key={index} 
            projectTitle={project.projectTitle} 
            description={project.description}
            githubLink={project.githubLink}
            liveDemoLink={project.liveDemoLink}
            imgUrl={project.imgUrl}
            
            />
        ))}
        </ul>
    </section>
    );
  }