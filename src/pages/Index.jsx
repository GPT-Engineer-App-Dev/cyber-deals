import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="text-center py-10">
        <img src="/placeholder.svg" alt="placeholder" className="mx-auto object-cover w-full h-[400px]" />
        <h1 className="text-4xl font-bold mt-6">Featured Electronic Product</h1>
        <Button className="mt-4">Shop Now</Button>
      </section>

      <Separator />

      {/* Product Categories */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold mb-6">Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Laptops", "Smartphones", "Accessories"].map((category) => (
            <div key={category} className="space-y-4">
              <img src="/placeholder.svg" alt="placeholder" className="mx-auto object-cover w-full h-[200px]" />
              <h3 className="text-xl font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Featured Products */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Product 1", "Product 2", "Product 3"].map((product) => (
            <Card key={product}>
              <CardHeader>
                <img src="/placeholder.svg" alt="placeholder" className="mx-auto object-cover w-full h-[200px]" />
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold">{product}</h3>
                <p className="text-lg font-bold">$99.99</p>
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