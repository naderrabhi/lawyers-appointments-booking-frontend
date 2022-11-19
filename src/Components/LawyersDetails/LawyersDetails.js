import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProfile } from "../../JS/actions/profile";
import { getOneAppointmentOfLawyer } from "../../JS/actions/appointment";
import Modal from "react-bootstrap/Modal";
import Booking from "../Booking/Booking";
import Days from "../Days";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import "./lawyersdetails.css";

const LawyersDetails = () => {
  const { id } = useParams();
  const [value, onChange] = useState(new Date());
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  let date = new Date();
  let x = date.getDate();
  const utc = date.toJSON().slice(0, 8).replace(/-/g, "-") + x;
  // const [today, setToday] = useState(utc);
  const [show, setShow] = useState(false);
  const appointments = useSelector(
    (state) => state.appointment.lawyerAppointment
  );

  const user = useSelector((state) => state.auth.User);
  const profile = useSelector((state) => state.profile.Profile);
  const Loading = useSelector((state) => state.profile.loading);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getOneProfile(id));
    dispatch(
      getOneAppointmentOfLawyer(profile.lawyerID && profile.lawyerID._id, utc)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  function getDifference(array1, array2) {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.hour === object2.hour;
      });
    });
  }

  const handleChange = (e) => {
    dispatch(
      getOneAppointmentOfLawyer(
        profile.lawyerID && profile.lawyerID._id,
        e.toJSON().slice(0, 8).replace(/-/g, "-") + e.getDate()
      )
    );
    setDay(e.toJSON().slice(0, 8).replace(/-/g, "-") + e.getDate());
  };

  const handleGetAppointment = (hour) => {
    setHour(hour);
    handleShow();
  };

  return (
    <div className="lawyer--details section__padding">
      {Loading ? (
        <LoadingSpinner />
      ) : (
        <div className="container lawyer--container">
          <div className="row lawyer--details_row lawyer--container_info">
            <img
              className="lawyer--details_img"
              src={profile.image}
              alt={profile.lawyerID && profile.lawyerID.firstName}
            />
            <div>
              <h1>
                {profile.lawyerID && profile.lawyerID.firstName}{" "}
                {profile.lawyerID && profile.lawyerID.lastName}
              </h1>
              <p>Address : {profile.address}</p>
              <p>Bio : {profile.bio}</p>
              <p>Email : {profile.lawyerID && profile.lawyerID.email}</p>
              <p>
                Speciality : {profile.lawyerID && profile.lawyerID.specialty}
              </p>
              <p>Phone : {profile.phone}</p>
            </div>
          </div>
          <div className="row lawyer--details_row">
            <div className="calendar">
              <p>Get your appointment</p>
              <Calendar
                defaultActiveStartDate={value}
                onChange={onChange}
                onClickDay={handleChange}
              />
              {(user.role === "client" ||
                user._id === profile.lawyerID._id) && (
                <div className="btn-calendar">
                  {appointments.length > 0
                    ? getDifference(Days, appointments).map((el, i) => (
                        <button
                          className="mb-2"
                          key={i}
                          onClick={() => handleGetAppointment(el.hour)}
                        >
                          {el.hour}h
                        </button>
                      ))
                    : Days.map((el, i) => (
                        <button
                          key={i}
                          className="mb-2"
                          onClick={() => handleGetAppointment(el.hour)}
                        >
                          {el.hour}h
                        </button>
                      ))}
                </div>
              )}
              <div className="lawyer--details_btn">
                <Modal show={show} onHide={handleClose}>
                  <Booking
                    handleClose={handleClose}
                    id={profile.lawyerID && profile.lawyerID._id}
                    day={day}
                    hour={hour}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyersDetails;
