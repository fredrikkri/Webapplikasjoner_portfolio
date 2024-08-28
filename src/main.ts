import data from './data.json';

const projects = data.projects;

// console.log(projects);

const projectList = document.getElementById('list-cards');

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