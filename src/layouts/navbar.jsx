import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CircleUser, Menu, Package2, ShoppingCart } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", title: "Home" },
  { to: "/products", title: "Products" },
  { to: "/about", title: "About" },
  { to: "/contact", title: "Contact" },
];

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = debounce(async (query) => {
    if (query.length > 0) {
      // Mock API call
      const products = [
        { id: 1, name: "Laptop" },
        { id: 2, name: "Smartphone" },
        { id: 3, name: "Headphones" },
      ];
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, 300);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <DesktopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchResults={searchResults} />
        <MobileNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchResults={searchResults} />
        <UserMenu />
      </header>
      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const DesktopNav = ({ searchQuery, setSearchQuery, searchResults }) => (
  <nav className="hidden md:flex md:items-center md:gap-5 lg:gap-6 text-lg font-medium md:text-sm">
    <NavItem
      to="/"
      className="flex items-center gap-2 text-lg font-semibold md:text-base"
    >
      <Package2 className="h-6 w-6" />
      <span className="sr-only">Acme Inc</span>
    </NavItem>
    {navItems.map((item) => (
      <NavItem key={item.to} to={item.to}>
        {item.title}
      </NavItem>
    ))}
    <Input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="ml-4"
    />
    {searchResults.length > 0 && (
      <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg">
        {searchResults.map((result) => (
          <div key={result.id} className="p-2 hover:bg-gray-200">
            {result.name}
          </div>
        ))}
      </div>
    )}
  </nav>
);

const MobileNav = ({ searchQuery, setSearchQuery, searchResults }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <nav className="grid gap-6 text-lg font-medium">
        <NavItem
          to="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </NavItem>
        {navItems.map((item) => (
          <NavItem key={item.to} to={item.to}>
            {item.title}
          </NavItem>
        ))}
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-4"
        />
        {searchResults.length > 0 && (
          <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg">
            {searchResults.map((result) => (
              <div key={result.id} className="p-2 hover:bg-gray-200">
                {result.name}
              </div>
            ))}
          </div>
        )}
      </nav>
    </SheetContent>
  </Sheet>
);

const UserMenu = () => (
  <div className="flex items-center gap-4">
    <Button variant="outline" size="icon" className="rounded-full">
      <ShoppingCart className="h-5 w-5" />
      <span className="sr-only">Shopping Cart</span>
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const NavItem = ({ to, children, className }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "transition-colors",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className,
      )
    }
  >
    {children}
  </NavLink>
);

const Footer = () => (
  <footer className="border-t bg-background py-6 text-center">
    <div className="container mx-auto space-y-4">
      <div className="flex justify-center space-x-4">
        <NavLink to="/privacy-policy" className="text-muted-foreground hover:text-foreground">
          Privacy Policy
        </NavLink>
        <NavLink to="/terms-of-service" className="text-muted-foreground hover:text-foreground">
          Terms of Service
        </NavLink>
      </div>
      <div className="flex justify-center space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
          Instagram
        </a>
      </div>
    </div>
  </footer>
);

export default Layout;