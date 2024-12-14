"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

export default function EditProduct({ params }) {
  const [product, setProduct] = useState(null);
  const { productId } = React.use(params);
  const { toast } = useToast();

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `https://crud.teamrabbil.com/api/v1/ReadProductByID/${productId}`
      );
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        setProduct(data.data[0]); // Set product data to state
      } else {
        toast({
          description: "No product found for:: " + productId,
        });
      }
    } catch (error) {
      toast({
        description: "Failed to fetch product:" + error,
      });
    }
  };

  // Fetch the product data if we are on the client side
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(product);
    try {
      const res = await fetch(
        `https://crud.teamrabbil.com/api/v1/UpdateProduct/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      console.log("res", res);

      if (res.ok) {
        toast({
          description: "Product updated successfully!",
        });
      } else {
        toast({
          description: "Failed to update product.",
        });
      }
    } catch (error) {
      toast({
        description: "Error updating product.",
      });
    } finally {
    }
  };

  if (!product) {
    return <p>Loading product...</p>; // Loading the product data
  }

  return (
    <div className="rounded-md shadow-md p-4">
      <h1 className="font-bold text-lg text-center text-blue-800">
        Edit Product
      </h1>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 justify-items-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Product Name</Label>
            <Input
              type="text"
              value={product.ProductName || ""}
              placeholder="Product Name"
              onChange={(e) =>
                setProduct({ ...product, ProductName: e.target.value })
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Product Code</Label>
            <Input
              type="text"
              value={product.ProductCode || ""}
              placeholder="Product Code"
              onChange={(e) =>
                setProduct({ ...product, ProductCode: e.target.value })
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Image</Label>
            <Input
              type="text"
              value={product.Img || ""}
              placeholder="Image"
              onChange={(e) => setProduct({ ...product, Img: e.target.value })}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Unit Price</Label>
            <Input
              type="text"
              value={product.UnitPrice || 0}
              placeholder="Unit Price"
              onChange={(e) =>
                setProduct({ ...product, UnitPrice: e.target.value })
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Qty</Label>
            <Input
              type="number"
              value={product.Qty || 0}
              placeholder="Quantity"
              onChange={(e) => setProduct({ ...product, Qty: e.target.value })}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Total Price</Label>
            <Input
              type="text"
              value={product.TotalPrice || 0}
              placeholder="Total Price"
              onChange={(e) =>
                setProduct({ ...product, TotalPrice: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-green-800 text-white font-bold rounded-md p-3 pl-6 pr-6"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
