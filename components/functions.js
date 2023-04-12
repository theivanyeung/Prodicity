import { Month } from "./items";

// UNIT CONVERSION

export const numUnitConversion = (num) => {
  return Intl.NumberFormat("en", {
    notation: "compact",
  }).format(num);
};

export const priceUnitConversion = (num) => {
  return num * 100;
};

// CREATE PRICE

export const createPrice = (wholeNum, fracNum) => {
  return parseFloat(`${wholeNum}`) + parseFloat(`.${fracNum}`);
};

// FORMAT DATE

export const formatTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const formatDate = (date) => {
  // 2022-09-29 10:55 PM
  let period;
  if (date.substring(date.length - 2, date.length) === "PM") {
    period = "pm";
  } else {
    period = "am";
  }
  return `${Month[parseInt(date.substring(5, 7)) - 1].short} ${date.substring(
    8,
    10
  )} ${date.substring(0, 4)} ${date.substring(11, 16)}${period}`;
};

// GET CURRENT DATE FORMATTED

export const getCurrentDate = () => {
  // 10/2/2022
  // 8:47:12 PM
  const date = new Date().toLocaleDateString();
  let year;
  let month;
  let day;
  let count;
  for (let n = 0; n < date.length; n++) {
    if (date.charAt(n) == "/") {
      if (month) {
        if (day) {
        } else {
          day = date.substring(count + 1, n);
          count = n;
        }
      } else {
        month = date.substring(0, n);
        count = n;
      }
    }
  }
  year = date.substring(count + 1, date.length);
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

// CHECK IF CURRENT DATE IS PAST PROVIDED DATE

export const checkDateOpen = (providedDate) => {
  let isOpen = false;
  const dateYear = parseInt(providedDate.substring(0, 4));
  const dateMonth = parseInt(providedDate.substring(5, 7)) - 1;
  const dateDay = parseInt(providedDate.substring(8, 10));
  const dateHour = parseInt(providedDate.substring(11, 13));
  const dateMinute =
    dateHour > 9
      ? parseInt(providedDate.substring(14, 16))
      : parseInt(providedDate.substring(13, 15));
  const datePeriod = providedDate.slice(17, 19);
  const today = new Date();
  let currentHour = today.getHours();
  let currentMinute = today.getMinutes();
  let currentPeriod = "AM";

  if (currentHour >= 12) {
    currentPeriod = "PM";
    if (currentHour > 12) {
      currentHour -= 12;
    }
  }

  if (currentHour === 0) {
    currentHour = 12;
  }

  if (dateYear < today.getFullYear()) {
    isOpen = true;
  } else if (dateYear === today.getFullYear()) {
    if (dateMonth < today.getMonth()) {
      isOpen = true;
    } else if (dateMonth === today.getMonth() && dateDay < today.getDate()) {
      isOpen = true;
    } else if (dateMonth === today.getMonth() && dateDay === today.getDate()) {
      if (currentPeriod === "PM" && datePeriod === "AM") {
        isOpen = true;
      } else if (!(currentPeriod === "AM" && datePeriod === "PM")) {
        if (
          currentHour > dateHour ||
          (currentHour === dateHour && currentMinute >= dateMinute)
        ) {
          isOpen = true;
        }
      }
    }
  }

  return isOpen;
};

// CHECK IF CURRENT DATE IS EXPIRED

export const checkDateExpired = (providedDate) => {
  let isExpired = false;
  const dateYear = parseInt(providedDate.substring(0, 4));
  const dateMonth = parseInt(providedDate.substring(5, 7)) - 1;
  const dateDay = parseInt(providedDate.substring(8, 10));
  const dateHour = parseInt(providedDate.substring(11, 13));
  const dateMinute =
    dateHour > 9
      ? parseInt(providedDate.substring(14, 16))
      : parseInt(providedDate.substring(13, 15));
  const datePeriod = providedDate.substring(17, 19);
  const today = new Date();
  let currentHour = today.getHours();
  let currentMinute = today.getMinutes();
  let currentPeriod = "AM";
  let oneDayAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24);

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
        (currentHour === dateHour && currentMinute >= dateMinute)
      ) {
        isExpired = true;
      }
    }
  }

  return isExpired;
};

// CHANGE TIME ZONE

export const changeTimeZone = (date, timeZone) => {
  if (typeof date === "string") {
    return new Date(
      new Date(date).toLocaleString("en-US", {
        timeZone,
      })
    );
  }

  return new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );
};
