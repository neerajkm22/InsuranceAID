import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// pages
import Login from './pages/Login';
import Chat from './pages/Chat';
import Error404Page from './pages/Error404Page';
import Logout from './pages/Logout';
import ProtectedRoutes from './components/route/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
     <ToastContainer
        position="top-center"
        // autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />} >
          <Route path="/chat" element={<Chat />} />        
        </Route>        
        <Route path="/logout" element={<Logout />} />        
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
    </div>
   );

}

export default App;
