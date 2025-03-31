import { getDateTimeOneMonthAgoAndSetToEnd } from "@/utils/HelperFunctions";

describe("getDateTimeOneYearAgoAndSetToStart should return the datetime from one month ago and set timing to the last day of the month at 23:59:59, in the format of dd-mm-YYYY HH:MM:SS", () => {
    afterAll(() => {
        //Restore real timers
        jest.useRealTimers();
    });

    it("for dates falling on the last day of the month", () => {
        jest.useFakeTimers().setSystemTime(new Date("2025-05-31T14:15:30Z"))
        const result = getDateTimeOneMonthAgoAndSetToEnd();
        expect(result).toBe("30-04-2025 23:59:59"); 
    });

    it("for dates falling on the first day of the month", () => {
        jest.useFakeTimers().setSystemTime(new Date("2025-05-01T08:15:30Z"));
        const result = getDateTimeOneMonthAgoAndSetToEnd();
        expect(result).toBe("30-04-2025 23:59:59"); 
    });

    it("for dates falling in the middle of the month", () => {
        jest.useFakeTimers().setSystemTime(new Date("2025-05-16T14:15:30Z"))
        const result = getDateTimeOneMonthAgoAndSetToEnd();
        expect(result).toBe("30-04-2025 23:59:59"); 
    });
});
