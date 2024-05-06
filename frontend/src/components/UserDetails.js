import React, { Component, useEffect, useState } from "react";
import AdminHome from "./adminHome";

import UserHome from "./userHome";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
    const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);

        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

//   return (
//     <div className="user-info">
//       <h2>User Information</h2>
//       <p>
//         <strong>FirstName:</strong> {userData.fname} {userData.lastName}
//       </p>
//       <p>
//         <strong>Lastname:</strong> {userData.lname} {userData.lastName}
//       </p>
//       <p>
//         <strong>Email:</strong> {userData.email}
//       </p>
//       <button onClick={logOut} className="btn btn-primary">
//         Log Out
//       </button>
//     </div>
//   );
return admin ? <AdminHome/>: <UserHome userData={userData} />;
}
