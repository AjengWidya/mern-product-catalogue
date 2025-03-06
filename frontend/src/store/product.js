import { create } from "zustand";

// Create a hook
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all required fields" }
    }

    // Request
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });

    // Extract the reponse and store it as 'data'
    const data = await response.json();

    /**
     * Update the state. Steps:
     * 1. Get the previous state: (state)
     * 2. Return the 'products' object: ({ products: ... })
     * 3. Keep all the previous products that we had: [...state.products, ...]
     * 4. Add the new product that just we got from the backend (see the controller):
     *    [..., data.data]
     */
    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: "Product created successfully" };
  }
}));

/**
 * return function body: a((b) => { ... })
 * return an object: a((b) => ({ ... }))
 */
