import '@testing-library/jest-dom'
import { doesComplaintExistInList } from "@/utils/HelperFunctions";
import { Complaint } from '@/types/Complaint';

describe('doesComplaintExistInList', () => {
    let complaintsArray: Complaint[];

    beforeEach(() => {
        complaintsArray = [
            {
                oid: "1",
                id: "1",
                title: "Complaint 1",
                description: "Complaint 1 description",
                date: "01-01-2024 23:59:50",
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
                date: "01-01-2024 23:59:50",
                category: "Environment",
                source: "Reddit",
                sentiment: 0.5,
                url: "url"
            },
        ]
    });

    it("should return true if a complaint in the list shares the same oid as the input complaint", () => {
        const inputComplaint = {
            oid: "1",
            id: "1",
            title: "Complaint 1a",
            description: "Complaint 1a description",
            date: "01-01-2024 23:59:50",
            category: "Environment",
            source: "Reddit",
            sentiment: 0.5,
            url: "url"
        }
        const output = doesComplaintExistInList(complaintsArray, inputComplaint)
        expect(output).toBe(true)
    })

    it("should return false if no complaints in the list shares the same oid as the input complaint", () => {
        const inputComplaint = {
            oid: "3",
            id: "3",
            title: "Complaint 3",
            description: "Complaint 3 description",
            date: "01-01-2024 23:59:50",
            category: "Environment",
            source: "Reddit",
            sentiment: 0.5,
            url: "url"
        }
        const output = doesComplaintExistInList(complaintsArray, inputComplaint)
        expect(output).toBe(false)
    })

    it("should return false if the original complaints list is empty", () => {
        const inputComplaint = {
            oid: "3",
            id: "3",
            title: "Complaint 3",
            description: "Complaint 3 description",
            date: "01-01-2024 23:59:50",
            category: "Environment",
            source: "Reddit",
            sentiment: 0.5,
            url: "url"
        }
        const output = doesComplaintExistInList([], inputComplaint)
        expect(output).toBe(false)
    })
})
