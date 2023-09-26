import React,{ useState, useEffect }  from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import "./home.css";

const Home = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user info ...</p>
      </div>
    );
  }


  if (!authState) {
    return <div>Loading ...</div>;
  }

  const handleLogin = async () => history.push('/login');

  const handleLogout = async () => oktaAuth.signOut();

  return (
    <div className="home">
      {/* <Link to="/">Home</Link> | &nbsp; */}
      {/* <Link id="protected" to="/protected">Protected</Link> | &nbsp; */}
        <div className="welcome">
        &nbsp;{userInfo.name}! 
        {
        authState.isAuthenticated
          ? <button id="logout-button" type="button" onClick={handleLogout}>Logout</button>
          : <button id="login-button" type="button" onClick={handleLogin}>Login</button>
      }
        </div>
   

    </div>
  );
};

export default Home;
