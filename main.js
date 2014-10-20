function nasdaqStatus(currentDateISOString) {
	// TODO: hardcoded offset 
    // TODO: adjust for Daylight Saving
    var nasdaqTimeOffset = "-05:00";

    if(typeof moment === 'undefined')
    	$('#adblockingAlert').html("Are you using some adblocking software? Try switching it off for this site.");

    var now = moment(currentDateISOString).zone(nasdaqTimeOffset);
    console.log(now.format());

    var closestBusinessDay = moment(now);
    if (!isWorkingDay(now)) 
        return {currentStatus: 'CLOSED'};

    var openDate = moment(now).hour(9).minute(30).second(0);
    console.log(openDate.format());

    var closeDate = moment(now).hour(16).minute(0).second(0);
    console.log(closeDate.format());

    if (now.isBefore(openDate)) 
        return {currentStatus: 'CLOSED', timeUntilNextStatus: durationToString(moment.duration(1, 'minutes'))};
    
    if (now.isAfter(closeDate)) {
        var nextOpenDate = nextWorkingDay(now).hour(9).minute(30).second(0);
        var timeToWait = moment.duration(nextOpenDate.diff(now, 'seconds'), 'seconds');
        return {currentStatus: 'CLOSED', timeUntilNextStatus: durationToString(timeToWait)};
    }

    return {currentStatus: 'OPEN'};
}

function isWorkingDay(now) {
    var SUNDAY = 0;
    var SATURDAY = 6;
    return !(now.day() == SUNDAY || now.day() == SATURDAY);
}

function nextWorkingDay(now) {
    var candidate = moment(now).add('days', 1);
    while(!isWorkingDay(candidate))
        candidate = candidate.add('days', 1);
    return candidate;
}

function durationToString(duration) {
    return duration.hours() + ' hours ' + duration.minutes() + ' minutes';
}

//set the date we're counting down to
var utcToEsternTimeOffsetHours = 4;
var targetDate = new Date(Date.UTC(2014, 10-1, 20, 16 + utcToEsternTimeOffsetHours, 00)).getTime();

function countdownMessage(now) {
    // find the amount of "seconds" between now and target
    var secondsLeft = (targetDate - now) / 1000;
 
    // do some time calculations
    var days = parseInt(secondsLeft / 86400);
    secondsLeft = secondsLeft % 86400;
     
    var hours = parseInt(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;
     
    var minutes = parseInt(secondsLeft / 60);
    var seconds = parseInt(secondsLeft % 60);
     
    return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

function myTimer() {
    var status = nasdaqStatus();
    $('#status').html(status.currentStatus);
    var now = new Date().getTime();
    $('#timeUntilNextStatus').html(countdownMessage(now));
}

setInterval(myTimer, 1000);
