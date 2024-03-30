import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ViewProperty from './pages/ViewProperty';
import AddProperty from './pages/AddProperty';
import RoommateDetails from './pages/RoommateDetails';
import HomePage from './pages/Homepage';

function App() {
  return (
    <BrowserRouter>
    <Routes>     
      <Route path='/' element={<HomePage />}/>
      <Route path='*' element={<HomePage />}/>
      <Route path='/viewProperty' element={<ViewProperty />}/>
      <Route path='/addProperty' element={<AddProperty />}/>
      <Route path="/roommate/:roomId" element={<RoommateDetails/>} />  
    </Routes>
    </BrowserRouter>
  );
}

export default App;
