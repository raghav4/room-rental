import React, { useState, useContext } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import { Input, Emoji } from '../../components';
import Auth from '../../services/auth';
import { PublicContext } from '../../contexts';
import Toast from '../../components/toast';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const { history } = useContext(PublicContext);

  const disabledButton = () => {
    return !(email !== '' && password !== '');
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // const { headers } = await axios.post(`${apiUrl}/user/login`, {
      //   email,
      //   password,
      // });
      // cookie.save('x-auth-token', headers['x-auth-token']);
      await Auth.Login(email, password);
      history.push('/');
      Toast('', 'Welcome to the Room Rental', 'success');
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        Toast('error', ex.response.data, 'error');
      } else if (ex.response && ex.response.status === 401) {
        Toast('error', ex.response.data, 'error');
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div
          className="jumbotron col-md-3 mx-5 my-5"
          style={{ borderRadius: '5%' }}
        >
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <form
                  className="needs-validation"
                  onSubmit={submitHandler}
                  noValidate
                >
                  <div className="text-center">
                    <Emoji symbol="🔐" />
                    <Emoji symbol="👩🏻‍💻" />
                    <Emoji symbol="👨🏻‍💻" />
                  </div>
                  <p className="h4 text-center mb-4">Login</p>
                  <Input
                    name="email"
                    label="Email"
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    name="password"
                    label="Password"
                    value={password}
                    handleChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />

                  <div className="text-center mt-4">
                    <MDBBtn
                      color="indigo"
                      type="submit"
                      disabled={disabledButton()}
                    >
                      {Loading ? (
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        'Login'
                      )}
                    </MDBBtn>
                  </div>
                  <p className="text-center mt-3 mr-2">
                    Not a member?{'  '}
                    <Link to="/signup">Register</Link>
                  </p>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </>
  );
};

export default LogIn;
