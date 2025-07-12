"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Checkbox } from "../../components/ui/checkbox"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Upload, X, Plus, Recycle, ArrowLeft, Camera, AlertCircle, CheckCircle, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AddItemPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    brand: "",
    size: "",
    color: "",
    material: "",
    condition: "",
    originalPrice: "",
    pointsRequested: "",
    acceptSwaps: true,
    acceptPoints: true,
  })

  const categories = {
    Tops: ["T-Shirts", "Blouses", "Sweaters", "Hoodies", "Tank Tops"],
    Bottoms: ["Jeans", "Pants", "Shorts", "Skirts", "Leggings"],
    Dresses: ["Casual Dresses", "Formal Dresses", "Maxi Dresses", "Mini Dresses"],
    Outerwear: ["Jackets", "Coats", "Blazers", "Cardigans", "Vests"],
    Footwear: ["Sneakers", "Boots", "Heels", "Flats", "Sandals"],
    Accessories: ["Bags", "Jewelry", "Scarves", "Hats", "Belts"],
  }

  const conditions = [
    { value: "like-new", label: "Like New", description: "Barely worn, no visible flaws" },
    { value: "excellent", label: "Excellent", description: "Gently used, minimal wear" },
    { value: "very-good", label: "Very Good", description: "Some signs of wear, good condition" },
    { value: "good", label: "Good", description: "Noticeable wear but still functional" },
    { value: "fair", label: "Fair", description: "Significant wear, may have minor flaws" },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages((prev) => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", { formData, uploadedImages, tags })
  }

  const progress = (currentStep / 3) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">List a New Item</h1>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStep} of 3</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span className={currentStep >= 1 ? "text-green-600 font-medium" : "text-gray-400"}>
              Photos & Basic Info
            </span>
            <span className={currentStep >= 2 ? "text-green-600 font-medium" : "text-gray-400"}>
              Details & Condition
            </span>
            <span className={currentStep >= 3 ? "text-green-600 font-medium" : "text-gray-400"}>Pricing & Review</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Photos & Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Upload Photos
                  </CardTitle>
                  <CardDescription>
                    Add up to 8 high-quality photos. The first photo will be your main image.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        {index === 0 && <Badge className="absolute bottom-1 left-1 bg-green-600 text-xs">Main</Badge>}
                      </div>
                    ))}

                    {uploadedImages.length < 8 && (
                      <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
                        <Upload className="h-6 w-6 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Add Photo</span>
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>

                  {uploadedImages.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No photos uploaded yet</p>
                      <label>
                        <Button type="button" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Photos
                        </Button>
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Item Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Vintage Levi's Denim Jacket"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail. Include any flaws, special features, or styling notes..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: "" })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(categories).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subcategory">Subcategory</Label>
                      <Select
                        value={formData.subcategory}
                        onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                        disabled={!formData.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.category &&
                            categories[formData.category as keyof typeof categories]?.map((subcategory) => (
                              <SelectItem key={subcategory} value={subcategory}>
                                {subcategory}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Details & Condition */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        placeholder="e.g., Levi's, Zara, H&M"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="size">Size *</Label>
                      <Input
                        id="size"
                        placeholder="e.g., M, 32, 8, One Size"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        placeholder="e.g., Blue, Black, Floral"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="material">Material</Label>
                      <Input
                        id="material"
                        placeholder="e.g., 100% Cotton, Polyester Blend"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Condition *</CardTitle>
                  <CardDescription>Be honest about the condition to ensure successful swaps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {conditions.map((condition) => (
                      <div
                        key={condition.value}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.condition === condition.value
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setFormData({ ...formData, condition: condition.value })}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="condition"
                            value={condition.value}
                            checked={formData.condition === condition.value}
                            onChange={() => setFormData({ ...formData, condition: condition.value })}
                            className="text-green-600"
                          />
                          <div>
                            <div className="font-medium">{condition.label}</div>
                            <div className="text-sm text-gray-500">{condition.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>Add tags to help others find your item</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                            <span>#{tag}</span>
                            <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Pricing & Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Exchange Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="originalPrice">Original Price (Optional)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="0"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="pointsRequested">Points Requested *</Label>
                    <Input
                      id="pointsRequested"
                      type="number"
                      placeholder="150"
                      value={formData.pointsRequested}
                      onChange={(e) => setFormData({ ...formData, pointsRequested: e.target.value })}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">Suggested: 80-200 points based on condition and brand</p>
                  </div>

                  <div className="space-y-3">
                    <Label>Exchange Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="acceptSwaps"
                          checked={formData.acceptSwaps}
                          onCheckedChange={(checked) => setFormData({ ...formData, acceptSwaps: checked as boolean })}
                        />
                        <Label htmlFor="acceptSwaps">Accept direct swaps</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="acceptPoints"
                          checked={formData.acceptPoints}
                          onCheckedChange={(checked) => setFormData({ ...formData, acceptPoints: checked as boolean })}
                        />
                        <Label htmlFor="acceptPoints">Accept point redemption</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Review Your Listing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      {uploadedImages.length > 0 && (
                        <Image
                          src={uploadedImages[0] || "/placeholder.svg"}
                          alt="Main item photo"
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">{formData.title || "Item Title"}</h3>
                      <p className="text-sm text-gray-600">{formData.description || "Item description"}</p>
                      <div className="space-y-1 text-sm">
                        <div>
                          <strong>Category:</strong> {formData.category}{" "}
                          {formData.subcategory && `> ${formData.subcategory}`}
                        </div>
                        <div>
                          <strong>Brand:</strong> {formData.brand || "Not specified"}
                        </div>
                        <div>
                          <strong>Size:</strong> {formData.size || "Not specified"}
                        </div>
                        <div>
                          <strong>Condition:</strong> {formData.condition || "Not specified"}
                        </div>
                        <div>
                          <strong>Points:</strong> {formData.pointsRequested || "0"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-800 mb-1">Before you submit:</p>
                      <ul className="text-green-700 space-y-1">
                        <li>• Make sure all photos are clear and show the item accurately</li>
                        <li>• Double-check that your description is honest and detailed</li>
                        <li>• Your listing will be reviewed by our team within 24 hours</li>
                        <li>• You'll receive an email notification once it's approved</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                className="bg-green-600 hover:bg-green-700"
              >
                Next
              </Button>
            ) : (
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit for Review
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
