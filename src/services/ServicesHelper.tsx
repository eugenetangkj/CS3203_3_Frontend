export const getCategories = async () => {
  // try {
  //   const response = await axios.get('http://localhost:8081/categories');
  //   return response.data; // Assuming this is the correct structure
  // } catch (error) {
  //   console.error('Error fetching categories:', error);
  //   return []; // Return an empty array in case of error
  // }
  return [
    { name: "Health", colour: "#FFC64A" },
    { name: "Education", colour: "#A596F2" },
  ]
};
