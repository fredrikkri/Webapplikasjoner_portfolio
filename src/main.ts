import { Project } from './types';

const projects: Project[] = [];


function displayProjects() {
  const projectList = document.getElementById('list-cards');
  projectList!.innerHTML = "";

  if (projectList) {
    projects.forEach(project => {

      const cardItem = document.createElement('li');
      cardItem.className = "card";

      const title = document.createElement('h3');
      title.textContent = project.title;

      const textSection = document.createElement('article');

      const githubLink = document.createElement('a');
      githubLink.href = project.githubLink;
      githubLink.text = "Link to Github";

      const liveDemoLink = document.createElement('a');
      liveDemoLink.href = project.liveDemoLink;
      liveDemoLink.text = "Live Demo";

      const jumpLine = document.createElement('br');

      const description = document.createElement('p');
      description.innerHTML = project.description;

      const figure = document.createElement('figure');
      const imgUrl = document.createElement('img');
      imgUrl.src = project.imgUrl;
      figure.appendChild(imgUrl)

      projectList.appendChild(cardItem);
      cardItem.appendChild(textSection);
      cardItem.appendChild(figure);
      textSection.appendChild(title);
      textSection.appendChild(githubLink);
      textSection.appendChild(jumpLine);
      textSection.appendChild(liveDemoLink);
      textSection.appendChild(description);
    });
  }
}

function loadFromApi() {
  fetch("http://localhost:3999")
    .then((response) => response.json())
    .then((data) => {
      projects.push(...data); 
      displayProjects();
    })
    .catch((error) => {
      console.error("Feil ved henting av data fra serveren:", error);
    });
}

loadFromApi();

const form = document.getElementById("create-project-form") as HTMLFormElement;

form.addEventListener("submit", async (event: SubmitEvent) => {event.preventDefault(); 

    const title = (document.getElementById('title') as HTMLInputElement).value;
    const githubLink = (document.getElementById('githubLink') as HTMLInputElement).value;
    const liveDemoLink = (document.getElementById('liveDemo') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLInputElement).value;
    const imgUrl = (document.getElementById('imgUrl') as HTMLInputElement).value;

    const jsonData: Project = {
      title, githubLink, liveDemoLink, description, imgUrl,
      id: crypto.randomUUID(),
      createdAt: new Date()
    }

    projects.push(jsonData);
    displayProjects();

  try {
    const response = await fetch("http://localhost:3999/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    if (response.status === 201) {
      console.log("Prosjekt lagret på serveren");
    } else {
      console.error("Feil ved lagring av prosjekt på serveren");
    }
  } catch (error) {
    console.error("Feil ved sending av data til serveren:", error);
  }
});
