import { productFields } from "./productFields";
export const filterBox = [
  {
    options: productFields.category,
    label: "Categorie",
    keyName: "category",
    defaultValue: "toate",
  },
  {
    options: productFields.subcategory,
    label: "Subcategorie",
    keyName: "subcategory",
    defaultValue: "toate",
  },
  {
    options: productFields.unitate,
    label: "Unitate",
    keyName: "unity",
    defaultValue: "toate",
  },
  {
    options: productFields.producatori,
    label: "Producator",
    keyName: "manufacturer",
    defaultValue: "toate",
  },
];

export const inputNumber = [
  {
    label: "Pret min",
    keyName: "minPrice",
  },
  {
    label: "Pret max",
    keyName: "maxPrice",
  },
  {
    label: "Cantitate min",
    keyName: "minQuantity",
  },
  {
    label: "Cantitate max",
    keyName: "maxQuantity",
  },
];
