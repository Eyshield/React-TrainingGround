import { useParams } from "react-router-dom";
import NavBar from "../../../shared/components/NavBar";
import ProjectDetailsHeader from "../components/ProjectDetailsHeader";

function ProjectDetails() {
  const params = useParams();
  return (
    <main className="flex">
      <NavBar />
      <section className="w-full">
        <ProjectDetailsHeader id={params.id!} />
      </section>
    </main>
  );
}

export default ProjectDetails;
