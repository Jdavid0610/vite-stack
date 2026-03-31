import useHome from "./hooks/useHome";

const Home = () => {
  const { userQuery } = useHome();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Home</h1>

      {userQuery.isLoading && <p className="text-gray-500">Loading user...</p>}

      {userQuery.data && (
        <div className="bg-white rounded-xl shadow p-6 max-w-sm">
          <p className="text-lg font-semibold text-gray-800">{userQuery.data.name}</p>
          <p className="text-gray-500 text-sm">{userQuery.data.email}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
