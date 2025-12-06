import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../src/redux/store/store";
import Container from "./components/registration/mainContent/container";
import { ForgotPassword1 } from './components/forgot_password/forgot_password1';
import { ForgotPassword2 } from './components/forgot_password/forgot_password2';
import { ForgotPassword } from './components/forgot_password/forgot_password';
import Login from './components/Login/login';
import ChatComponent from "./components/chat/chatComponent";
import InputComponent from "./components/input/inputComponent";
import TabbedPanel from "./userWindow/userWindow";
import Cards from "./userWindow/cards";
import PersonaChat from "./components/personaChat/personaChat";
import PersonaChatRAG from "./components/personaChat/personaChatRAG";

function App() {
  const checkAuthToken = () => {
    const token = localStorage.getItem('AuthToken');
    return token ? "/home" : "/login";
  };

  return (
      <>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate replace to={checkAuthToken()} />} />
              <Route path="/register" element={<Container/>}/>
              <Route path="/reset-password" element={<ForgotPassword />} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/codeverification' element={<ForgotPassword1/>}/>
              <Route path='/resetpassword' element={<ForgotPassword2/>}/>
              {/*<Route path="/chat" element={<ChatComponent/>} />*/}
              {/*<Route path="/input" element={<InputComponent/>} />*/}
              <Route path="/memories" element={<TabbedPanel/>} />
              {/*<Route path="/memories/add-memory" element={<TabbedPanel />} />*/}
              {/*<Route path="/memories/retrieve-memory" element={<TabbedPanel />} />*/}
              <Route path="/home" element={<Cards/>} />
              <Route path="/persona" element={<PersonaChat/>} />
              <Route path="/personaRAG" element={<PersonaChatRAG/>} />
            </Routes>
          </Router>
        </Provider>
      </>
  );
}

export default App;
