import axios from 'axios';
import { useState } from 'react';

export const useRequest = ({ url, method, body, onSuccess, onError }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      onSuccess && onSuccess(response.data);

      return response.data;
    } catch (error) {
      setErrors(
        <div className='alert alert-danger'>
          <h4>Oops...</h4>
          <ul className='my-0'>
            {error.response.data.errors.map((err) => {
              return <li key={err.message}>{err.message}</li>;
            })}
          </ul>
        </div>
      );

      onError && onError(error.response);
    }
  };

  return { doRequest, errors };
};

export default useRequest;
