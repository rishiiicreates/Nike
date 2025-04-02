import { products, type Product, type InsertProduct, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getTrendingProducts(limit?: number): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  currentUserId: number;
  currentProductId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    
    // Initialize with some sample products
    this.initializeProducts();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  async getFeaturedProducts(limit: number = 6): Promise<Product[]> {
    const allProducts = Array.from(this.products.values());
    return allProducts.slice(0, limit);
  }

  async getTrendingProducts(limit: number = 3): Promise<Product[]> {
    const trendingProducts = Array.from(this.products.values()).filter(
      (product) => product.isTrending
    );
    return trendingProducts.slice(0, limit);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
  }

  private initializeProducts() {
    const products: InsertProduct[] = [
      {
        name: "Nike Air Max 90",
        price: 140,
        category: "Men's Shoes",
        colors: 3,
        description: "The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU details.",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
        hoverImage: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
        isNew: true,
        isTrending: true,
        isBestSeller: false
      },
      {
        name: "Nike Air Force 1 '07",
        price: 110,
        category: "Men's Shoes",
        colors: 2,
        description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
        image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
        hoverImage: "https://images.unsplash.com/photo-1513188732907-5f732b831ca8",
        isNew: false,
        isTrending: false,
        isBestSeller: true
      },
      {
        name: "Nike Air Zoom Pegasus 38",
        price: 120,
        category: "Men's Running Shoes",
        colors: 5,
        description: "Your workhorse with wings returns. The Nike Air Zoom Pegasus 38 continues to put a spring in your step, using the same responsive foam as its predecessor.",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
        hoverImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
        isNew: false,
        isTrending: true,
        isBestSeller: false
      },
      {
        name: "Nike Sportswear Tech Fleece",
        price: 130,
        category: "Men's Full-Zip Hoodie",
        colors: 2,
        description: "The Nike Sportswear Tech Fleece Hoodie combines a lightweight, space-age look and feel with performance warmth.",
        image: "https://images.unsplash.com/photo-1588361861040-ac9b1018dcde",
        hoverImage: null,
        isNew: true,
        isTrending: false,
        isBestSeller: false
      },
      {
        name: "Nike Dri-FIT Run Division",
        price: 90,
        category: "Women's Running Tights",
        colors: 3,
        description: "The Nike Dri-FIT Run Division Tights are made from at least 75% recycled polyester fibers. A wide, elastic waistband and stretchy fabric provide a secure, comfortable feel during your run.",
        image: "https://images.unsplash.com/photo-1529720317453-c8da503f2051",
        hoverImage: null,
        isNew: false,
        isTrending: true,
        isBestSeller: false
      },
      {
        name: "Nike Dunk Low",
        price: 115,
        category: "Men's Shoes",
        colors: 8,
        description: "Created for the hardwood but taken to the streets, the '80s basketball icon returns with perfectly shined overlays and classic team colors.",
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        hoverImage: null,
        isNew: false,
        isTrending: false,
        isBestSeller: true
      },
      {
        name: "Nike React Infinity Run Flyknit 2",
        price: 160,
        category: "Running Shoes",
        colors: 4,
        description: "The Nike React Infinity Run Flyknit 2 continues to help keep you running. A refreshed upper uses Flywire technology that combines with Flyknit for support and breathability where you need it.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        hoverImage: null,
        isNew: true,
        isTrending: true,
        isBestSeller: false
      },
      {
        name: "Nike Blazer Mid '77 Vintage",
        price: 105,
        category: "Shoes",
        colors: 3,
        description: "In the '70s, Nike was the new shoe on the block. So new in fact, we were still working on getting the perfect fit, the perfect feel and the perfect style. The Nike Blazer Mid '77 Vintage gets you close to the '70s originals with vintage treatment on the midsole, making it look like you've been wearing them for years.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
        hoverImage: "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
        isNew: false,
        isTrending: false,
        isBestSeller: true
      }
    ];

    products.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }
}

export const storage = new MemStorage();
