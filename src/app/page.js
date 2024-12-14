"use client";
import { useState, useEffect } from "react";
import { PenBox, Trash2Icon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function List() {
  const [products, setProducts] = useState([]);
  const { toast } = useToast();

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://crud.teamrabbil.com/api/v1/DeleteProduct/${id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        toast({
          title: "DELETE",
          description: "Product deleted successfully!",
        });
        getProducts();
      } else {
        throw new Error("Failed to delete the product.");
      }
    } catch (error) {
      toast({
        title: "DELETE",
        description: "Product not deleted!",
        variant: "destructive",
      });
    }
  };

  const getProducts = async () => {
    try {
      const res = await fetch("https://crud.teamrabbil.com/api/v1/ReadProduct");
      const data = await res.json();
      setProducts(data.data); // Update state with fetched product data
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []); // Run once on component mount

  return (
    <div className="flex flex-col rounded-md shadow-md p-4">
      <h1 className="font-bold text-lg text-center text-blue-800">
        Product List
      </h1>
      <table className="mt-4">
        <thead>
          <tr className="border-b-2">
            <th className="p-2">Product</th>
            <th className="p-2">Unit Price</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Total Price</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products.map((product, index) => (
              <tr className="border-b-2 text-center" key={index}>
                <td className="p-2">{product.ProductName}</td>
                <td className="p-2">{product.UnitPrice}</td>
                <td className="p-2">{product.Qty}</td>
                <td className="p-2">{product.TotalPrice}</td>
                <td className="p-2 grid grid-cols-2 gap-0">
                  
                  <Link href={`/products/${product._id}`} className="flex justify-center bg-green-800 p-2 rounded-l-md">

                      <PenBox />
                    </Link>
                  <button
                    className="flex justify-center bg-red-800 p-2 rounded-r-md"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <Trash2Icon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-2">
                Loading products...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
