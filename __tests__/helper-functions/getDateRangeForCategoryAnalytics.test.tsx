import { getDateRangeForCategoryAnalytics } from "@/utils/HelperFunctions";

describe("getDateRangeForCategoryAnalytics should return the correct start and end dates for category analytics in the format of dd-mm-YYYY HH:MM:SS", () => {

    it("for date created falling on the last day of the month", () => {
        const dates = getDateRangeForCategoryAnalytics("30-04-2025 23:59:59")
        expect (dates[0]).toBe("01-10-2024 00:00:00")
        expect(dates[1]).toBe("31-03-2025 23:59:59"); 
    });

    it("for date created falling on the first day of the month", () => {
        const dates = getDateRangeForCategoryAnalytics("01-12-2024 00:00:00")
        expect (dates[0]).toBe("01-06-2024 00:00:00")
        expect(dates[1]).toBe("30-11-2024 23:59:59"); 
    });

    it("for date created falling in the middle of the month", () => {
        const dates = getDateRangeForCategoryAnalytics("14-12-2024 00:00:00")
        expect (dates[0]).toBe("01-06-2024 00:00:00")
        expect(dates[1]).toBe("30-11-2024 23:59:59"); 
    });
});
