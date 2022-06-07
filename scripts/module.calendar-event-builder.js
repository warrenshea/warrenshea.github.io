"use strict";

storm_eagle.module('calendar_event_builder', function () {
  var self; //add 4 hours to event

  var invite_details = {
    start_date: "2017-05-04",
    start_time: "13:00:00",
    end_date: "2017-05-04",
    end_time: "21:00:00",
    duration: "0800",
    timezone: "Europe/London",
    title: "Star Wars Day Party",
    description: "May the force be with you",
    location: "Tatooine",
    organizer: "Luke Skywalker",
    organizer_email: "luke@starwars.com"
  };
  return {
    initialize: function initialize() {
      self = storm_eagle["calendar_event_builder"];
      self.populate_form();
      self.populate_data_calendar_link();
      self.submit_listener();
    },
    populate_form: function populate_form() {
      document.querySelector("input[name=start_date]").value = invite_details.start_date;
      document.querySelector("input[name=start_time]").value = invite_details.start_time;
      document.querySelector("input[name=end_date]").value = invite_details.end_date;
      document.querySelector("input[name=end_time]").value = invite_details.end_time;
      document.querySelector("input[name=duration]").value = invite_details.duration;
      document.querySelector("input[name=timezone]").value = invite_details.timezone;
      document.querySelector("input[name=title]").value = invite_details.title;
      document.querySelector("input[name=description]").value = invite_details.description;
      document.querySelector("input[name=location]").value = invite_details.location;
      document.querySelector("input[name=organizer]").value = invite_details.organizer;
      document.querySelector("input[name=organizer_email]").value = invite_details.organizer_email;
    },
    populate_data_calendar_link: function populate_data_calendar_link() {
      var start_date, start_time, end_date, end_time;
      var outlookOnlineURL, googleURL, yahooURL, icalendar_url;
      start_date = storm_eagle.util.replace_all(invite_details.start_date, "-", "");
      end_date = storm_eagle.util.replace_all(invite_details.end_date, "-", "");
      outlookOnlineURL = "https://outlook.live.com/owa?rru=addevent&startdt=".concat(start_date, "T").concat(invite_details.start_time, "Z&enddt=").concat(end_date, "T").concat(invite_details.end_time, "Z&subject=").concat(encodeURIComponent(invite_details.title), "&location=").concat(encodeURIComponent(invite_details.location), "&body=").concat(encodeURIComponent(invite_details.description), "&allday=false&path=/calendar/view/Month");
      document.getElementById("outlook").setAttribute("href", outlookOnlineURL);
      start_time = storm_eagle.util.replace_all(invite_details.start_time, ": ", "");
      end_time = storm_eagle.util.replace_all(invite_details.end_time, ": ", "");
      document.getElementById("google").setAttribute("href", "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=".concat(start_date, "T").concat(start_time, "Z/").concat(end_date, "T").concat(end_time, "Z&location=").concat(encodeURIComponent(invite_details.location), "&text=").concat(encodeURIComponent(invite_details.title), "&invite_details=").concat(encodeURIComponent(invite_details.description)));
      document.getElementById("yahoo").setAttribute("href", "http://calendar.yahoo.com/?st=".concat(start_date, "T").concat(start_time, "Z&dur=").concat(invite_details.duration, "&view=d&v=60&type=20&title=").concat(encodeURIComponent(invite_details.title), "&in_loc=").concat(encodeURIComponent(invite_details.location), "&desc=").concat(encodeURIComponent(invite_details.description)));
      icalendar_url = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:\nX-PUBLISHED-TTL:P1W\nBEGIN:VEVENT\nUID:58dc86628ac31\nDTSTART:".concat(start_date, "T").concat(start_time, "Z\nSEQUENCE:0\nTRANSP:OPAQUE\nDTEND:").concat(end_date, "T").concat(end_time, "Z\nLOCATION:").concat(invite_details.location, "\nSUMMARY:").concat(invite_details.title, "\nCLASS:PUBLIC\nDESCRIPTION:").concat(invite_details.description, "\nORGANIZER:").concat(invite_details.organizer, "<").concat(invite_details.organizer_email, ">\nDTSTAMP:").concat(start_date, "T").concat(start_time, "Z\nEND:VEVENT\nEND:VCALENDAR");
      document.querySelector("#icalendar").innerHTML = icalendar_url;
    },
    submit_listener: function submit_listener() {
      function populate_json() {
        invite_details.start_date = document.querySelector("input[name=start_date]").value;
        invite_details.start_time = document.querySelector("input[name=start_time]").value;
        invite_details.end_date = document.querySelector("input[name=end_date]").value;
        invite_details.end_time = document.querySelector("input[name=end_time]").value;
        invite_details.duration = document.querySelector("input[name=duration]").value;
        invite_details.timezone = document.querySelector("input[name=timezone]").value;
        invite_details.title = document.querySelector("input[name=title]").value;
        invite_details.description = document.querySelector("input[name=description]").value;
        invite_details.location = document.querySelector("input[name=location]").value;
        invite_details.organizer = document.querySelector("input[name=organizer]").value;
        invite_details.organizer_email = document.querySelector("input[name=organizer_email]").value;
      }

      document.querySelector('form[name=calendar-form]').addEventListener("submit", function (event) {
        event.preventDefault(); // to stop the form from submitting

        populate_json();
        self.populate_data_calendar_link();
      });
    }
  };
});