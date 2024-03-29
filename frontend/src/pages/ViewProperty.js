import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaTrash, FaPencilAlt, FaPlus } from 'react-icons/fa';
import '../styles.css'
import { Link } from 'react-router-dom';

const ViewProperty = () => {
  const [properties, setProperties] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newRoommate, setNewRoommate] = useState({ name: '', age: '', gender: '', vegNonveg: '' });

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get('http://localhost:5000/property/api/properties');
      setProperties(response.data.properties);
    };

    const fetchRoommates = async () => {
      const response = await axios.get('http://localhost:5000/roommate/api/roommates');
      setRoommates(response.data.roommates);
    };

    fetchProperties();
    fetchRoommates();
  }, []);

  const handleAddRoommate = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewRoommate({ name: '', age: '', gender: '', vegNonveg: '' });
  };
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setShowUpdateModal(true);
  };
  const handleDeleteProperty = async (propertyId) => {
    try {
      const confirmBox = window.confirm(`Are You Sure You Want To Delete this Property?`);
      if (confirmBox) {
        await axios.delete(`http://localhost:5000/property/api/properties/${propertyId}`);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };
  const handleUpdateProperty = async () => {
    try {
      await axios.put(`http://localhost:5000/property/api/properties/${selectedProperty._id}`, selectedProperty);
      handleCloseUpdateModal();
      window.location.reload();
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };
  const handleCreateRoommate = async () => {
    try {
      await axios.post('http://localhost:5000/roommate/api/roommates', {
        ...newRoommate,
        propertyId: selectedProperty._id,
      });
      handleModalClose();
      window.location.reload();
    } catch (error) {
      console.error('Error creating roommate:', error);
    }
  };

  return (
    <div className="container">
      <h2>Properties</h2>
      <ul className="table">
        <li className="table-header">
          <span className="location">Location</span>
          <span className="budget">Budget</span>
          <span className="size">Size</span>
          <span className="roommates">Roommates</span>
          <span className="action">Action</span>
        </li>
        {properties.map((property) => (
          <li key={property._id} className="property-item">
            <div className="property-info">
              <span className="location">{property.location}</span>
              <span className="budget">{property.budget}</span>
              <span className="size">{property.size}</span>
              <div className="roommates-list">
                {roommates
                  .filter((roommate) => roommate.propertyId === property._id)
                  .map((roommate) => (
                    <div key={roommate._id} className="roommate-item">
                        <Link style={{textDecoration:'none',color:'black'}} to={`/roommate/${roommate._id}`}>{roommate.name}</Link>
                      {/* Display other roommate details as needed */}
                    </div>
                  ))}
              </div>
              <div className="action-buttons">
                <button className="add-roommate-btn" onClick={(event) => {handleAddRoommate();setSelectedProperty(property)}}>
                  <FaPlus />
                  
                </button>
                <button className="delete-btn" onClick={() => handleDeleteProperty(property._id)}>
                  <FaTrash />
                </button>
                
                <button className="edit-btn" onClick={() => handleEditProperty(property)}>
                  <FaPencilAlt />
                 </button>
                
                {/* Add Edit and Delete buttons for properties */}
                
                
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Roommate Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={handleModalClose}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
      >
        <div className="modal-content">
          <h3 className="modal-title">Add Roommate</h3>
          <label htmlFor="name" className="modal-label">
            Name:
            <input
              type="text"
              id="name"
              className="modal-input"
              value={newRoommate.name}
              onChange={(e) => setNewRoommate({ ...newRoommate, name: e.target.value })}
            />
          </label>
          <label htmlFor="age" className="modal-label">
            Age:
            <input
              type="text"
              id="age"
              className="modal-input"
              value={newRoommate.age}
              onChange={(e) => setNewRoommate({ ...newRoommate, age: e.target.value })}
            />
          </label>
          <label htmlFor="gender" className="modal-label">
            Gender:
            <select
              type="text"
              id="gender"
              className="modal-input"
              value={newRoommate.gender}
              onChange={(e) => setNewRoommate({ ...newRoommate, gender: e.target.value })}
            >
                <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        </select>
          </label>
          <label htmlFor="veg/Nonveg" className="modal-label">
            Veg/NonVeg:
            <select
              type="text"
              id="veg/nonveg"
              className="modal-input"
              value={newRoommate.vegNonveg}
              onChange={(e) => setNewRoommate({ ...newRoommate, vegNonveg: e.target.value })}
            >
                        <option value="">Select Preference</option>
        <option value="Veg">Veg</option>
        <option value="Nonveg">Nonveg</option>
                </select>
          </label>
          {/* Add input fields for other roommate details (age, gender, vegNonveg) */}
          <div className="modal-buttons">
            <button className="cancel-btn" onClick={handleModalClose}>
              Cancel
            </button>
            <button className="submit-btn" onClick={handleCreateRoommate}>
              Create
            </button>
          </div>
        </div>
      </Modal>
            {/* Update Property Modal */}
            <Modal
        isOpen={showUpdateModal}
        onRequestClose={handleCloseUpdateModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
      >
        <div className="modal-content">
          <h3 className="modal-title">Edit Property</h3>
          <label htmlFor="location" className="modal-label">
            Location:
            <input
              type="text"
              id="location"
              className="modal-input"
              value={selectedProperty?.location || ''}
              onChange={(e) =>
                setSelectedProperty({ ...selectedProperty, location: e.target.value })
              }
            />
          </label>
          <label htmlFor="budget" className="modal-label">
            Budget:
            <input
              type="number"
              id="budget"
              className="modal-input"
              value={selectedProperty?.budget || ''}
              onChange={(e) =>
                setSelectedProperty({ ...selectedProperty, budget: e.target.value })
              }
            />
          </label>
          <label htmlFor="size" className="modal-label">
            Size:
            <input
              type="text"
              id="size"
              className="modal-input"
              value={selectedProperty?.size || ''}
              onChange={(e) =>
                setSelectedProperty({ ...selectedProperty, size: e.target.value })
              }
            />
          </label>
          <div className="modal-buttons">
            <button className="cancel-btn" onClick={handleCloseUpdateModal}>
              Cancel
            </button>
            <button className="submit-btn" onClick={handleUpdateProperty}>
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewProperty;
