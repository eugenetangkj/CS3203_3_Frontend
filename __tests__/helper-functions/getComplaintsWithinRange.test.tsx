import '@testing-library/jest-dom'
import { getComplaintsWithinRange } from "@/utils/HelperFunctions";
import { Complaint } from '@/types/Complaint';

describe('getComplaintsWithinRange', () => {
    let complaintsArray: Complaint[];

    beforeEach(() => {
        complaintsArray = [
            {
                oid: "1",
                id: "1",
                title: "Complaint 1",
                description: "Complaint 1 description",
                date: "31-12-2023 23:59:00",
                category: "Environment",
                source: "Reddit",
                sentiment: 0.5,
                url: "url"
            },
            {
                oid: "2",
                id: "2",
                title: "Complaint 2",
                description: "Complaint 2 description",
                date: "01-01-2024 00:00:00",
                category: "Environment",
                source: "Reddit",
                sentiment: 0.5,
                url: "url"
            },
            {
                oid: "3",
                id: "3",
                title: "Complaint 3",
                description: "Complaint 3 description",
                date: "01-01-2024 00:00:01",
                category: "Environment",
                source: "Reddit",
                sentiment: 0.5,
                url: "url"
            },
            {
                oid: "4",
                id: "4",
                title: "Complaint 4",
                description: "Complaint 4 description",
                date: "31-08-2024 23:59:58",
                category: "Environment",
                source: "Reddit",
                sentiment: 0.5,
                url: "url"
            },
            {
                oid: "5",
                id: "5",
                title: "Complaint 5",
                description: "Complaint 5 description",
                date: "31-08-2024 23:59:59",
                category: "Environment",
                source: "Reddit",
                sentiment: 0.5,
                url: "url"
            },
            {
                oid: "6",
                id: "6",
                title: "Complaint 6",
                description: "Complaint 5 description",
                date: "01-09-2024 00:00:00",
                category: "Environment",
                source: "Reddit",
                sentiment: 0.5,
                url: "url"
            },
        ]
    });

    it("should return all complaints if the date range covers the dates of all complaints", () => {
        const filteredComplaints = getComplaintsWithinRange('01-12-2023 00:00:00', '30-09-2024 23:59:59', complaintsArray)
        expect(filteredComplaints.length).toBe(complaintsArray.length)
    })

    it("should return only the complaints whose dates fall within the given range", () => {
        const filteredComplaints = getComplaintsWithinRange('01-01-2024 00:00:00', '31-08-2024 23:59:59', complaintsArray)
        expect(filteredComplaints.length).toBe(4)
    })

})
