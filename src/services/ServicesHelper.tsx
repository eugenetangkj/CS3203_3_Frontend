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
            category: "Category 1",
            source: "Reddit",
            url: "#",
        },
        {
            id: 2,
            title: "Sample Title 2",
            description: "Description for complaint 2.",
            postedOn: "2024-02-04",
            category: "Category 2",
            source: "Twitter",
            url: "#",
        },
        {
            id: 3,
            title: "Sample Title 3",
            description: "Description for complaint 3.",
            postedOn: "2024-02-05",
            category: "Category 3",
            source: "Facebook",
            url: "#",
        },
        {
            id: 4,
            title: "Sample Title 4",
            description: "Description for complaint 4.",
            postedOn: "2024-02-06",
            category: "Category 4",
            source: "Instagram",
            url: "#",
        },
        {
            id: 5,
            title: "Sample Title 5",
            description: "Description for complaint 5.",
            postedOn: "2024-02-07",
            category: "Category 5",
            source: "Website",
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
                category: "Category 6",
                source: "Reddit",
                url: "#",
            },
            {
                id: 7,
                title: "Sample Title 7",
                description: "Description for complaint 7.",
                postedOn: "2024-02-04",
                category: "Category 7",
                source: "Twitter",
                url: "#",
            },
            {
                id: 8,
                title: "Sample Title 8",
                description: "Description for complaint 8.",
                postedOn: "2024-02-05",
                category: "Category 8",
                source: "Facebook",
                url: "#",
            },
            {
                id: 9,
                title: "Sample Title 9",
                description: "Description for complaint 9.",
                postedOn: "2024-02-06",
                category: "Category 9",
                source: "Instagram",
                url: "#",
            },
            {
                id: 10,
                title: "Sample Title 10",
                description: "Description for complaint 10.",
                postedOn: "2024-02-07",
                category: "Category 10",
                source: "Website",
                url: "#",
            },
        ]
    }
