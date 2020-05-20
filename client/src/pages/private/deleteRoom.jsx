import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import http from '../../services/httpService';
import { Input } from '../../components';
import { apiUrl } from '../../config.json';
import Toast from '../../components/toast';

const DeleteRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [Loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await http.delete(
        `${apiUrl}/rooms/delete/${roomId}`,
      );
      setRoomId('');
      Toast('', data, 'success');
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
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
                <p className="h4 text-center mb-4">Delete a Room</p>
                <Input
                  name="name"
                  label="Room ID"
                  value={roomId}
                  handleChange={(e) => setRoomId(e.target.value.trim())}
                />

                <div className="text-center mt-4">
                  <MDBBtn
                    color="default"
                    type="submit"
                    onClick={handleDelete}
                    disabled={roomId === ''}
                  >
                    {Loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      'Delete Room'
                    )}
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </>
  );
};

export default DeleteRoom;
