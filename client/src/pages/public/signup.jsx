import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Input } from '../../components';
import { apiUrl } from '../../config.json';
import Toast from '../../components/toast';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);

  const isDisabled = () => {
    return !(
      name !== '' &&
      email !== '' &&
      phone !== '' &&
      password !== ''
    );
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/user/signup`, {
        name,
        email,
        password,
        phone,
      });
      Swal.fire({
        icon: 'success',
        title: 'Registeration Successfull',
        text: 'You can login now',
        html:
          '<p>Go to the <a href="/login">Login</a> Page to continue</p>',
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        Toast('error', ex.response.data, 'error');
      } else if (ex.response && ex.response.status === 409) {
        Toast('error', ex.response.data, 'error');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-5">
        <div
          className="jumbotron col-md-5 mx-5 my-5"
          style={{ borderRadius: '3%' }}
        >
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <form
                  className="needs-validation"
                  onSubmit={submitHandler}
                  noValidate
                >
                  <p className="h4 text-center mb-4">Sign up</p>
                  <Input
                    name="name"
                    label="Full Name"
                    value={name}
                    handleChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    name="email"
                    label="Email"
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    name="phone"
                    label="Phone Number"
                    value={phone}
                    handleChange={(e) => setPhone(e.target.value)}
                  />

                  <Input
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    handleChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="text-center mt-4">
                    <MDBBtn
                      color="deep-purple"
                      type="submit"
                      disabled={isDisabled()}
                    >
                      {Loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        'Register'
                      )}
                    </MDBBtn>
                  </div>
                  <p className="text-center mt-3 mr-2">
                    Already a member?{'  '}
                    <Link to="/login">Sign In</Link>
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
export default SignUp;
