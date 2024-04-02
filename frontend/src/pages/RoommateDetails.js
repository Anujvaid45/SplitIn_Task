import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const RoommateDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [roommate, setRoommate] = useState(null);
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
        `https://splitin-task.onrender.com/roommate/api/roommates/${params.roomId}`
      );
      setRoommate(response.data.roommate);
    } catch (error) {
      console.error('Error fetching roommate details:', error);
    }
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleEditRoommate = (roommate) => {
    setSelectedRoommate(roommate);
    setShowUpdateModal(true);
  };

  const handleUpdateRoommate = async () => {
    try {
      await axios.put(
        `https://splitin-task.onrender.com/roommate/api/roommates/${selectedRoommate._id}`,
        selectedRoommate
      );
      handleCloseUpdateModal();
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating Roommate:', error);
    }
  };

  const handleDeleteRoommate = async () => {
    try {
      // Implement logic to delete the roommate
      const confirmBox = window.confirm(`Are You Sure You Want To Delete this Roommate?`);
      if (confirmBox) {
        await axios.delete(`https://splitin-task.onrender.com/roommate/api/roommates/${params.roomId}`);
        navigate('/viewProperty'); // Redirect after deletion
      }
    } catch (error) {
      console.error('Error deleting roommate:', error);
    }
  };

  return (
    <Layout>
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
            <button className="edit-roommate-btn" onClick={() => handleEditRoommate(roommate)}>
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

      {/* Update Roommate Modal */}
      <Modal
        isOpen={showUpdateModal}
        onRequestClose={handleCloseUpdateModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
      >
        <div className="modal-content">
          <h3 className="modal-title">Edit Roommate</h3>
          <label htmlFor="name" className="modal-label">
            Name:
            <input
              type="text"
              id="name"
              className="modal-input"
              value={selectedRoommate?.name || ''}
              onChange={(e) =>
                setSelectedRoommate({ ...selectedRoommate, name: e.target.value })
              }
            />
          </label>
          <label htmlFor="age" className="modal-label">
            Age:
            <input
              type="text"
              id="age"
              className="modal-input"
              value={selectedRoommate?.age || ''}
              onChange={(e) =>
                setSelectedRoommate({ ...selectedRoommate, age: e.target.value })
              }
            />
          </label>
          <label htmlFor="gender" className="modal-label">
            Gender:
            <select
              id="gender"
              className="modal-input"
              value={selectedRoommate?.gender || ''}
              onChange={(e) =>
                setSelectedRoommate({ ...selectedRoommate, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label htmlFor="vegNonveg" className="modal-label">
            Veg/NonVeg:
            <select
              id="vegNonveg"
              className="modal-input"
              value={selectedRoommate?.vegNonveg || ''}
              onChange={(e) =>
                setSelectedRoommate({ ...selectedRoommate, vegNonveg: e.target.value })
              }
            >
              <option value="">Select Preference</option>
              <option value="Veg">Veg</option>
              <option value="Nonveg">Nonveg</option>
            </select>
          </label>
          <div className="modal-buttons">
            <button className="cancel-btn" onClick={handleCloseUpdateModal}>
              Cancel
            </button>
            <button className="submit-btn" onClick={handleUpdateRoommate}>
              Update
            </button>
          </div>
        </div>
      </Modal>
      </Layout>
  );
};

export default RoommateDetails;
