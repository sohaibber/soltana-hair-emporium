
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface FilterOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2 py-1">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onChange} 
      />
      <label 
        htmlFor={id}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

interface ProductFiltersProps {
  filters: {
    categories: string[];
    colors: string[];
    lengths: string[];
  };
  activeFilters: {
    categories: string[];
    colors: string[];
    lengths: string[];
    priceRange: [number, number];
  };
  priceRange: [number, number];
  maxPrice: number;
  onFilterChange: (filterType: string, value: string) => void;
  onPriceChange: (values: [number, number]) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  activeFilters,
  priceRange,
  maxPrice,
  onFilterChange,
  onPriceChange,
}) => {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full" defaultValue="category">
        <AccordionItem value="category">
          <AccordionTrigger className="font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              {filters.categories.map((category) => (
                <FilterOption
                  key={category}
                  id={`category-${category}`}
                  label={category}
                  checked={activeFilters.categories.includes(category)}
                  onChange={() => onFilterChange("categories", category)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="font-medium">Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              {filters.colors.map((color) => (
                <FilterOption
                  key={color}
                  id={`color-${color}`}
                  label={color}
                  checked={activeFilters.colors.includes(color)}
                  onChange={() => onFilterChange("colors", color)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="length">
          <AccordionTrigger className="font-medium">Length</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              {filters.lengths.map((length) => (
                <FilterOption
                  key={length}
                  id={`length-${length}`}
                  label={length}
                  checked={activeFilters.lengths.includes(length)}
                  onChange={() => onFilterChange("lengths", length)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="font-medium">Price</AccordionTrigger>
          <AccordionContent>
            <div className="px-2 pt-4 pb-2">
              <Slider
                defaultValue={priceRange}
                max={maxPrice}
                step={1}
                onValueChange={(value) => onPriceChange(value as [number, number])}
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilters;
