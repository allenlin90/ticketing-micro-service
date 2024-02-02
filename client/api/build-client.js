import axios from 'axios';

const createClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // on the server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx',
      headers: req.headers
    });
  } else {
    // on the browser
    return axios.create({});
  }
};

export default createClient;