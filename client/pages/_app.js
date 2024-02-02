import 'bootstrap/dist/css/bootstrap.min.css';
import createClient from '../api/build-client';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return <div>
    <h1>Header! {currentUser.email}</h1>
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