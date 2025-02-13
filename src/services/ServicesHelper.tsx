import { Category } from "@/types/Category";
import { Source } from "@/types/Source";

export const getCategories = async () => {
  // try {
  //   const response = await axios.get('http://localhost:8081/categories');
  //   return response.data; // Assuming this is the correct structure
  // } catch (error) {
  //   console.error('Error fetching categories:', error);
  //   return []; // Return an empty array in case of error
  // }
  return [
    { id: "health", name: "Health", colour: "#FFC64A" },
    { id: "education", name: "Education", colour: "#A596F2" },
  ]
};


export async function getComplaintsOne() {
//   const res = await fetch(`http://localhost:8081/complaints?page=${page}`, {
//     cache: "no-store", // Ensures that the data is updated on every request
//   });

//   if (!res.ok) {
//     throw new Error("Cannot fetch complaints");
//   }

//   return res.json();
    return [
        {
            id: 1,
            title: "Sample Title 1",
            description: "Description for complaint 1.Description for complaint 1.Description for complaint 1.Description for complaint 1.Description for complaint 2.",
            postedOn: "2024-02-03",
            category: {
                id: "environment",
                name: "Environment",
                colour: "#AAAAAA"
            },
            source: "Reddit",
            sentiment: 1.0,
            url: "#",
        },
        {
            id: 2,
            title: "Sample Title 2",
            description: "Description for complaint 2.",
            postedOn: "2024-02-04",
            category: {
                id: "environment",
                name: "Environment",
                colour: "#AAAAAA"
            },
            source: "Twitter",
            sentiment: 1.0,
            url: "#",
        },
        {
            id: 3,
            title: "Sample Title 3",
            description: "Description for complaint 3.",
            postedOn: "2024-02-05",
            category: {
                id: "environment",
                name: "Environment",
                colour: "#AAAAAA"
            },
            source: "Facebook",
            sentiment: 1.0,
            url: "#",
        },
        {
            id: 4,
            title: "Sample Title 4",
            description: "Description for complaint 4.",
            postedOn: "2024-02-06",
            category: {
                id: "environment",
                name: "environment",
                colour: "#AAAAAA"
            },
            source: "Instagram",
            sentiment: 1.0,
            url: "#",
        },
        {
            id: 5,
            title: "Sample Title 5",
            description: "Description for complaint 5.",
            postedOn: "2024-02-07",
            category: {
                id: "environment",
                name: "Environment",
                colour: "#AAAAAA"
            },
            source: "Website",
            sentiment: 1.0,
            url: "#",
        },
    ]
}

export async function getComplaintsTwo() {
        return [
            {
                id: 6,
                title: "Sample Title 6",
                description: "Description for complaint 6.",
                postedOn: "2024-02-03",
                category: {
                    id: "environment",
                    name: "Environment",
                    colour: "#AAAAAA"
                },
                source: "Reddit",
                sentiment: 1.0,
                url: "#",
            },
            {
                id: 7,
                title: "Sample Title 7",
                description: "Description for complaint 7.",
                postedOn: "2024-02-04",
                category: {
                    id: "environment",
                    name: "Environment",
                    colour: "#AAAAAA"
                },
                source: "Twitter",
                sentiment: 1.0,
                url: "#",
            },
            {
                id: 8,
                title: "Sample Title 8",
                description: "Description for complaint 8.",
                postedOn: "2024-02-05",
                category: {
                    id: "environment",
                    name: "Environment",
                    colour: "#AAAAAA"
                },
                source: "Facebook",
                sentiment: 1.0,
                url: "#",
            },
            {
                id: 9,
                title: "Sample Title 9",
                description: "Description for complaint 9.",
                postedOn: "2024-02-06",
                category: {
                    id: "environment",
                    name: "Environment",
                    colour: "#AAAAAA"
                },
                source: "Instagram",
                sentiment: 1.0,
                url: "#",
            },
            {
                id: 10,
                title: "Sample Title 10",
                description: "Description for complaint 10.",
                postedOn: "2024-02-07",
                category: {
                    id: "environment",
                    name: "Environment",
                    colour: "#AAAAAA"
                },
                source: "Website",
                sentiment: 1.0,
                url: "#",
            },
        ]
    }



export const defaultCategories : Category[] = [
            {
                id: "healthcare",
                name: "Healthcare",
                colour: "#AAAAAA"
            },
            {
                id: "environment",
                name: "Environment",
                colour: "#AAAAAA"
            },
            {
                id: "finance",
                name: "Finance",
                colour: "#AAAAAA"
            },
] 

export const defaultSources : Source[] = [
    {
        id: "reddit",
        name: "Reddit",
    },
] 




