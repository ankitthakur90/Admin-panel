import React, { Component, useEffect, useState } from "react";

export default function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <div className="user-info">
      <h2>User Information</h2>
      <p>
        <strong>FirstName:</strong> {userData.fname} {userData.lastName}
      </p>
      <p>
        <strong>Lastname:</strong> {userData.lname} {userData.lastName}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <button onClick={logOut} className="btn btn-primary">
        Log Out
      </button>
    </div>
  );
}
