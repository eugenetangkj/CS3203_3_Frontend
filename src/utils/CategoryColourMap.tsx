import { Category } from "@/types/Category";

/**
Maps each category to a given colour for visualisation purposes 
*/
export const CategoryColorMap: Record<Category, string> = {
    [Category.Health]: '#FFC64A',    
    [Category.Education]: '#A596F2', 
    [Category.Transport]: '#9D67B0',    
    [Category.Employment]: '#7EAAD2', 
    [Category.Environment]: '#92A062',    
    [Category.Safety]: '#EEBEA5', 
    [Category.Community]: '#B06781',    
    [Category.Recreation]: '#F89393', 
    [Category.Housing]: '#8D5F4A',    
    [Category.Food]: '#FF814A', 
    [Category.Others]: '#756D67',
  };