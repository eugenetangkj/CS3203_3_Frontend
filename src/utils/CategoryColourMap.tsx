import { CategoryEnum } from "@/types/Category";

/**
Maps each category to a given colour for visualisation purposes 
*/
export const CategoryColorMap: Record<CategoryEnum, string> = {
    [CategoryEnum.Health]: '#FFC64A',    
    [CategoryEnum.Education]: '#A596F2', 
    [CategoryEnum.Transport]: '#9D67B0',    
    [CategoryEnum.Employment]: '#7EAAD2', 
    [CategoryEnum.Environment]: '#92A062',    
    [CategoryEnum.Safety]: '#EEBEA5', 
    [CategoryEnum.Community]: '#B06781',    
    [CategoryEnum.Recreation]: '#F89393', 
    [CategoryEnum.Housing]: '#8D5F4A',    
    [CategoryEnum.Food]: '#FF814A', 
    [CategoryEnum.Others]: '#756D67',
  };