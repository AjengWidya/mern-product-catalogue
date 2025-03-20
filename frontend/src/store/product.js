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
  },
  fetchProducts: async () =>  {
    const response = await fetch("/api/products");
    const data = await response.json();

    set({ products: data.data });
  },
  deleteProduct: async(pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE"
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    /**
     * Filter products, only get the product which isn't deleted
     * and set it to the state
     * so the UI will be updated immediately without needing a refresh
     */
    set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));

    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProduct)
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    // Update the UI immediately, without needing a refresh
    set((state) => ({
      products: state.products.map((product) => (product._id === pid ? data.data : product))
    }));

    return { success: true, message: data.message };
  }
}));

/**
 * return function body: a((b) => { ... })
 * return an object: a((b) => ({ ... }))
 */
