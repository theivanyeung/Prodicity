const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createDailyStat = functions.pubsub
    .schedule("0 0 * * *")
    .timeZone("UTC")
    .onRun(function(context) {
      return admin
          .firestore()
          .collection("users")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const user = doc.data();
              const userId = doc.id;
              const dailyStat = {
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                views: user.totalAttendees ? user.totalAttendees : 0,
                followers: user.followers ? user.followers.length : 0,
                earnings: user.money ? user.money : 0,
              };
              return admin
                  .firestore()
                  .collection(`users/${userId}/analytics`)
                  .add(dailyStat);
            });
          });
    });

exports.deleteOldEvents = functions.pubsub
    .schedule("0 0 * * *")
    .timeZone("UTC")
    .onRun(function(context) {
      return admin
          .firestore().collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((userDoc) => {
              userDoc.ref.collection("events").get().then((eventSnapshot) => {
                eventSnapshot.forEach((eventDoc) => {
                  const batch = admin.firestore().batch();

                  const eventData = eventDoc.data();
                  const providedDate = "2023-02-08 2:10 PM";

                  let isExpired = false;
                  const dateYear = parseInt(providedDate.substring(0, 4));
                  const dateMonth = parseInt(providedDate.substring(5, 7)) - 1;
                  const dateDay = parseInt(providedDate.substring(8, 10));
                  const dateHour = parseInt(providedDate.substring(11, 13));
                  const dateMinute = dateHour > 9 ?
                  parseInt(providedDate.substring(14, 16)) :
                  parseInt(providedDate.substring(13, 15));
                  const datePeriod = providedDate.slice(-2);
                  const today = new Date();
                  let currentHour = today.getHours();
                  const currentMinute = today.getMinutes();
                  let currentPeriod = "AM";
                  const oneDayAgo =
                  new Date(today.getTime() - 1000 * 60 * 60 * 24);

                  if (currentHour >= 12) {
                    currentPeriod = "PM";
                    if (currentHour > 12) {
                      currentHour -= 12;
                    }
                  }

                  if (currentHour === 0) {
                    currentHour = 12;
                  }

                  if (dateYear < oneDayAgo.getFullYear()) {
                    isExpired = true;
                  } else if (dateYear === oneDayAgo.getFullYear()) {
                    if (dateMonth < oneDayAgo.getMonth()) {
                      isExpired = true;
                    } else if (
                      dateMonth === oneDayAgo.getMonth() &&
                      dateDay < oneDayAgo.getDate()
                    ) {
                      isExpired = true;
                    } else if (
                      dateMonth === oneDayAgo.getMonth() &&
                      dateDay === oneDayAgo.getDate()
                    ) {
                      if (currentPeriod === "PM" && datePeriod === "AM") {
                        isExpired = true;
                      } else if (
                        currentHour > dateHour ||
                        (currentHour ===
                          dateHour && currentMinute >= dateMinute)
                      ) {
                        isExpired = true;
                      }

                      if (currentPeriod === "PM" && datePeriod === "AM") {
                        isExpired = true;
                      } else if (!(currentPeriod === "AM" &&
                                  datePeriod === "PM")) {
                        if (
                          currentHour > dateHour ||
                          (currentHour === dateHour &&
                          currentMinute >= dateMinute)
                        ) {
                          isExpired = true;
                        }
                      }
                    }
                  }

                  if (isExpired === true && eventData.isLive === false) {
                    const eventRef = admin
                        .firestore()
                        .collection("users")
                        .doc(userDoc.id)
                        .collection("events")
                        .doc(eventDoc.id);

                    // Deleting subcollections

                    const chatRef = eventRef
                        .collection("chat");

                    const annoucementRef = eventRef
                        .collection("annoucement");

                    const attendeesRef = eventRef
                        .collection("attendees");

                    const votingRef = eventRef
                        .collection("voting");

                    annoucementRef.get().then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        batch.delete(doc.ref);
                      });

                      attendeesRef.get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          batch.delete(doc.ref);
                        });

                        votingRef.get().then((querySnapshot) => {
                          querySnapshot.forEach((doc) => {
                            batch.delete(doc.ref);
                          });

                          chatRef.get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                              batch.delete(doc.ref);
                            });

                            batch.delete(eventRef);

                            return batch.commit();
                          });
                        });
                      });
                    });
                  }
                });
              });
            });
          });
    });

exports.deleteThumbnail = functions.firestore
    .document("users/{userId}/events/{eventId}")
    .onDelete(function(snap, context) {
      const eventData = snap.data();
      const u = context.params.userId;
      const e = context.params.eventId;
      const t = eventData.thumbnailName;
      const filePath = `${u}/events/${e}/thumbnail/${t}`;
      const file = admin.storage().bucket().file(filePath);

      return file.delete();
    });

exports.refundAttendees = functions.firestore
    .document("users/{userId}/events/{eventId}")
    .onDelete(function(snap, context) {
      const eventData = snap.data();
      const userId = context.params.userId;
      const eventId = context.params.eventId;
      const refundAmount = eventData.price * 100;
      if (eventData.isLive) {
        const attendeesRef = admin
            .firestore()
            .collection(`users/${userId}/events/${eventId}/attendees`);
        return attendeesRef
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                admin
                    .firestore()
                    .doc(`users/${doc.id}`)
                    .update({
                      money: admin
                          .firestore.FieldValue.increment(refundAmount),
                    });
              });
              return true;
            })
            .catch((err) => {
              console.error(err);
              return err;
            });
      }
    });
