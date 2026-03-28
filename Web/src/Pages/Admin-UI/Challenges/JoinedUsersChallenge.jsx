import React, { useEffect, useState } from 'react';
import '../../../CSS/Admin/joinedUser.css';
import { Mail, User, Search, ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const JoinedUsersChallenge = ({ challengeTitle = "Rare Oasis Discovery" }) => {
  const [searchTerm, setSearchTerm] = useState("");

const { id } = useParams(); // URL parameter: /admin/challenges/:challengeId/users
//   const navigate = useNavigate();
  console.log(id)
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchParticipants = async () => {
      // 1. Log the ID to see if it's captured from the URL
      console.log("Fetching for Challenge ID:", id); 

      if (!id) {
        console.error("No challengeId found in URL!");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/challenges/${id}/participants`);
        
        // 2. Check if the response is actually OK
        if (!response.ok) {
          console.error("Response not OK. Status:", response.status);
          return;
        }

        const data = await response.json();
        
        // 3. Log the data from server
        console.log("Data received from server:", data);
        
        setUsers(data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } 
    };

    fetchParticipants();
  }, [id]);

//   const displayUsers = users.length > 0 ? users : users;

  const filteredUsers = users.filter(u => 
    u.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
console.log(users)
  return (
    <div className="admin-view-wrapper">
      <div className="view-header">
        <div className="header-left">
          <button className="icon-btn-back"><ArrowLeft size={20} /></button>
          <div>
            <p className="breadcrumb">Challenges / Participants</p>
            <h1 className="challenge-title">{challengeTitle}</h1>
          </div>
        </div>

        <div className="header-right">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search participants..." 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="participants-grid">
        {filteredUsers.map((user) => (
          <div key={user._id} className="participant-card">            
            <div className="avatar-section">
              <div className="avatar-ring">
                <img src={user.avatar} alt={user.userName} />
              </div>
            </div>

            <div className="user-details">
              <h3 className="user-name">{user.userName}</h3>
              <div className="user-email">
                <Mail size={12} />
                <span>{user.email}</span>
              </div>
            </div>

            {/* <div className="card-footer">
              <button className="primary-action">Manage Access</button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};


export default JoinedUsersChallenge;