import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import http from '../../services/httpService';
import { apiUrl } from '../../config.json';
import { Input } from '../../components';
import Toast from '../../components/toast';

const RoomDetails = () => {
  const [roomId, setRoomId] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [roomType, setRoomType] = useState('');
  const [bedCapacity, setBedCapacity] = useState('');
  const [rentPerMonth, setRentPerMonth] = useState('');
  const [address, setAddress] = useState('');
  const [bookings, setBookings] = useState([]);
  const [RenderView, setRenderView] = useState(false);
  const [Loading, setLoading] = useState(false);

  const handleChange = async () => {
    setLoading(true);
    try {
      const { data } = await http.get(`${apiUrl}/rooms/status/${roomId}`);
      setRoomNo(data.roomNo);
      setRoomType(data.roomType);
      setBedCapacity(data.bedCapacity);
      setRentPerMonth(data.rentPerMonth);
      setAddress(data.address);
      setBookings(data.status.bookings);
      setRenderView(true);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        Toast('Error', 'Room with the given ID doesnt exist', 'error');
      } else if (ex.response && ex.response.status === 403) {
        Toast(
          'Error',
          'Cannot delete the room as its already been booked',
          'error',
        );
      }
    }
    setLoading(false);
  };

  const getBookingStatus = () => {
    if (!bookings.length) {
      return (
        <h6 className="h6-responsive text-center my-1">
          This room has not been booked by anybody yet
        </h6>
      );
    }
    return bookings.map((item) => (
      <ul className="list-group">
        <li className="list-group-item" key={item._id}>
          <strong> User </strong>: {item.userId.name}
        </li>
        <li className="list-group-item" key={item._id}>
          <strong> Check In Date </strong>: {item.bookingSlot.checkInDate}
          <br />
          <strong> Check Out Date </strong>:{item.bookingSlot.checkOutDate}
        </li>
        <br />
      </ul>
    ));
  };

  const renderView = () => {
    if (!RenderView) {
      return (
        <div className="text-center justify-content-center">
          <p className="h4 text-center mb-4">Enter the Room ID</p>
          <Input
            name="roomId"
            label="Room ID"
            value={roomId}
            handleChange={(e) => setRoomId(e.target.value.trim())}
          />
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleChange}
            disabled={roomId === ''}
          >
            {Loading ? (
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Get Details'
            )}
          </button>
        </div>
      );
    }

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <p className="h4 text-center mb-4">Room No :{roomNo}</p>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Room Type</strong> : {roomType}
              </li>
              <li className="list-group-item">
                <strong> Bed Capacity </strong>: {bedCapacity}
              </li>
              <li className="list-group-item">
                <strong>Rent Per Month</strong> : {rentPerMonth}
              </li>
              <li className="list-group-item">
                <strong>Address</strong> : {address}
              </li>
            </ul>

            <p className="h5-responsive text-center my-3">
              Booking Status
            </p>
            {getBookingStatus()}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-5">
        <div
          className="jumbotron col-md-5 mx-5 my-5"
          style={{ borderRadius: '2%' }}
        >
          {renderView()}
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
