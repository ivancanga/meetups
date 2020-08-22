import firebase from "../config/firebase";
import getWeather from "./API-services";

const firebaseServices = {
  getMeetups(setMeetups, setUpdating) {
    setUpdating(true);
    const meetups = [];
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    firebase.db
      .collection("/meetups")
      .where("date", ">", today)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          meetups.push(doc.data());
        });
        getWeather(meetups).then((meetups) => {
          setMeetups(meetups);
          setUpdating(false);
        });
      });
  },
  createMeetup(form) {
    form.uuid = new Date().getTime().toString();
    return firebase.db
      .collection("meetups")
      .doc(form.uuid)
      .set({
        ...form,
      });
  },
};

export default firebaseServices;
