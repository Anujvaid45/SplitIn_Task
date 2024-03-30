import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
    <div className="homepage-container">
      <h1>Welcome to SplitIn</h1>
      <p>
        SplitIn is a platform where you can list properties and find compatible roommates based on preferences.
      </p>
      <h2>Key Features:</h2>
      <ul>
        <li>List Properties: Showcase your properties to potential roommates.</li>
        <li>Find Roommates: Search for roommates based on preferences like age, gender, dietary preferences, etc.</li>
        <li>Add Roommates: Connect with compatible roommates and add them to your property.</li>
        <li>Manage Properties: Easily manage your listed properties and roommates.</li>
      </ul>
      <div className="homepage-buttons">
        <Link to="/viewProperty" className="btn btn-primary">
          View Properties
        </Link>
        <Link to="/addProperty" className="btn btn-secondary">
          Add Property
        </Link>
      </div>
      <p>
        Explore SplitIn today and find the perfect living arrangement for you!
      </p>
    </div>
    </Layout>
  );
};

export default HomePage;
