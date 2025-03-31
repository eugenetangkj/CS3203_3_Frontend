import '@testing-library/jest-dom'
import { getCurrentDateTime } from '@/utils/HelperFunctions';

describe("getCurrentDateTime", () => {
    beforeAll(() => {
        //Mock the system time to always return a fixed date-time
        jest.useFakeTimers().setSystemTime(new Date("2025-01-31T14:15:30Z"));
    });

    afterAll(() => {
        //Restore real timers
        jest.useRealTimers();
    });

    it("should return the current date-time in the format of dd-mm-YYYY HH:MM:SS", () => {
        const result = getCurrentDateTime();
        expect(result).toBe("31-01-2025 14:15:30");
    });
});