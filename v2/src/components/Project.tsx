export type ProjectProps = {
    projectTitle: string
    description: string
    githubLink: string
    liveDemoLink: string
    imgUrl: string
}

export default function Project({projectTitle, description, githubLink, liveDemoLink, imgUrl}: ProjectProps) {
    return (
        <li className="card">
            <article>
                <h3>{projectTitle}</h3>
                <a href={githubLink}>Link to Github</a>
                <br />
                <a href={liveDemoLink}>Live Demo</a>
                <p>{description}</p>
            </article>
            <figure>
                <img src={imgUrl} alt="ImageURL" />
            </figure>
        </li>
    );
  }