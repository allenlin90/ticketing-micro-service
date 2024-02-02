import createClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  if (currentUser) {
    return <h1>You are signed in</h1>;
  }

  return <h1>You are not signed in</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = createClient(context);
  const { data = {} } = await client
    .get('/api/users/currentuser')
    .catch((err) => console.log(err));

  return data;
};

export default LandingPage;
