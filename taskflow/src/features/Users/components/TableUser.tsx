import { useEffect } from "react";
import { useDeleteUser, useGetAllUsers } from "../hooks/useUser";

function TableUser() {
  const { data, error, loading, handleGetAllUsers } = useGetAllUsers();
  const {
    success: deletingSuccess,
    error: deletingError,
    loading: deletingLoading,
    handleDeleteUser,
  } = useDeleteUser();

  useEffect(() => {
    handleGetAllUsers(0, 10);
  }, [handleGetAllUsers]);

  useEffect(() => {
    if (deletingSuccess) {
      const currentPage = data?.page ?? 0;
      const isLastItemOnPage = data?.content.length === 1;
      const targetPage =
        isLastItemOnPage && currentPage > 0 ? currentPage - 1 : currentPage;

      handleGetAllUsers(targetPage, 10);
    }
  }, [deletingSuccess, data?.content.length, data?.page, handleGetAllUsers]);

  if (loading)
    return (
      <p className="flex justify-center items-center w-screen ">
        Chargement...
      </p>
    );
  if (error)
    return (
      <p className="flex justify-center items-center w-screen ">
        Erreur : {error}
      </p>
    );
  if (!data || data.content.length === 0)
    return (
      <p className="flex justify-center items-center w-screen ">
        Aucun utilisateur trouvé
      </p>
    );

  return (
    <div className="w-screen h-full">
      {deletingError && <p>Erreur : {deletingError}</p>}
      {deletingSuccess && <p>Supprimer avec succes</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((userResponse) => (
            <tr key={userResponse.id}>
              <td>{userResponse.id}</td>
              <td>{userResponse.username}</td>
              <td>{userResponse.email}</td>
              <td>{userResponse.role}</td>
              <td>
                <button onClick={() => console.log("edit", userResponse.id)}>
                  Éditer
                </button>
                <button onClick={() => handleDeleteUser(userResponse.id!)}>
                  {deletingLoading ? "Suppression..." : "Supprimer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          disabled={data.isFirst}
          onClick={() => handleGetAllUsers(data.page - 1, 10)}
        >
          ← Précédent
        </button>

        <span>
          Page {data.page + 1} / {data.totalPage}
        </span>

        <button
          disabled={data.isLast}
          onClick={() => handleGetAllUsers(data.page + 1, 10)}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}

export default TableUser;
