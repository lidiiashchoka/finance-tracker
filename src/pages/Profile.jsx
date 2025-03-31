const Profile = () => {
  const user = null;

  return (
    <div className="p-10 text-2xl font-bold text-center bg-white rounded-lg shadow">
      Профіль: {user?.name}
    </div>
  );
};
export default Profile;
