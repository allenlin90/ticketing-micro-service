import 'bootstrap/dist/css/bootstrap.min.css';
import createClient from '../api/build-client';
import Header from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return <div>
    <Header currentUser={currentUser} />
    <Component {...pageProps} />
  </div>
    ;
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  const client = createClient(ctx);
  const { data = {} } = await client
    .get('/api/users/currentuser')
    .catch((err) => console.log(err));

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, ...data };
};

export default AppComponent;