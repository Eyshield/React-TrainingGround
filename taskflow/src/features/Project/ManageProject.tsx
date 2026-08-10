import NavBar from "../../shared/components/NavBar";
import TableProject from "./components/TableProject";
import SearchProject from "./components/SearchProject";

function ManageProject() {
  return (
    <main className="flex w-screen h-screen">
      <NavBar />
      <section className="flex flex-col  w-full h-screen">
        <SearchProject />

        <TableProject />
      </section>
    </main>
  );
}

export default ManageProject;
