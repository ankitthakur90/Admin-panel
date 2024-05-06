const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
// var nodemailer = require("nodemailer");

const JWT_SECRET =
  "annnauuuuankitsgf9d-0(97&akdjftylkfjlnjafl873458014adkfjkldcde2211";

const mongoUrl =
  "mongodb+srv://ankitthakur:Fliper@cluster0.mdpsnax.mongodb.net/?retryWrites=true&w=majority&appName=cluster0";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

app.post("/post", async (req, res) => {
  const { data } = req.body;
  console.log(req.body);

  console.log("Received data:", data);

  try {
    if (data == "ankit") {
      res.send({ statusbar: "ok" });
    } else {
      res.send({ statusbar: "User Not found" });
    }
  } catch (error) {
    res.send({ statusbar: "Something went wrong" });
  }
});

require("./userDetails");
const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.get("/getAllUser", async (req, res) => {
    try {
      const allUser = await User.find({});
      res.send({ status: "ok", data: allUser });
    } catch (error) {
      console.log(error);
    }
  });





app.listen(5000, () => {
  console.log("Server Started");
});
