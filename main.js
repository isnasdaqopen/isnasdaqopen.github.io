function nasdaqStatus(currentDateISOString) {
	// TODO: hardcoded offset 
    // TODO: adjust for Daylight Saving
    var nasdaqTimeOffset = "-05:00";

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

//setInterval(function(){ myTimer() }, 1000);

function myTimer() {
    var time = (new Date()).toLocaleTimeString();
    var status = nasdaqStatus();
    $('#status').html(status.currentStatus);
    $('#timeUntilNextStatus').html(status.timeUntilNextStatus);
}

myTimer();
