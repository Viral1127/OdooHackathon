"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  Check,
  X,
  Eye,
  Trash2,
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
  Shield,
  Settings,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalUsers: 15234,
    activeListings: 3456,
    pendingReviews: 23,
    totalSwaps: 8901,
    flaggedItems: 5,
    newUsersToday: 45,
  }

  const pendingItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      user: "Sarah M.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      category: "Outerwear",
      condition: "Excellent",
      points: 150,
      submittedDate: "2 hours ago",
      images: ["/placeholder.svg?height=100&width=100"],
      status: "pending",
    },
    {
      id: 2,
      title: "Designer Silk Scarf",
      user: "Emma K.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      category: "Accessories",
      condition: "Like New",
      points: 80,
      submittedDate: "4 hours ago",
      images: ["/placeholder.svg?height=100&width=100"],
      status: "pending",
    },
    {
      id: 3,
      title: "Cotton Summer Dress",
      user: "Lisa R.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      category: "Dresses",
      condition: "Good",
      points: 120,
      submittedDate: "6 hours ago",
      images: ["/placeholder.svg?height=100&width=100"],
      status: "pending",
    },
  ]

  const users = [
    {
      id: 1,
      name: "Sarah Mitchell",
      email: "sarah.m@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Jan 2024",
      totalSwaps: 23,
      rating: 4.8,
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Emma Johnson",
      email: "emma.j@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Feb 2024",
      totalSwaps: 15,
      rating: 4.9,
      status: "active",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      email: "lisa.r@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Mar 2024",
      totalSwaps: 8,
      rating: 4.6,
      status: "suspended",
      lastActive: "3 days ago",
    },
    {
      id: 4,
      name: "Mike Davis",
      email: "mike.d@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Mar 2024",
      totalSwaps: 12,
      rating: 4.7,
      status: "active",
      lastActive: "5 hours ago",
    },
  ]

  const flaggedItems = [
    {
      id: 1,
      title: "Suspicious Designer Bag",
      user: "John D.",
      reason: "Potential counterfeit",
      reportedBy: "Multiple users",
      flaggedDate: "1 day ago",
      severity: "high",
    },
    {
      id: 2,
      title: "Inappropriate Content",
      user: "Jane S.",
      reason: "Inappropriate photos",
      reportedBy: "User123",
      flaggedDate: "2 days ago",
      severity: "medium",
    },
  ]

  const handleApproveItem = (itemId: number) => {
    console.log("Approving item:", itemId)
  }

  const handleRejectItem = (itemId: number) => {
    console.log("Rejecting item:", itemId)
  }

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user:`, userId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
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
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">ReWear Admin</h1>
                <p className="text-sm text-gray-500">Platform Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="listings">Manage Listings</TabsTrigger>
            <TabsTrigger value="reports">Reports & Flags</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                      <p className="text-sm text-green-600">+{stats.newUsersToday} today</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Listings</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeListings.toLocaleString()}</p>
                      <p className="text-sm text-blue-600">{stats.pendingReviews} pending review</p>
                    </div>
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Swaps</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalSwaps.toLocaleString()}</p>
                      <p className="text-sm text-purple-600">All time</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingReviews}</p>
                      <p className="text-sm text-orange-600">Requires attention</p>
                    </div>
                    <Eye className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Flagged Items</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.flaggedItems}</p>
                      <p className="text-sm text-red-600">Needs review</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New user registration: Emma K.</span>
                    <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Item swap completed: Sarah M. ↔ Lisa R.</span>
                    <span className="text-xs text-gray-500 ml-auto">15 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">New item listed: Vintage Denim Jacket</span>
                    <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">5 items flagged for review</span>
                    <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                      Review
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">23 listings pending approval</span>
                    <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                      Review
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Server capacity at 78%</span>
                    <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                      Monitor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search users..." className="pl-10 w-64" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="new">New Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900">User</th>
                        <th className="text-left p-4 font-medium text-gray-900">Join Date</th>
                        <th className="text-left p-4 font-medium text-gray-900">Swaps</th>
                        <th className="text-left p-4 font-medium text-gray-900">Rating</th>
                        <th className="text-left p-4 font-medium text-gray-900">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900">Last Active</th>
                        <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{user.joinDate}</td>
                          <td className="p-4 text-sm text-gray-600">{user.totalSwaps}</td>
                          <td className="p-4 text-sm text-gray-600">{user.rating}</td>
                          <td className="p-4">
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{user.lastActive}</td>
                          <td className="p-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleUserAction(user.id, "view")}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUserAction(user.id, "suspend")}>
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Suspend User
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleUserAction(user.id, "delete")}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Listing Management</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search listings..." className="pl-10 w-64" />
                </div>
                <Select defaultValue="pending">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {pendingItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <Image
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.title}
                        width={120}
                        height={120}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <Badge className="bg-yellow-100 text-yellow-800">{item.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div>
                            <p>
                              <strong>Category:</strong> {item.category}
                            </p>
                            <p>
                              <strong>Condition:</strong> {item.condition}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Points:</strong> {item.points}
                            </p>
                            <p>
                              <strong>Submitted:</strong> {item.submittedDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={item.userAvatar || "/placeholder.svg"} alt={item.user} />
                              <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{item.user}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveItem(item.id)}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleRejectItem(item.id)}>
                              <X className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Reports & Flagged Content</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {flaggedItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <Badge className={getSeverityColor(item.severity)}>{item.severity} priority</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div>
                            <p>
                              <strong>User:</strong> {item.user}
                            </p>
                            <p>
                              <strong>Reason:</strong> {item.reason}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Reported by:</strong> {item.reportedBy}
                            </p>
                            <p>
                              <strong>Flagged:</strong> {item.flaggedDate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
