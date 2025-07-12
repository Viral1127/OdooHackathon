"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Slider } from "../../components/ui/slider";
import {
  Search,
  Filter,
  Grid,
  List,
  Heart,
  Star,
  Recycle,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");

  const items = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      category: "Outerwear",
      condition: "Excellent",
      points: 150,
      size: "M",
      brand: "Levi's",
      image: "/placeholder.svg?height=300&width=300",
      user: "Sarah M.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      location: "New York, NY",
      uploadDate: "2 days ago",
    },
    {
      id: 2,
      title: "Designer Silk Scarf",
      category: "Accessories",
      condition: "Like New",
      points: 80,
      size: "One Size",
      brand: "Hermès",
      image: "/placeholder.svg?height=300&width=300",
      user: "Emma K.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      location: "Los Angeles, CA",
      uploadDate: "1 day ago",
    },
    {
      id: 3,
      title: "Cotton Summer Dress",
      category: "Dresses",
      condition: "Good",
      points: 120,
      size: "S",
      brand: "Zara",
      image: "/placeholder.svg?height=300&width=300",
      user: "Lisa R.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      location: "Chicago, IL",
      uploadDate: "3 days ago",
    },
    {
      id: 4,
      title: "Leather Boots",
      category: "Footwear",
      condition: "Very Good",
      points: 200,
      size: "8",
      brand: "Dr. Martens",
      image: "/placeholder.svg?height=300&width=300",
      user: "Anna T.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      location: "Seattle, WA",
      uploadDate: "1 week ago",
    },
    {
      id: 5,
      title: "Cashmere Sweater",
      category: "Tops",
      condition: "Excellent",
      points: 180,
      size: "L",
      brand: "Uniqlo",
      image: "/placeholder.svg?height=300&width=300",
      user: "Mike D.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      location: "Boston, MA",
      uploadDate: "4 days ago",
    },
    {
      id: 6,
      title: "High-Waisted Jeans",
      category: "Bottoms",
      condition: "Good",
      points: 90,
      size: "28",
      brand: "American Eagle",
      image: "/placeholder.svg?height=300&width=300",
      user: "Jess W.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      location: "Austin, TX",
      uploadDate: "5 days ago",
    },
  ];

  // Filter logic
  const filteredItems = items.filter((item) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);
    const matchSize =
      selectedSizes.length === 0 || selectedSizes.includes(item.size);
    const matchCondition =
      selectedConditions.length === 0 ||
      selectedConditions.includes(item.condition);
    const matchPoints =
      item.points >= priceRange[0] && item.points <= priceRange[1];
    const matchBrand =
      brandSearch.trim() === "" ||
      item.brand.toLowerCase().includes(brandSearch.toLowerCase());

    return (
      matchCategory && matchSize && matchCondition && matchPoints && matchBrand
    );
  });

  const categoryOptions = [
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
    "Footwear",
    "Accessories",
  ];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "28", "8"];
  const conditionOptions = [
    "Like New",
    "Excellent",
    "Very Good",
    "Good",
    "Fair",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <Recycle className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">ReWear</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Search for items, brands, or users..." className="pl-10 pr-4 w-full" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">
                  <User className="h-5 w-5 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/add-item">
                <Button className="bg-green-600 hover:bg-green-700">List Item</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`w-80 space-y-6 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>

                {/* Category Filter */}
                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-medium">Category</Label>
                  <div className="space-y-2">
                    {categoryOptions.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) =>
                            setSelectedCategories((prev) =>
                              checked
                                ? [...prev, category]
                                : prev.filter((c) => c !== category)
                            )
                          }
                        />
                        <Label htmlFor={category} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-medium">Size</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {sizeOptions.map((size) => (
                      <Button
                        key={size}
                        variant="outline"
                        size="sm"
                        className={`h-8 px-3 ${
                          selectedSizes.includes(size)
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-transparent"
                        }`}
                        onClick={() =>
                          setSelectedSizes((prev) =>
                            prev.includes(size)
                              ? prev.filter((s) => s !== size)
                              : [...prev, size]
                          )
                        }
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-medium">Condition</Label>
                  <div className="space-y-2">
                    {conditionOptions.map((condition) => (
                      <div
                        key={condition}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={condition}
                          checked={selectedConditions.includes(condition)}
                          onCheckedChange={(checked) =>
                            setSelectedConditions((prev) =>
                              checked
                                ? [...prev, condition]
                                : prev.filter((c) => c !== condition)
                            )
                          }
                        />
                        <Label htmlFor={condition} className="text-sm">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Points Range */}
                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-medium">Points Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{priceRange[0]} pts</span>
                    <span>{priceRange[1]} pts</span>
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Brand</Label>
                  <Input
                    placeholder="Search brands..."
                    className="h-8"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* ... controls (sorting/view mode) and rendering filteredItems instead of items ... */}
            {filteredItems.length === 0 ? (
              <div className="text-center text-gray-500 py-20">
                <p className="text-lg font-semibold">No items found</p>
                <p className="text-sm mt-2">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Link key={item.id} href={`/item/${item.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardContent className="p-0">
                        <div className="relative">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={300}
                            height={300}
                            className="w-full h-64 object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-2 left-2 bg-green-600">
                            {item.condition}
                          </Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {item.brand} • Size {item.size}
                          </p>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-bold text-green-600">
                              {item.points} pts
                            </span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-xs text-gray-500">
                                {item.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Image
                                src={item.userAvatar}
                                alt={item.user}
                                width={20}
                                height={20}
                                className="rounded-full mr-2"
                              />
                              <span className="text-xs text-gray-500">
                                {item.user}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {item.uploadDate}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
