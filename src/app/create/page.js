"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductList() {
  // State for form fields
  const [formData, setFormData] = useState({
    Img: "",
    ProductCode: "",
    ProductName: "",
    Qty: "",
    TotalPrice: "",
    UnitPrice: "",
  });

  // State for form validation and success message
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error on change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    const { Img, ProductCode, ProductName, Qty, TotalPrice, UnitPrice } =
      formData;
    if (
      !Img ||
      !ProductCode ||
      !ProductName ||
      !Qty ||
      !TotalPrice ||
      !UnitPrice
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      // API Request
      const response = await fetch(
        "https://crud.teamrabbil.com/api/v1/CreateProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccess("Product created successfully!");
        setFormData({
          Img: "",
          ProductCode: "",
          ProductName: "",
          Qty: "",
          TotalPrice: "",
          UnitPrice: "",
        });
      } else {
        throw new Error("Failed to create product.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="rounded-md shadow-md p-4">
      <h1 className="font-bold text-lg text-center text-blue-800">
        Create Product
      </h1>
      <form>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 items-center justify-items-center"
          onSubmit={handleSubmit}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Product Name</Label>
            <Input
              type="text"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleInputChange}
              placeholder="Product Name"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Product Code</Label>
            <Input
              type="text"
              name="ProductCode"
              value={formData.ProductCode}
              onChange={handleInputChange}
              placeholder="Product Code"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Image URL</Label>
            <Input
              type="text"
              name="Img"
              value={formData.Img}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Unit Price</Label>
            <Input
              type="text"
              name="UnitPrice"
              value={formData.UnitPrice}
              onChange={handleInputChange}
              placeholder="Unit Price"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Quantity</Label>
            <Input
              type="number"
              name="Qty"
              value={formData.Qty}
              onChange={handleInputChange}
              placeholder="Quantity"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Total Price</Label>
            <Input
              type="text"
              name="TotalPrice"
              value={formData.TotalPrice}
              onChange={handleInputChange}
              placeholder="Total Price"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        {/* Success Message */}
        {success && (
          <p className="text-green-600 text-center mt-4">{success}</p>
        )}

        {/* Save Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-green-800 text-white font-bold rounded-md p-3 pl-6 pr-6"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
