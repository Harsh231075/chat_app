import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUsers } from'../redux/features/fectUserSlice';

const useFetchUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_FRONTEND_URL}/api/user/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });    
        // console.log(response.data.users);
        dispatch(setUsers(response.data.users)); 
        setLoading(false);
      } catch (err) {
        console.log(err.response?.data?.message || 'Failed to fetch user');
        setLoading(false);
      } 
    };
    fetchUser();
  }, [dispatch, setUsers]); // Added dependencies

  return { loading }; 
};

export default useFetchUser;
