
import { useContext } from 'react';
import React, { useRef } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { WrapperComponent } from './components/Wrappers';
import ReunionListe from './pages/reunion/liste';
import { AuthContext } from './context/authContext';
import LoginPage from './pages/auth/login';
import DetailCommande from './pages/reunion/details';
import AddReunion from './pages/reunion/add';
import CompteRenduListe from './pages/compteRendu/liste';
import AddCompteRendu from './pages/compteRendu/add';
import DetailCompteRendu from './pages/compteRendu/details';

function App() {
  const { token } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return token ? (children) : <Navigate to={'/login'} />
  }
  return (
    <Router basename='/'>
      <Routes>
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/reunion/liste' element={<WrapperComponent children={<RequireAuth children={<ReunionListe />} />} />} />
        <Route exact path='/reunion/add' element={<WrapperComponent children={<RequireAuth children={<AddReunion />} />} />} />
        <Route exact path='/compte/rendu/liste' element={<WrapperComponent children={<RequireAuth children={<CompteRenduListe />} />} />} />
        <Route exact path='/compte/rendu/add' element={<WrapperComponent children={<RequireAuth children={<AddCompteRendu />} />} />} />
        <Route exact path='/compte/rendu/detail/:id' element={<WrapperComponent children={<RequireAuth children={<DetailCompteRendu />} />} />} />

      </Routes>
    </Router>
  );
}

export default App;
