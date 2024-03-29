import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const RoommateDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [roommate, setRoommate] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (params?.roomId) {
      getRoommateDetails();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.roomId]);

  const getRoommateDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/roommate/api/roommates/${params.roomId}`
      );
      setRoommate(response.data.roommate);
    } catch (error) {
      console.error('Error fetching roommate details:', error);
    }
  };

  const handleEditRoommate = () => {
    // Implement logic to navigate to the edit roommate page
    navigate(`/roommates/${params.roomId}/edit`);
  };

  const handleDeleteRoommate = async () => {
    try {
      // Implement logic to delete the roommate
      await axios.delete(`https://your-api-url.com/roommates/${params.roomId}`);
      //toast.success('Roommate deleted successfully');
      // Redirect to a different page after deletion
      navigate('/roommates');
    } catch (error) {
      console.error('Error deleting roommate:', error);
    }
  };

  return (
    <div>
      {roommate ? (
        <div className="roommate-details-container">
          <h1 className="roommate-details-title">Roommate Details</h1>
          <div className="roommate-details-info">
            <p>Name: {roommate.name}</p>
            <p>Age: {roommate.age}</p>
            <p>Gender: {roommate.gender}</p>
            <p>Veg/NonVeg: {roommate.vegNonveg}</p>
            {/* Add more details as needed */}
          </div>
          <div className="roommate-details-actions">
            <button className="edit-roommate-btn" onClick={handleEditRoommate}>
              Edit Roommate
            </button>
            <button className="delete-roommate-btn" onClick={handleDeleteRoommate}>
              Delete Roommate
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RoommateDetails;
