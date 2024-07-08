import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState("");

  const products = [
    { id: 1, name: "Laptop", category: "Laptops", price: 999, brand: "Brand A", rating: 4 },
    { id: 2, name: "Smartphone", category: "Smartphones", price: 699, brand: "Brand B", rating: 5 },
    { id: 3, name: "Headphones", category: "Accessories", price: 199, brand: "Brand C", rating: 3 },
  ];

  const filteredProducts = products.filter((product) => {
    return (
      (category ? product.category === category : true) &&
      (priceRange ? product.price >= priceRange[0] && product.price <= priceRange[1] : true) &&
      (brand ? product.brand === brand : true) &&
      (rating ? product.rating === parseInt(rating) : true)
    );
  });
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="text-center py-10">
        <img src="/placeholder.svg" alt="placeholder" className="mx-auto object-cover w-full h-[400px]" />
        <h1 className="text-4xl font-bold mt-6">Featured Electronic Product</h1>
        <Button className="mt-4">Shop Now</Button>
      </section>

      <Separator />

      {/* Filters */}
      <section className="py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Filter Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Category</h3>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Laptops">Laptops</SelectItem>
                <SelectItem value="Smartphones">Smartphones</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Price Range</h3>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Brand</h3>
            <Select onValueChange={setBrand}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Brand A">Brand A</SelectItem>
                <SelectItem value="Brand B">Brand B</SelectItem>
                <SelectItem value="Brand C">Brand C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Rating</h3>
            <Select onValueChange={setRating}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <Separator />

      {/* Featured Products */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <img src="/placeholder.svg" alt="placeholder" className="mx-auto object-cover w-full h-[200px]" />
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-lg font-bold">${product.price}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;