import firebase from "../config/firebase";
import getWeather from "./API-services";

const firebaseServices = {
  loginUser(userId, setAuth) {
    firebase.db
      .doc(`users/${userId}`)
      .get()
      .then((doc) => {
        setAuth({ isAuth: true, dataUser: doc.data() });
      });
  },
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
  suscribeMeetup(uuid, userId, setLoading) {
    setLoading(true);
    firebase.db
      .doc(`meetups/${uuid}`)
      .update({
        assistants: firebase.firestore.FieldValue.arrayUnion(userId),
      })
      .then(() => {
        firebase.db.doc(`users/${userId}`).update({
          meetups: firebase.firestore.FieldValue.arrayUnion(uuid),
        });
        
        setLoading(false);
      });
  },
};

export default firebaseServices;
