import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Input } from '../../components';
import http from '../../services/httpService';
import { apiUrl } from '../../config.json';
import Toast from '../../components/toast';

const AddBooking = () => {
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');
  const [rentalDays, setRentalDays] = useState('');
  const [Loading, setLoading] = useState(false);

  const isDisabled = () => {
    return !(roomId !== '' && userId !== '' && rentalDays !== '');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await http.post(`${apiUrl}/rooms/book`, {
        roomId,
        userId,
        rentalDays,
      });
      Toast('', 'Booking Successfull', 'success');
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
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
                  <p className="h4 text-center mb-4">Book a Room</p>
                  <Input
                    name="roomId"
                    label="Enter the Room ID"
                    value={roomId}
                    handleChange={(e) => setRoomId(e.target.value)}
                  />
                  <Input
                    name="userId"
                    label="Enter the user ID"
                    value={userId}
                    handleChange={(e) => setUserId(e.target.value)}
                  />
                  <Input
                    name="rentalDays"
                    label="Rental Days"
                    value={rentalDays}
                    handleChange={(e) => setRentalDays(e.target.value)}
                  />

                  <div className="text-center mt-4">
                    <MDBBtn
                      color="unique"
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
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </>
  );
};

export default AddBooking;
