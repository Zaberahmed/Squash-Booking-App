
import './Profile.css'

const Profile = () => {
    return (
        <div className="profile-card">
        
  
        <div className="profile-details">
        <h2>Profile</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Membership ID:</strong> 123456789</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Contact Details:</strong> 123-456-7890</p>
        </div>
  
        <button className="logout-button">Logout</button>
      </div>
    );
};

export default Profile;