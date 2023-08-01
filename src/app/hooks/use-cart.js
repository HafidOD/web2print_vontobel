import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("El producto ya esta en el carrito", {
            icon: "⚠️",
          });
        }

        set({ items: [...get().items, data] });
        toast.success("Producto agregado");
      },

      updateItem: (id, counter) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);
        existingItem.quantity = counter;
        set({ items: [...get().items, existingItem] });
      },

      removeItem: (id) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Producto eliminado");
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
