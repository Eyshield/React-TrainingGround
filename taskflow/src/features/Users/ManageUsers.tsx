import NavBar from "../../shared/components/NavBar";
import TableUser from "./components/TableUser";

function ManageUsers() {
  return (
    <main className="flex">
      <NavBar />
      <TableUser />
    </main>
  );
}

export default ManageUsers;
