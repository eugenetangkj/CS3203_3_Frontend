import { Category } from "@/types/Category";

/**
Maps each category to a given colour for visualisation purposes 
*/

//TODO: Update colours again
export const CategoryColorMap: Record<Category, string> = {
    [Category.Health]: '#32CD32',    
    [Category.Education]: '#FFD700', 
    [Category.Transport]: '#32CD32',    
    [Category.Employment]: '#FFD700', 
    [Category.Environment]: '#92A062',    
    [Category.Safety]: '#FFD700', 
    [Category.Community]: '#32CD32',    
    [Category.Recreation]: '#FFD700', 
    [Category.Housing]: '#32CD32',    
    [Category.Food]: '#FFD700', 
    [Category.Others]: '#32CD32',
  };