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

describe("Timezone: EST", function () {
    it("Friday 09:29", function () {
        var result = nasdaqStatus('2014-01-24T09:29:59-05:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.timeUntilNextStatus).toBe('0 hours 1 minutes');
    });
    it("Friday 09:30", function () {
        expect(nasdaqStatus('2014-01-24T09:30:00-05:00').currentStatus).toBe('OPEN');
    });
    it("Friday 16:00", function () {
        expect(nasdaqStatus('2014-01-24T16:00:00-05:00').currentStatus).toBe('OPEN');
    });
    it("Friday 16:01", function () {
        var result = nasdaqStatus('2014-01-24T16:01:00-05:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.timeUntilNextStatus).toBe('17 hours 29 minutes');
    });
    it("Saturday", function () {
        expect(nasdaqStatus('2014-01-26T10:00:00-05:00').currentStatus).toBe('CLOSED');
        //expect(result.timeUntilNextStatus).toBe('24*2-0.5 hours 0 minutes');
    });
    it("Sunday", function () {
        expect(nasdaqStatus('2014-01-26T10:00:00-05:00').currentStatus).toBe('CLOSED');
    });
});

describe("Timezone: EET", function () {
    it("Sunday", function () {
        expect(nasdaqStatus('2014-01-26T10:00:00+02:00').currentStatus).toBe('CLOSED');
    });
    it("Monday 10:00", function () {
        expect(nasdaqStatus('2014-01-27T10:00:00+02:00').currentStatus).toBe('CLOSED');
    });
    it("Monday 22:59", function () {
        expect(nasdaqStatus('2014-01-27T22:59:00+02:00').currentStatus).toBe('OPEN');
    });
    it("Monday 23:01", function () {
        expect(nasdaqStatus('2014-01-27T23:01:00+02:00').currentStatus).toBe('CLOSED');
    });
    it("Monday 23:01, summer time", function () {
        expect(nasdaqStatus('2014-10-15T23:01:00+03:00').currentStatus).toBe('CLOSED');
    });
});