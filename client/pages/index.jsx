import axios from 'axios';

const LandingPage = ({ user }) => {
  console.log('🚀 ~ LandingPage ~ user:', user);

  return <h1>LandingPage</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server
    const { data = {} } = await axios
      .get(
        'http://ingress-nginx-controller.ingress-nginx/api/users/currentuser',
        {
          headers: req.headers,
        }
      )
      .catch((err) => console.log(err));

    return { user: data };
  }

  const { data = {} } = await axios
    .get('/api/users/currentuser')
    .catch((err) => console.log(err));

  return { user: data };
};

export default LandingPage;
