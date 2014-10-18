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