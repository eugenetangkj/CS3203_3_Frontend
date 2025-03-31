import { getDateTimeOneYearAgoAndSetToStart } from "@/utils/HelperFunctions";

describe("getDateTimeOneYearAgoAndSetToStart should return the datetime from one year ago and set timing to the first day of the month at 00:00:00, in the format of dd-mm-YYYY HH:MM:SS", () => {
    afterAll(() => {
        //Restore real timers
        jest.useRealTimers();
    });

    it("for dates falling on the last day of the month", () => {
        jest.useFakeTimers().setSystemTime(new Date("2025-05-31T14:15:30Z"))
        const result = getDateTimeOneYearAgoAndSetToStart();
        expect(result).toBe("01-05-2024 00:00:00"); 
    });

    it("for dates falling on the first day of the month", () => {
        jest.useFakeTimers().setSystemTime(new Date("2025-05-01T08:15:30Z"));
        const result = getDateTimeOneYearAgoAndSetToStart();
        expect(result).toBe("01-05-2024 00:00:00"); 
    });

    it("for dates falling in the middle of the month", () => {
        jest.useFakeTimers().setSystemTime(new Date("2025-05-16T14:15:30Z"))
        const result = getDateTimeOneYearAgoAndSetToStart();
        expect(result).toBe("01-05-2024 00:00:00"); 
    });

});
