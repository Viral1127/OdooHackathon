"use client"

import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Progress } from "../../components/ui/progress"
import { Recycle, Star, Package, ArrowUpDown, Plus, Edit, Trash2, Eye, Heart, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import router from "next/router"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
   const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

   useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const userStats = {
    totalPoints: 1250,
    itemsListed: 12,
    itemsSwapped: 8,
    rating: 4.8,
    joinDate: "March 2024",
    level: "Eco Warrior",
    nextLevel: "Sustainability Champion",
    pointsToNextLevel: 250,
  }

  const myListings = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      category: "Outerwear",
      condition: "Excellent",
      points: 150,
      status: "Active",
      views: 45,
      likes: 12,
      image: "/placeholder.svg?height=100&width=100",
      listedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Designer Silk Scarf",
      category: "Accessories",
      condition: "Like New",
      points: 80,
      status: "Pending Approval",
      views: 0,
      likes: 0,
      image: "/placeholder.svg?height=100&width=100",
      listedDate: "1 day ago",
    },
    {
      id: 3,
      title: "Cotton Summer Dress",
      category: "Dresses",
      condition: "Good",
      points: 120,
      status: "Swapped",
      views: 67,
      likes: 18,
      image: "/placeholder.svg?height=100&width=100",
      listedDate: "1 week ago",
    },
    {
      id: 4,
      title: "Leather Boots",
      category: "Footwear",
      condition: "Very Good",
      points: 200,
      status: "Active",
      views: 89,
      likes: 24,
      image: "/placeholder.svg?height=100&width=100",
      listedDate: "3 days ago",
    },
  ]

  const mySwaps = [
    {
      id: 1,
      type: "Outgoing",
      itemGiven: "Vintage Band T-Shirt",
      itemReceived: "Denim Jacket",
      otherUser: "Sarah M.",
      status: "Completed",
      date: "1 week ago",
      rating: 5,
    },
    {
      id: 2,
      type: "Incoming",
      itemGiven: "Summer Dress",
      itemReceived: "Silk Blouse",
      otherUser: "Emma K.",
      status: "In Progress",
      date: "2 days ago",
      rating: null,
    },
    {
      id: 3,
      type: "Points Redemption",
      itemGiven: null,
      itemReceived: "Designer Handbag",
      otherUser: "Lisa R.",
      status: "Completed",
      date: "2 weeks ago",
      pointsUsed: 300,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "Swapped":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <Recycle className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">ReWear</span>
              </Link>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/browse">
                <Button variant="ghost">Browse Items</Button>
              </Link>
              <Link href="/add-item">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  List Item
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                <p className="text-gray-600">Member since {userStats.joinDate}</p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-purple-100 text-purple-800 mr-2">{userStats.level}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{userStats.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">rating</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{userStats.totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{userStats.itemsListed}</div>
                <div className="text-sm text-gray-600">Items Listed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{userStats.itemsSwapped}</div>
                <div className="text-sm text-gray-600">Items Swapped</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{userStats.rating}</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress to Next Level */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress to {userStats.nextLevel}</span>
              <span className="text-sm text-gray-500">{userStats.pointsToNextLevel} points to go</span>
            </div>
            <Progress value={83} className="h-2" />
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="swaps">My Swaps</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Listed "Vintage Denim Jacket" for 150 points</span>
                    <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Completed swap with Sarah M.</span>
                    <span className="text-xs text-gray-500 ml-auto">1 week ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Earned 50 bonus points for eco-friendly packaging</span>
                    <span className="text-xs text-gray-500 ml-auto">2 weeks ago</span>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">First Swap</div>
                      <div className="text-xs text-gray-500">Complete your first item swap</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Recycle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Eco Warrior</div>
                      <div className="text-xs text-gray-500">List 10 items for exchange</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">5-Star Member</div>
                      <div className="text-xs text-gray-500">Maintain 4.5+ rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Listings ({myListings.length})</h2>
              <Link href="/add-item">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className={`absolute top-2 left-2 ${getStatusColor(item.status)}`}>{item.status}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {item.category} • {item.condition}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-green-600">{item.points} pts</span>
                        <span className="text-xs text-gray-500">{item.listedDate}</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {item.views}
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {item.likes}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <h2 className="text-xl font-semibold">My Swaps ({mySwaps.length})</h2>

            <div className="space-y-4">
              {mySwaps.map((swap) => (
                <Card key={swap.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            swap.type === "Outgoing"
                              ? "bg-blue-500"
                              : swap.type === "Incoming"
                                ? "bg-green-500"
                                : "bg-purple-500"
                          }`}
                        ></div>
                        <div>
                          <div className="font-medium">
                            {swap.type === "Points Redemption"
                              ? `Redeemed ${swap.itemReceived} for ${swap.pointsUsed} points`
                              : `${swap.itemGiven} ↔ ${swap.itemReceived}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {swap.type !== "Points Redemption" && `With ${swap.otherUser} • `}
                            {swap.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(swap.status)}>{swap.status}</Badge>
                        {swap.rating && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm">{swap.rating}</span>
                          </div>
                        )}
                        {swap.status === "Completed" && !swap.rating && swap.type !== "Points Redemption" && (
                          <Button size="sm" variant="outline">
                            Rate User
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-xl font-semibold">Activity Feed</h2>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Package className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">New item listed</div>
                      <div className="text-sm text-gray-500">You listed "Vintage Denim Jacket" for 150 points</div>
                      <div className="text-xs text-gray-400 mt-1">2 days ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <ArrowUpDown className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Swap completed</div>
                      <div className="text-sm text-gray-500">Successfully swapped with Sarah M.</div>
                      <div className="text-xs text-gray-400 mt-1">1 week ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Achievement unlocked</div>
                      <div className="text-sm text-gray-500">Earned "Eco Warrior" badge for listing 10 items</div>
                      <div className="text-xs text-gray-400 mt-1">2 weeks ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
