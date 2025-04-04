import '@testing-library/jest-dom'
import { getRandomCollectible } from "@/utils/HelperFunctions";

//Mock the possible collectible paths used by getRandomCollectible
jest.mock("@/constants/Constants", () => ({
    POSSIBLE_COLLECTIBLE_PATHS: ["collectible_path_one", "collectible_path_two", "collectible_path_three"],
}));


describe('getRandomCollectible', () => {

    //Reset all mocks before each test is run
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    
    it("returns the first collectible when Math.random() is 0", () => {
        //Arrange
        jest.spyOn(global.Math, "random").mockReturnValue(0);

        //Action
        const randomCollectible = getRandomCollectible()

        //Assert
        expect(randomCollectible).toBe("collectible_path_one");
    });


    it("returns the first collectible when Math.random() is 0.6", () => {
        //Arrange
        jest.spyOn(global.Math, "random").mockReturnValue(0.6);

        //Action
        const randomCollectible = getRandomCollectible()

        //Assert
        expect(randomCollectible).toBe("collectible_path_two");
    });
})