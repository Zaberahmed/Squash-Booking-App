import BottomBarAdmin from '../Components/BottomBar/BottomBar.Admin';
import Upcoming from '../Components/Upcoming/Upcoming';

const AdminPage = () => {
  return (
    <div>
      <h1 className='text-6xl text-center'>Upcoming Events</h1>
      <Upcoming />
      <BottomBarAdmin />
    </div>
  );
};

export default AdminPage;
