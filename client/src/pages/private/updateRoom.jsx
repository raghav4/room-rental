import React, { useState } from 'react';
import axios from 'axios';
import cookies from 'react-cookies';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Input } from '../../components';
import { apiUrl } from '../../config.json';
import Toast from '../../components/toast';

const UpdateRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [roomType, setRoomType] = useState('');
  const [bedCapacity, setBedCapacity] = useState('');
  const [rentPerMonth, setRentPerMonth] = useState('');
  const [address, setAddress] = useState('');
  const [Loading, setLoading] = useState(false);

  const isDisabled = () => {
    return !(
      roomId !== '' &&
      roomNo !== '' &&
      roomType !== '' &&
      bedCapacity !== '' &&
      rentPerMonth !== '' &&
      address !== ''
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${apiUrl}/rooms/${roomId}`,
        {
          roomNo,
          roomType,
          bedCapacity,
          rentPerMonth,
          address,
        },
        {
          headers: { 'x-auth-token': cookies.load('x-auth-token') },
        },
      );
      Toast('', 'Successfully Updated the room', 'success');
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        Toast('Error', ex.response.data, 'error');
      } else if (ex.response && ex.response.status === 403) {
        Toast('Error', ex.response.data, 'error');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-5">
        <div
          className="jumbotron col-md-5 mx-5 my-5"
          style={{ borderRadius: '1%' }}
        >
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <form
                  className="needs-validation"
                  onSubmit={submitHandler}
                  noValidate
                >
                  <p className="h4 text-center mb-4">Update a Room</p>
                  <Input
                    name="roomId"
                    label="Room ID"
                    value={roomId}
                    handleChange={(e) => setRoomId(e.target.value)}
                  />

                  <Input
                    name="roomNo"
                    label="Room Number"
                    value={roomNo}
                    handleChange={(e) => setRoomNo(e.target.value)}
                  />
                  <Input
                    name="roomType"
                    label="Room Type"
                    value={roomType}
                    handleChange={(e) => setRoomType(e.target.value)}
                  />
                  <Input
                    name="bedCapacity"
                    label="Bed Capacity"
                    value={bedCapacity}
                    handleChange={(e) => setBedCapacity(e.target.value)}
                  />

                  <Input
                    name="rentPerMonth"
                    label="Rent Per Month"
                    type="text"
                    value={rentPerMonth}
                    handleChange={(e) => setRentPerMonth(e.target.value)}
                  />

                  <Input
                    name="address"
                    label="Address"
                    type="text"
                    value={address}
                    handleChange={(e) => setAddress(e.target.value)}
                  />

                  <div className="text-center mt-4">
                    <MDBBtn
                      color="dark"
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
                        'Add Room'
                      )}
                    </MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </>
  );
};

export default UpdateRoom;
