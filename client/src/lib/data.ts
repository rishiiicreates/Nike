// This file provides types and helper functions for data management

import { Product } from "@shared/schema";

export interface CategoryInfo {
  name: string;
  link: string;
}

export interface NavItem {
  title: string;
  link: string;
  columns: {
    title: string;
    links: { text: string; link: string }[];
  }[];
}

export const mainNavItems: NavItem[] = [
  {
    title: "New & Featured",
    link: "/category/new-featured",
    columns: [
      {
        title: "New & Featured",
        links: [
          { text: "New Releases", link: "/category/new-releases" },
          { text: "SNKRS Launch Calendar", link: "/category/snkrs" },
          { text: "Member Access", link: "/category/member-access" },
          { text: "Air Force 1", link: "/category/air-force-1" },
          { text: "Basic Essentials", link: "/category/basic-essentials" },
          { text: "Football Club Kits", link: "/category/football-kits" },
          { text: "Top Picks Under $100", link: "/category/under-100" },
        ],
      },
      {
        title: "Shop Icons",
        links: [
          { text: "Air Force 1", link: "/category/air-force-1" },
          { text: "Air Jordan 1", link: "/category/air-jordan-1" },
          { text: "Air Max", link: "/category/air-max" },
          { text: "Dunk", link: "/category/dunk" },
          { text: "Blazer", link: "/category/blazer" },
          { text: "Pegasus", link: "/category/pegasus" },
        ],
      },
      {
        title: "New For Men",
        links: [
          { text: "Shoes", link: "/category/men-shoes" },
          { text: "Clothing", link: "/category/men-clothing" },
          { text: "Equipment", link: "/category/men-equipment" },
          { text: "Shop All New", link: "/category/men-new" },
        ],
      },
      {
        title: "New For Women",
        links: [
          { text: "Shoes", link: "/category/women-shoes" },
          { text: "Clothing", link: "/category/women-clothing" },
          { text: "Equipment", link: "/category/women-equipment" },
          { text: "Shop All New", link: "/category/women-new" },
        ],
      },
    ],
  },
  {
    title: "Men",
    link: "/category/men",
    columns: [
      {
        title: "Featured",
        links: [
          { text: "New Releases", link: "/category/men-new-releases" },
          { text: "Best Sellers", link: "/category/men-best-sellers" },
          { text: "Member Exclusives", link: "/category/men-member-exclusives" },
          { text: "Jordan", link: "/category/men-jordan" },
          { text: "Running", link: "/category/men-running" },
          { text: "Training & Gym", link: "/category/men-training" },
          { text: "Soccer", link: "/category/men-soccer" },
        ],
      },
      {
        title: "Shoes",
        links: [
          { text: "All Shoes", link: "/category/men-all-shoes" },
          { text: "Lifestyle", link: "/category/men-lifestyle-shoes" },
          { text: "Running", link: "/category/men-running-shoes" },
          { text: "Basketball", link: "/category/men-basketball-shoes" },
          { text: "Training & Gym", link: "/category/men-training-shoes" },
          { text: "Soccer", link: "/category/men-soccer-shoes" },
          { text: "Skateboarding", link: "/category/men-skateboarding-shoes" },
        ],
      },
      {
        title: "Clothing",
        links: [
          { text: "All Clothing", link: "/category/men-all-clothing" },
          { text: "Tops & T-Shirts", link: "/category/men-tops" },
          { text: "Shorts", link: "/category/men-shorts" },
          { text: "Hoodies & Sweatshirts", link: "/category/men-hoodies" },
          { text: "Pants & Tights", link: "/category/men-pants" },
          { text: "Jackets & Vests", link: "/category/men-jackets" },
          { text: "Tracksuits", link: "/category/men-tracksuits" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { text: "All Accessories", link: "/category/men-accessories" },
          { text: "Bags & Backpacks", link: "/category/men-bags" },
          { text: "Hats, Visors & Headbands", link: "/category/men-hats" },
          { text: "Socks", link: "/category/men-socks" },
        ],
      },
    ],
  },
  {
    title: "Women",
    link: "/category/women",
    columns: [
      {
        title: "Featured",
        links: [
          { text: "New Releases", link: "/category/women-new-releases" },
          { text: "Best Sellers", link: "/category/women-best-sellers" },
          { text: "Member Exclusives", link: "/category/women-member-exclusives" },
          { text: "Jordan", link: "/category/women-jordan" },
          { text: "Running", link: "/category/women-running" },
          { text: "Training & Gym", link: "/category/women-training" },
        ],
      },
      {
        title: "Shoes",
        links: [
          { text: "All Shoes", link: "/category/women-all-shoes" },
          { text: "Lifestyle", link: "/category/women-lifestyle-shoes" },
          { text: "Running", link: "/category/women-running-shoes" },
          { text: "Training & Gym", link: "/category/women-training-shoes" },
        ],
      },
      {
        title: "Clothing",
        links: [
          { text: "All Clothing", link: "/category/women-all-clothing" },
          { text: "Tops & T-Shirts", link: "/category/women-tops" },
          { text: "Shorts", link: "/category/women-shorts" },
          { text: "Hoodies & Sweatshirts", link: "/category/women-hoodies" },
          { text: "Pants & Leggings", link: "/category/women-pants" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { text: "All Accessories", link: "/category/women-accessories" },
          { text: "Bags & Backpacks", link: "/category/women-bags" },
          { text: "Socks", link: "/category/women-socks" },
        ],
      },
    ],
  },
  {
    title: "Kids",
    link: "/category/kids",
    columns: [
      {
        title: "Featured",
        links: [
          { text: "New Releases", link: "/category/kids-new-releases" },
          { text: "Best Sellers", link: "/category/kids-best-sellers" },
        ],
      },
      {
        title: "Shoes",
        links: [
          { text: "All Shoes", link: "/category/kids-all-shoes" },
          { text: "Lifestyle", link: "/category/kids-lifestyle-shoes" },
          { text: "Running", link: "/category/kids-running-shoes" },
        ],
      },
      {
        title: "Clothing",
        links: [
          { text: "All Clothing", link: "/category/kids-all-clothing" },
          { text: "Tops & T-Shirts", link: "/category/kids-tops" },
          { text: "Hoodies & Sweatshirts", link: "/category/kids-hoodies" },
        ],
      },
    ],
  },
  {
    title: "Sale",
    link: "/category/sale",
    columns: [
      {
        title: "Sale",
        links: [
          { text: "All Sale", link: "/category/all-sale" },
          { text: "Shoes Sale", link: "/category/shoes-sale" },
          { text: "Clothing Sale", link: "/category/clothing-sale" },
        ],
      },
      {
        title: "Men's Sale",
        links: [
          { text: "Men's Shoes Sale", link: "/category/mens-shoes-sale" },
          { text: "Men's Clothing Sale", link: "/category/mens-clothing-sale" },
        ],
      },
      {
        title: "Women's Sale",
        links: [
          { text: "Women's Shoes Sale", link: "/category/womens-shoes-sale" },
          { text: "Women's Clothing Sale", link: "/category/womens-clothing-sale" },
        ],
      },
    ],
  },
];

export const mainCategories: CategoryInfo[] = [
  { name: "Men's", link: "/category/men" },
  { name: "Women's", link: "/category/women" },
  { name: "Kids'", link: "/category/kids" },
];

export const popularItems = [
  { text: "Air Force 1", link: "/category/air-force-1" },
  { text: "Jordan", link: "/category/jordan" },
  { text: "Air Max", link: "/category/air-max" },
  { text: "Nike Dunk", link: "/category/dunk" },
  { text: "Blazer", link: "/category/blazer" },
  { text: "Pegasus", link: "/category/pegasus" },
  { text: "Metcon", link: "/category/metcon" },
  { text: "Nike SB", link: "/category/nike-sb" },
];

export const footerColumns = [
  {
    title: "FEATURED",
    links: [
      { text: "Air Force 1", link: "/category/air-force-1" },
      { text: "Jordan 1", link: "/category/jordan-1" },
      { text: "Air Max", link: "/category/air-max" },
      { text: "Nike Dunk", link: "/category/dunk" },
      { text: "Blazer", link: "/category/blazer" },
      { text: "Pegasus", link: "/category/pegasus" },
    ],
  },
  {
    title: "SHOES",
    links: [
      { text: "All Shoes", link: "/category/all-shoes" },
      { text: "Running", link: "/category/running" },
      { text: "Basketball", link: "/category/basketball" },
      { text: "Soccer", link: "/category/soccer" },
      { text: "Training & Gym", link: "/category/training" },
      { text: "Skateboarding", link: "/category/skateboarding" },
    ],
  },
  {
    title: "CLOTHING",
    links: [
      { text: "All Clothing", link: "/category/all-clothing" },
      { text: "Tops & T-Shirts", link: "/category/tops" },
      { text: "Shorts", link: "/category/shorts" },
      { text: "Hoodies & Sweatshirts", link: "/category/hoodies" },
      { text: "Jackets & Vests", link: "/category/jackets" },
      { text: "Pants & Tights", link: "/category/pants" },
    ],
  },
  {
    title: "ABOUT NIKE",
    links: [
      { text: "News", link: "/about/news" },
      { text: "Careers", link: "/about/careers" },
      { text: "Investors", link: "/about/investors" },
      { text: "Sustainability", link: "/about/sustainability" },
      { text: "Purpose", link: "/about/purpose" },
    ],
  },
];

export const footerBottomLinks = [
  { text: "Guides", link: "/guides" },
  { text: "Terms of Sale", link: "/terms-of-sale" },
  { text: "Terms of Use", link: "/terms-of-use" },
  { text: "Nike Privacy Policy", link: "/privacy-policy" },
];

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(0)}`;
};

export function formatProductImage(url: string | null): string {
  if (!url) return "";
  // Add query params to unsplash images for optimal quality
  if (url.includes("unsplash.com")) {
    return `${url}?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3`;
  }
  return url;
}
