import React,{createContext,useContext,useState,useEffect,useRef} from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [userRole, setUserRoleState] = useState(null);
  const [username, setUsernameState] = useState('');
  const [password, setPasswordState] = useState('');
  const [userEmail, setUserEmailState] = useState('');
  const [userId, setUserIdState] = useState(null);

    useEffect(() => {
    // Load user data from localStorage or API
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedUserEmail = localStorage.getItem('userEmail');
    const storedUserId = localStorage.getItem('userId');
    if (storedUser) setUserState(JSON.parse(storedUser));
    if (storedToken) setTokenState(storedToken);
    if (storedUserRole) setUserRoleState(storedUserRole);
    if (storedUsername) setUsernameState(storedUsername);
    if (storedPassword) setPasswordState(storedPassword);
    if (storedUserEmail) setUserEmailState(storedUserEmail);
    if (storedUserId) setUserIdState(storedUserId);
    }, []);

    const setUser = (userData) => {
    setUserState(userData);
  };
    const setToken = (tokenData) => {
        setTokenState(tokenData);
    };
    const setUserRole = (role) => {
        setUserRoleState(role);
    };
    const setUsername = (name) => {
        setUsernameState(name);
    };
    const setPassword = (pass) => {
        setPasswordState(pass);
    };
    const setUserEmail = (email) => {
        setUserEmailState(email);
    };
    const setUserId = (id) => {
        setUserIdState(id);
    };
    // Save user data to localStorage or API
    const clearUserData = () => {
        console.log("Clearing user data");
        setUserState(null);
        setTokenState(null);
        setUserRoleState(null);
        setUsernameState('');
        setPasswordState('');
        setUserEmailState('');
        setUserIdState(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
    };
    
    const isrole = (role) => {
        return userRole === role;
    };

  return (
    <UserContext.Provider value={{ user, isrole, setUser, setToken, setUserRole, setUsername, setPassword, setUserEmail, setUserId, userRole, username, password, userEmail, userId, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
