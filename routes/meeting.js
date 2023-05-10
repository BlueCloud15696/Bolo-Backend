const express = require("express");
let Meeting = require("../models/meeting").Meeting;
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");
const zoom_email = "yismawmintesnot@gmail.com"; // your zoom developer email account
const {
  client_id,
  client_secret,
  refresh_token,
  user_name,
  email_password,
} = require("../constants/envConstants");

let router = express.Router();
const { zoom_api_key, zoom_api_secret } = require("../constants/envConstants");

const payload = {
  iss: zoom_api_key, //your API KEY
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, zoom_api_secret);

router.post("/schedule-meeting", async (req, res) => {
  const { first_name, last_name, email, company_size, budget, date, timeSlot } =
    req.body;
  try {
    // format date and time
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const formattedTime = moment(timeSlot, "h:mm a").format("HH:mm");

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b5757c83db1758",
        pass: "ba21f5bc7a9f60",
      },
    });

    var options = {
      method: "POST",
      uri: "https://api.zoom.us/v2/users/" + zoom_email + "/meetings",
      body: {
        topic: `Meeting with ${first_name} ${last_name}`, //meeting title
        type: 2, // scheduled meeting
        start_time: moment(`${formattedDate} ${formattedTime}`).toISOString(), //new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
        duration: 30, // 30-minute meeting
        settings: {
          host_video: "true",
          participant_video: "true",
        },
      },
      auth: {
        bearer: token,
      },
      headers: {
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json",
      },
      json: true, //Parse the JSON string in the response
    };

    const response = await requestPromise(options);

    const managerMailOptions = {
      from: user_name,
      to: user_name,
      subject: `Meeting with ${first_name} ${last_name} on ${formattedDate} at ${formattedTime}`,
      html: `
      <div style="background-color: #f6f6f6; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 20px;">
          
          <h1 style="display: block; max-width: 200px; margin: auto; margin-bottom: 20px;">Bolo</h1>
          <p style="font-size: 18px;">A new meeting has been scheduled with:</p>
          <ul>
            <li><strong>Name:</strong> ${first_name} ${last_name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Company Size:</strong> ${company_size}</li>
            <li><strong>Budget:</strong> ${budget}</li>
            <li><strong>Date:</strong> ${formattedDate}</li>
            <li><strong>Time:</strong> ${formattedTime}</li>
          </ul>          
          <div style="text-align: center; margin-top: 20px;">
            <a href="${response.join_url}" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Join Meeting</a>
          </div>
        </div>
      </div>
    `,
    };
    await transporter.sendMail(managerMailOptions);
    const userMailOptions = {
      from: user_name,
      to: email,
      subject: "New Meeting Scheduled",
      text: `Your meeting with the manager has been scheduled. Date: ${formattedDate}, Time: ${formattedTime}. Here is the Zoom meeting link: ${response.join_url}`,
      html: `
      <div style="background-color: #f6f6f6; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 20px;">
          
          <h1 style="display: block; max-width: 200px; margin: auto; margin-bottom: 20px;">Bolo</h1>
          <p style="font-size: 18px;">Your meeting with the manager has been scheduled. Date: ${formattedDate}, Time: ${formattedTime}.</p>                   
          <div style="text-align: center; margin-top: 20px;">
            <a href="${response.join_url}" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Join Meeting</a>
          </div>
        </div>
      </div>
    `,
    };
    await transporter.sendMail(userMailOptions);

    // Save the meeting details to MongoDB
    const meeting = new Meeting({
      date: new Date(date),
      timeSlot: timeSlot,
      email: email,
      first_name: first_name,
      last_name: last_name,
      company_size: company_size,
      budget: budget,
    });

    await meeting.save();

    res.status(200).json({
      message: "Meeting scheduled successfully",
      meeting: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to schedule meeting" });
  }
});

router.get("/available-time-slots/:date", async (req, res) => {
  const { date } = req.params;

  try {
    const existingMeetings = await Meeting.find({ date: new Date(date) });

    const timeSlots = [];

    for (let i = 4; i <= 11; i++) {
      const time = i + ":00 am";
      const booked = existingMeetings.some(
        (meeting) => meeting.timeSlot === time
      );

      timeSlots.push({ time: time, booked: booked });

      if (i !== 11) {
        const halfHour = i + ":30 am";
        const booked = existingMeetings.some(
          (meeting) => meeting.timeSlot === halfHour
        );

        timeSlots.push({ time: halfHour, booked: booked });
      }
    }

    res.status(200).json({ timeSlots: timeSlots });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve available time slots" });
  }
});

module.exports = router;
