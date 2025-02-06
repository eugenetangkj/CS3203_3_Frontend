export enum Category {
  Health = 'Health',
  Education = 'Education',
  Transport = "Transport",
  Employment = "Employment",
  Environment = "Environment",
  Safety = "Safety",
  Community = "Community",
  Recreation = "Recreation",
  Housing = "Housing",
  Food = "Food",
  Others = "Others"
}

export const stringToCategory= (input: string): Category | undefined => {
  return Object.values(Category).includes(input as Category) ? (input as Category) : undefined;
};
  