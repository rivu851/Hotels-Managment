"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectOption,
} from "./ui-components";

import { use, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

export function AddSouvenirDialog({
  isOpen,
  onClose,
  newItem,
  setNewItem,
  categories,
}) {
  console.log("🔍 AddSouvenirDialog - Component initialized");
  console.log("🔍 Props received:", { isOpen, newItem, categories });
  
  const { user } = useAppContext();
  console.log("🔍 User context:", { user: user ? { token: user.token ? "exists" : "missing" } : "null" });
  
  const [images, setImages] = useState([]); // Store selected images
  const [loading, setLoading] = useState(false);

  console.log("🔍 Initial state:", { images: images.length, loading });

  const handleImageChange = (e) => {
    console.log("🔍 Image change event:", e.target.files);
    const selectedFiles = Array.from(e.target.files);
    console.log("🔍 Selected files:", selectedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })));
    setImages(selectedFiles);
  };

  const onAdd = async () => {
    console.log("🔍 onAdd function called");
    console.log("🔍 Current newItem state:", newItem);
    console.log("🔍 Current images state:", images.map(img => ({ name: img.name, size: img.size })));

    // Validation check
    const validationErrors = [];
    if (!newItem.name) validationErrors.push("name");
    if (!newItem.description) validationErrors.push("description");
    if (!newItem.price) validationErrors.push("price");
    if (!newItem.category) validationErrors.push("category");
    if (!newItem.region) validationErrors.push("region");
    if (!newItem.place) validationErrors.push("place");
    if (images.length === 0) validationErrors.push("images");

    console.log("🔍 Validation errors:", validationErrors);

    if (validationErrors.length > 0) {
      console.log("❌ Validation failed - missing fields:", validationErrors);
      toast.error("Please fill all fields and select at least one image");
      return;
    }

    console.log("✅ Validation passed, proceeding with API call");

    try {
      console.log("🔍 Setting loading state to true");
      setLoading(true);
      
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("description", newItem.description);
      formData.append("price", newItem.price);
      formData.append("category", newItem.category);
      formData.append("region", newItem.region);
      formData.append("place", newItem.place);
      formData.append("features", JSON.stringify(newItem.features || []));

      images.forEach((image, index) => {
        console.log(`🔍 Appending image ${index + 1}:`, { name: image.name, size: image.size });
        formData.append("imageFile", image);
      });

      console.log("🔍 FormData created, making API request");
      console.log("🔍 API URL: https://voyagerserver.onrender.com/api/createsouvenir");
      console.log("🔍 Headers:", {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token ? "exists" : "missing"}`
      });

      const res = await axios.post(
        "https://voyagerserver.onrender.com/api/createsouvenir",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("✅ API call successful:", res.data);
      toast.success("Souvenir added successfully!");
      
      console.log("🔍 Resetting form state");
      setNewItem({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        region: "",
        place: "",
      });
      setImages([]);
      console.log("🔍 Closing dialog");
      onClose();
    } catch (error) {
      console.error("❌ API call failed:", error);
      console.error("❌ Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      toast.error(error.response?.data?.message || "Failed to add souvenir");
    } finally {
      console.log("🔍 Setting loading state to false");
      setLoading(false);
    }
  };

  console.log("🔍 Rendering dialog with state:", { isOpen, loading, imagesCount: images.length });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Souvenir</DialogTitle>
          <DialogDescription>
            Add a new souvenir to your inventory
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newItem.name}
              onChange={(e) => {
                console.log("🔍 Name input changed:", e.target.value);
                setNewItem({ ...newItem, name: e.target.value });
              }}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newItem.description}
              onChange={(e) => {
                console.log("🔍 Description input changed:", e.target.value);
                setNewItem({ ...newItem, description: e.target.value });
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={newItem.price}
                onChange={(e) => {
                  console.log("🔍 Price input changed:", e.target.value);
                  setNewItem({ ...newItem, price: e.target.value });
                }}
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={newItem.stock}
                onChange={(e) => {
                  console.log("🔍 Stock input changed:", e.target.value);
                  setNewItem({ ...newItem, stock: e.target.value });
                }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              value={newItem.region || ""}
              onChange={(e) => {
                console.log("🔍 Region input changed:", e.target.value);
                setNewItem({ ...newItem, region: e.target.value });
              }}
              placeholder="e.g., Kolkata"
            />
          </div>

          <div>
            <Label htmlFor="place">Place</Label>
            <Input
              id="place"
              value={newItem.place || ""}
              onChange={(e) => {
                console.log("🔍 Place input changed:", e.target.value);
                setNewItem({ ...newItem, place: e.target.value });
              }}
              placeholder="e.g., Park Street"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={newItem.category}
              onValueChange={(value) => {
                console.log("🔍 Category selection changed:", value);
                setNewItem({ ...newItem, category: value });
              }}
            >
              <SelectOption value="">Select category</SelectOption>
              {categories.slice(1).map((category) => (
                <SelectOption key={category} value={category}>
                  {category
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </SelectOption>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>

          <Button onClick={onAdd} className="w-full" disabled={loading}>
            {loading ? "Uploading..." : "Add Souvenir"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
