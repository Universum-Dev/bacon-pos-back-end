"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDataExpiration = void 0;
const checkDataExpiration = (timestampToCheck, timeToCheck) => {
    const dataTimestamp = timestampToCheck;
    const currentTimestamp = new Date().getTime();
    let differenceTimestamp = dataTimestamp > currentTimestamp
        ? dataTimestamp - currentTimestamp
        : currentTimestamp - dataTimestamp;
    const daysDifference = Math.floor(differenceTimestamp / 1000 / 60 / 60 / 24);
    differenceTimestamp -= daysDifference * 1000 * 60 * 60 * 24;
    const hoursDifference = Math.floor(differenceTimestamp / 1000 / 60 / 60);
    differenceTimestamp -= hoursDifference * 1000 * 60 * 60;
    const minutesDifference = Math.floor(differenceTimestamp / 1000 / 60);
    differenceTimestamp -= minutesDifference * 1000 * 60;
    const secondsDifference = Math.floor(differenceTimestamp / 1000);
    console.log(timeToCheck, daysDifference, hoursDifference, minutesDifference);
    if (timeToCheck === "one-hour" &&
        daysDifference === 0 &&
        hoursDifference < 1) {
        return true;
    }
    else if (timeToCheck === "one-hour" &&
        daysDifference === 0 &&
        hoursDifference === 1 &&
        minutesDifference === 0 &&
        secondsDifference >= 0) {
        return false;
    }
    else if (timeToCheck === "ten-minutes" &&
        daysDifference === 0 &&
        hoursDifference === 0 &&
        minutesDifference < 10) {
        return true;
    }
    else if (timeToCheck === "ten-minutes" &&
        daysDifference === 0 &&
        hoursDifference === 0 &&
        minutesDifference === 10 &&
        secondsDifference >= 0) {
        return false;
    }
    else if (timeToCheck === "five-minutes" &&
        daysDifference === 0 &&
        hoursDifference === 0 &&
        minutesDifference < 5) {
        return true;
    }
    else if (timeToCheck === "five-minutes" &&
        daysDifference === 0 &&
        hoursDifference === 0 &&
        minutesDifference === 5 &&
        secondsDifference >= 0) {
        return false;
    }
    else if (timeToCheck === "two-minutes" &&
        daysDifference === 0 &&
        hoursDifference === 0 &&
        minutesDifference < 2) {
        return true;
    }
    else if (timeToCheck === "two-minutes" &&
        daysDifference === 0 &&
        hoursDifference === 0 &&
        minutesDifference === 2 &&
        secondsDifference >= 0) {
        return false;
    }
    else {
        return false;
    }
};
exports.checkDataExpiration = checkDataExpiration;
