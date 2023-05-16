import { withPrivateRoute } from '../components/PrivateRoute';

const Home: React.FC = () => {
  return <header className="App-header">Welcome to Home!</header>;
};

export default withPrivateRoute(Home);
