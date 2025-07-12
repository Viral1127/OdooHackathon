"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Separator } from "../../../components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import {
  Heart,
  Share2,
  MessageCircle,
  Star,
  MapPin,
  Calendar,
  Package,
  Shield,
  ArrowLeft,
  Recycle,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const item = {
    id: params.id,
    title: "Vintage Denim Jacket",
    description:
      "Beautiful vintage Levi's denim jacket in excellent condition. This classic piece has been well-maintained and shows minimal signs of wear. Perfect for layering and adding a timeless touch to any outfit. The jacket features the iconic Levi's red tab and original hardware. Size runs true to vintage sizing.",
    category: "Outerwear",
    condition: "Excellent",
    points: 150,
    size: "M",
    brand: "Levi's",
    color: "Blue",
    material: "100% Cotton Denim",
    tags: ["vintage", "denim", "classic", "unisex"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    user: {
      name: "Sarah M.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      totalSwaps: 23,
      joinDate: "January 2024",
      location: "New York, NY",
      responseTime: "Usually responds within 2 hours",
    },
    uploadDate: "2 days ago",
    views: 45,
    likes: 12,
    availability: "Available",
  }

  const relatedItems = [
    {
      id: 2,
      title: "Vintage Band T-Shirt",
      points: 80,
      image: "/placeholder.svg?height=200&width=200",
      condition: "Good",
    },
    {
      id: 3,
      title: "Classic Leather Jacket",
      points: 250,
      image: "/placeholder.svg?height=200&width=200",
      condition: "Excellent",
    },
    {
      id: 4,
      title: "Retro Windbreaker",
      points: 120,
      image: "/placeholder.svg?height=200&width=200",
      condition: "Very Good",
    },
    {
      id: 5,
      title: "Denim Vest",
      points: 90,
      image: "/placeholder.svg?height=200&width=200",
      condition: "Good",
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/browse" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Browse
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <Link href="/" className="flex items-center space-x-2">
                <Recycle className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">ReWear</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">
                  <User className="h-5 w-5 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={item.images[currentImageIndex] || "/placeholder.svg"}
                alt={item.title}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {item.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative rounded-lg overflow-hidden ${
                    index === currentImageIndex ? "ring-2 ring-green-500" : ""
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${item.title} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{item.brand}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>Size {item.size}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-500" : "text-gray-500"}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">{item.condition}</Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {item.availability}
                </Badge>
                <div className="text-3xl font-bold text-green-600">{item.points} pts</div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">Request Swap</Button>
              <Button variant="outline" className="w-full text-lg py-3 bg-transparent">
                Redeem with Points
              </Button>
              <Button variant="ghost" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Seller
              </Button>
            </div>

            {/* Item Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
              <div className="text-center">
                <div className="text-lg font-semibold">{item.views}</div>
                <div className="text-sm text-gray-500">Views</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{item.likes}</div>
                <div className="text-sm text-gray-500">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{item.uploadDate}</div>
                <div className="text-sm text-gray-500">Listed</div>
              </div>
            </div>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
                    <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold">{item.user.name}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {item.user.rating} • {item.user.totalSwaps} swaps
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {item.user.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Member since {item.user.joinDate}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {item.user.responseTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Item Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Item Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Brand:</span>
                          <span>{item.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span>{item.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Color:</span>
                          <span>{item.color}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Material:</span>
                          <span>{item.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Condition:</span>
                          <span>{item.condition}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Care Instructions</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          Machine wash cold
                        </div>
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          Tumble dry low
                        </div>
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          Do not bleach
                        </div>
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          Iron on low heat
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Package className="h-5 w-5 mr-2" />
                        Shipping Information
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• Items are shipped within 2-3 business days after swap confirmation</p>
                        <p>• All items are carefully packaged in eco-friendly materials</p>
                        <p>• Tracking information will be provided once shipped</p>
                        <p>• Estimated delivery: 3-7 business days</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        ReWear Protection
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• All swaps are protected by our satisfaction guarantee</p>
                        <p>• Items must match the description provided</p>
                        <p>• Report any issues within 48 hours of delivery</p>
                        <p>• Full refund of points if item is not as described</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedItems.map((relatedItem) => (
              <Link key={relatedItem.id} href={`/item/${relatedItem.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <Image
                      src={relatedItem.image || "/placeholder.svg"}
                      alt={relatedItem.title}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{relatedItem.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">{relatedItem.points} pts</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">{relatedItem.condition}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
