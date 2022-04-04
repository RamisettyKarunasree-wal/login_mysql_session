import { useEffect } from 'react';
import axios from 'axios';

export default function () {
  useEffect(() => {
    axios
      .get('users/logout')
      .then((res) => {
        window.location.pathname = '/';
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return null;
}
