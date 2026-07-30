import { useState } from 'react'
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { Button, Container, Navbar, Nav, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'

import AuthContext from './contexts/index.jsx'
import useAuth from './hooks/index.jsx'

import LoginPage from './components/Login.jsx'
import Error404Page from './components/Error404.jsx'
import MainPage from './components/Main.jsx'
import SignupPage from './components/Signup.jsx'
import TestRollbar from './components/TestRollbar.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  const logIn = () => setLoggedIn(true)
  const logOut = () => {
    localStorage.removeItem('userId')
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

const LangButton = () => {
  const { t, i18n } = useTranslation()

  const changeLang = (lng) => {
    i18n.changeLanguage(lng)
  }
  const languages = Object.keys(i18n.options.resources || {})

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">
        {t(`languages.${i18n.language}`)}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {languages.map(lng => (
          <Dropdown.Item key={lng} onClick={() => changeLang(lng)}>
            {t(`languages.${lng}`)}
          </Dropdown.Item>))
        }
      </Dropdown.Menu>
    </Dropdown>
  );
}

const AuthButton = () => {
  const { t } = useTranslation()
  const auth = useAuth()
  const location = useLocation()
  const name = useSelector(state => state.authReducer.username)

  return (
    auth.loggedIn
      ? <>
          <div className="align-items-center d-flex px-3">{name}</div>
          <Button variant="outline-secondary" onClick={auth.logOut}>{t('logout')}</Button>
        </>
      : <Button as={Link} to="/signup" state={{ from: location }}>{t('register')}</Button>
  )
}

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto"></Nav>
            <TestRollbar />
            <div className="d-flex px-3">
              <AuthButton />
            </div>
            <div className="d-flex">
              <LangButton />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Error404Page />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </Container>
    </Router>
    <ToastContainer
      autoClose={3000}
      toastStyle={{
        marginTop: '60px' // Добавляет отступ сверху для каждого тоста
      }}
    />
  </AuthProvider>
)

export default App
