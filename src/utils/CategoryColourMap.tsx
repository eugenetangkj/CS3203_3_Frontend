import { Category } from "@/types/Category";

/**
Maps each category to a given colour for visualisation purposes 
*/

//TODO: Update colours again
export const CategoryColorMap: Record<Category, string> = {
    [Category.Health]: '#A06292',    
    [Category.Education]: '#7662A0', 
    [Category.Transport]: '#62A07F',    
    [Category.Employment]: '#4A92FF', 
    [Category.Environment]: '#92A062',    
    [Category.Safety]: '#FFC64A', 
    [Category.Community]: '#EE578E',    
    [Category.Recreation]: '#55CBD2', 
    [Category.Housing]: '#8D5F4A',    
    [Category.Food]: '#FF814A', 
    [Category.Others]: '#D25573',
  };