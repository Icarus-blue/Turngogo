const item = {
    localgymservices: 0.02,
    individualservice: 0.01,
    callservice: 0.1,
    chattingservices: 0.1
}
const localgymCalculator = (time) => {
    const [hoursString, minutesString, secondsString] = time.split(":");
    const hours = parseInt(hoursString, 10);
    const minutes = parseInt(minutesString, 10);
    const seconds = parseInt(secondsString, 10);

    const timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
    return timeInSeconds * item.localgymservices;
}

const individualCalculator = (time) => {
    const [hoursString, minutesString, secondsString] = time.split(":");
    const hours = parseInt(hoursString, 10);
    const minutes = parseInt(minutesString, 10);
    const seconds = parseInt(secondsString, 10);

    const timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
    return timeInSeconds * item.individualservice;

}

export const calculator = {
    localgymCalculator,
    individualCalculator
}