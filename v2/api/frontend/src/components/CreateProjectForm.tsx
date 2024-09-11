export default function CreateProjectForm() {
    return (
        <form id="create-project-form">
            <section id="create-project-left">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="label" placeholder="Project-title" required/>
                <label htmlFor="githubLink">Github-link</label>
                <input type="text" id="githubLink" name="label" placeholder="URL" required/>


                <label htmlFor="liveDemo">Live demo</label>
                <input type="text" id="liveDemo" name="label" placeholder="URL"/>

                <label htmlFor="imgUrl">Image</label>
                <input type="text" id="imgUrl" name="label" placeholder="ImageURL"/>
            </section>

            <section id="create-project-right">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="label" placeholder="Descriptive text..." required/>
            </section>

            <input id="submit-button" type="submit"/>
        </form>
    );
}


