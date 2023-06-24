import { useState, useEffect } from 'react';

const useUser = () => {
  const [user, setUser] = useState(null);

  // Fetch user data or perform any initialization logic
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user'); 
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);
  
  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  return { user, updateUser };
};

export default useUser;
