export enum CategoryEnum {
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

export const stringToCategory= (input: string): CategoryEnum | undefined => {
    return Object.values(CategoryEnum).includes(input as CategoryEnum) ? (input as CategoryEnum) : undefined;
};
  


export interface Category {
    id: string,
    name: string,
    colour: string
}