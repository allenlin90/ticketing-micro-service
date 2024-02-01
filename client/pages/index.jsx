import axios from 'axios';

const LandingPage = ({ user }) => {
  console.log('🚀 ~ LandingPage ~ user:', user);
  return <h1>LandingPage</h1>;
};

LandingPage.getInitialProps = async () => {
  const response = await axios
    .get(
      'http://ingress-nginx-controller.ingress-nginx/api/users/currentuser',
      {
        headers: {
          host: 'ticketing.dev',
        },
      }
    )
    .catch((err) => console.log(err));

  return { user: response?.data };
};

export default LandingPage;
