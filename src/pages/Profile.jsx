const Profile = () => {
  const user = null;

  return (
    <div className="px-6 md:px-10 py-24 text-2xl font-bold text-center bg-white rounded-lg shadow">
      Профіль: {user?.name}
    </div>
  );
};
export default Profile;
