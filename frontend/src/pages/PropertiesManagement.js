// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PropertiesManagement = () => {
//   const [properties, setProperties] = useState([]);
//   const [newProperty, setNewProperty] = useState({
//     location: '',
//     budget: 0,
//     size: '',
//   });

//   useEffect(() => {
//     // Fetch properties data from backend API
//     const fetchProperties = async () => {
//       const response = await axios.get('http://localhost:5000/property/api/properties');
//       setProperties(response.data.properties);
//     };

//     fetchProperties();
//   }, []);

//   const handleAddProperty = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/property/api/properties', newProperty);
        
//       setProperties([...properties, response.data.properties]);
//       setNewProperty({
//         location: '',
//         budget: 0,
//         size: '',
//       });
//     } catch (error) {
//       console.error('Error adding property:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Properties</h2>
//       <ul className="table">
//         {/* {properties.map(property => (
//           <li key={property.property_id}>
//             Location: {property.location} | Budget: {property.budget} | Size: {property.size}
//           </li>
//         ))} */}
//       </ul>
//       <div className="form-group">
//         <h3>Add New Property</h3>
//         <label htmlFor="location" className="label">Location:</label>
//         <input
//           type="text"
//           id="location"
//           className="input"
//           placeholder="Location"
//           value={newProperty.location}
//           onChange={e => setNewProperty({ ...newProperty, location: e.target.value })}
//         />
//         <label htmlFor="budget" className="label">Budget:</label>
//         <input
//           type="number"
//           id="budget"
//           className="input"
//           placeholder="Budget"
//           value={newProperty.budget}
//           onChange={e => setNewProperty({ ...newProperty, budget: e.target.value })}
//         />
//         <label htmlFor="size" className="label">Size:</label>
//         <input
//           type="text"
//           id="size"
//           className="input"
//           placeholder="Size"
//           value={newProperty.size}
//           onChange={e => setNewProperty({ ...newProperty, size: e.target.value })}
//         />
//         <button className="button" onClick={handleAddProperty}>Add Property</button>
//       </div>
//     </div>
//   );
// };

// export default PropertiesManagement;
