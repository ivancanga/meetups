import firebase from "../config/firebase";
import getWeather from "./API-services";

const firebaseServices = {
  getMeetups(setMeetups) {
    const meetups = [];
    firebase.db
      .collection("/meetups")
      .where("date", ">", new Date(Date.now()))
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          meetups.push(doc.data());
        });
        getWeather(meetups).then((meetups) => setMeetups(meetups));
      });
  },
  createMeetup(form) {
    return firebase.db
      .collection("meetups")
      .doc()
      .set({
        ...form,
      });
  },
};

export default firebaseServices;
