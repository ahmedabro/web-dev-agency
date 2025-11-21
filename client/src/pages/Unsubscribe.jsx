import axios from 'axios';
import React, {useEffect} from 'react'
import { useParams } from 'react-router';

const Unsubscribe = () => {
  const { token } = useParams();
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    const unsubscribeUser = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribers/unsubscribe/${token}`);
        setSuccess(true);
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
    };

    unsubscribeUser();
  }, [token]);

  return (
    <div>
      {success ? (
        <h1>You are successfully unsubscribed from the newsletter.</h1>
      ) : (
        <h1>Unsubscribing...</h1>
      )}
    </div>
  )
}

export default Unsubscribe