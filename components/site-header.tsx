"use client"

import Link from "next/link"
import { Search, User, ArrowRight, Menu, Camera } from "lucide-react"
import { useState, useRef, KeyboardEvent } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartDrawer } from "@/components/cart-drawer"
import { products } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import useStore from "@/lib/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { VisualSearchDialog } from "@/components/visual-search-dialog"
import { ImageSearch } from "@/components/image-search"

export function SiteHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [showResults, setShowResults] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileSearchQuery, setMobileSearchQuery] = useState("")
  const [imageSearchOpen, setImageSearchOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    
    if (query.trim() === "") {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const results = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.material?.toLowerCase().includes(query.toLowerCase())
    )

    setSearchResults(results)
    setShowResults(true)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowResults(false)
      setMobileSearchOpen(false)
    }
  }

  const navigateToSearchPage = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowResults(false)
      setMobileSearchOpen(false)
    }
  }

  const handleMobileSearch = (query: string) => {
    setMobileSearchQuery(query)
    if (query.trim()) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filteredProducts)
    } else {
      setSearchResults([])
    }
  }

  const handleMobileKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && mobileSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`)
      setMobileSearchOpen(false)
    }
  }

  const navigateToMobileSearchPage = () => {
    if (mobileSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`)
      setMobileSearchOpen(false)
    }
  }

  const handleImageSearch = (imageData: string) => {
    setSelectedImage(imageData)
    setIsSearching(true)
    
    // Log the image data to confirm we're receiving it
    console.log("Image search initiated with data length:", imageData.length);
    
    // Here you would typically make an API call to your backend for image similarity search
    // For demonstration purposes, we'll use the actual image to show in the console
    const img = new Image();
    img.onload = () => {
      console.log("Image loaded successfully, dimensions:", img.width, "x", img.height);
      
      // Simulate API search with random products and a delay
      setTimeout(() => {
        // In a real app, you would send the image to your backend API
        // and receive similar products based on visual similarity
        const simulatedResults = products
          .sort(() => Math.random() - 0.5)
          .slice(0, 8)
        
        setSearchResults(simulatedResults)
        setShowResults(true)
        setImageSearchOpen(false)
        setIsSearching(false)
        
        // Update query to indicate visual search
        setSearchQuery("Visual search results")
        setMobileSearchOpen(false)
      }, 1000);
    };
    
    img.onerror = () => {
      console.error("Failed to load image for search");
      setIsSearching(false);
      // You might want to show an error message here
    };
    
    // Set the source to the data URL
    img.src = imageData;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 hover-lift">
            <span className="font-display text-2xl font-bold tracking-tight">Fab & Fierce</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/category/dresses" className="text-sm font-medium hover-underline">
              Dresses
            </Link>
            <Link href="/category/shoes" className="text-sm font-medium hover-underline">
              Shoes
            </Link>
            <Link href="/category/bags" className="text-sm font-medium hover-underline">
              Bags
            </Link>
            <Link href="/category/accessories" className="text-sm font-medium hover-underline">
              Accessories
            </Link>
            <Link href="/new-arrivals" className="text-sm font-medium hover-underline">
              New Arrivals
            </Link>
          </nav>
        </div>
        
        {/* Desktop Search */}
        <div className="hidden md:flex relative w-full max-w-sm items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-full bg-background pl-8 pr-12 hover-glow focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={searchInputRef}
              onBlur={() => {
                setTimeout(() => setShowResults(false), 200)
              }}
              onFocus={() => {
                if (searchQuery) setShowResults(true)
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-accent"
              onClick={() => setImageSearchOpen(!imageSearchOpen)}
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Search by image</span>
            </Button>
            
            {/* Image Search Dropdown */}
            <ImageSearch 
              isOpen={imageSearchOpen}
              onClose={() => setImageSearchOpen(false)}
              onImageSelect={(imageData) => {
                handleImageSearch(imageData);
                setImageSearchOpen(false);
              }} 
            />
          </div>
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-[80vh] overflow-y-auto rounded-lg border bg-background shadow-lg hover-glow">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">
                    {selectedImage ? (
                      <div className="flex items-center">
                        <Camera className="mr-1 h-3 w-3" />
                        <span>Similar Products ({searchResults.length})</span>
                      </div>
                    ) : (
                      <span>Search Results ({searchResults.length})</span>
                    )}
                  </h3>
                  {selectedImage && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => setSelectedImage(null)}
                    >
                      Clear visual search
                    </Button>
                  )}
                </div>
                
                {isSearching ? (
                  <div className="py-8 flex flex-col items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-8 w-8 bg-muted-foreground/20 rounded-full mb-3"></div>
                      <div className="h-4 w-32 bg-muted-foreground/20 rounded-md"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {searchResults.slice(0, 4).map((product) => (
                        <Link 
                          key={product.id} 
                          href={`/product/${product.id}`}
                          className="flex flex-col rounded-lg p-2 hover:bg-accent"
                          onClick={() => {
                            setShowResults(false)
                            setSearchQuery("")
                            setSelectedImage(null)
                          }}
                        >
                          <div className="relative aspect-square overflow-hidden rounded-md mb-2">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {searchResults.length > 4 && (
                      <div className="mt-4 text-center">
                        <Button 
                          variant="link" 
                          className="text-sm" 
                          onClick={() => {
                            if (selectedImage) {
                              // Navigate to visual search results page
                              router.push(`/search?type=visual&q=${encodeURIComponent(searchQuery.trim())}`);
                            } else {
                              navigateToSearchPage();
                            }
                            setShowResults(false);
                          }}
                        >
                          View all {searchResults.length} results
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* No Results Message */}
          {showResults && searchQuery && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border bg-background p-4 shadow-lg">
              <p className="text-center text-sm text-muted-foreground mb-2">No products found</p>
              <div className="text-center">
                <Button 
                  variant="link" 
                  className="text-sm" 
                  onClick={navigateToSearchPage}
                >
                  Search all products
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Search Dialog */}
          <Dialog open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative h-9 w-9 md:hidden"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="top-4 gap-0 p-0 outline-none">
              <div className="sticky top-0 z-20 flex items-center gap-2 border-b bg-background px-4 py-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full rounded-full bg-background pl-8 pr-12"
                    value={mobileSearchQuery}
                    onChange={(e) => handleMobileSearch(e.target.value)}
                    onKeyDown={handleMobileKeyDown}
                    ref={mobileSearchInputRef}
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-accent"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent closing the search dialog
                      setImageSearchOpen(!imageSearchOpen);
                    }}
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Search by image</span>
                  </Button>
                  
                  {/* Mobile Image Search Dropdown */}
                  <ImageSearch 
                    isOpen={imageSearchOpen}
                    onClose={() => setImageSearchOpen(false)}
                    onImageSelect={(imageData) => {
                      handleImageSearch(imageData);
                      setImageSearchOpen(false);
                    }} 
                  />
                </div>
              </div>

              {/* Mobile Search Results */}
              {searchResults.length > 0 && (mobileSearchQuery || selectedImage) && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">
                      {selectedImage ? (
                        <div className="flex items-center">
                          <Camera className="mr-1 h-3 w-3" />
                          <span>Similar Products</span>
                        </div>
                      ) : (
                        <span>Quick Results</span>
                      )}
                    </h3>
                    {selectedImage && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => setSelectedImage(null)}
                      >
                        Clear
                      </Button>
                    )}
                  </div>

                  {isSearching ? (
                    <div className="py-8 flex flex-col items-center justify-center">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-8 bg-muted-foreground/20 rounded-full mb-3"></div>
                        <div className="h-4 w-32 bg-muted-foreground/20 rounded-md"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {searchResults.slice(0, 3).map((product) => (
                        <Link 
                          key={product.id} 
                          href={`/product/${product.id}`}
                          className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent"
                          onClick={() => {
                            setMobileSearchQuery("")
                            setMobileSearchOpen(false)
                            setSelectedImage(null)
                          }}
                        >
                          <div className="relative h-12 w-12 overflow-hidden rounded-md">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                        </Link>
                      ))}
                      
                      {searchResults.length > 3 && (
                        <Button 
                          variant="link" 
                          className="text-sm w-full" 
                          onClick={() => {
                            if (selectedImage) {
                              router.push(`/search?type=visual&q=visual_search`);
                            } else {
                              navigateToMobileSearchPage();
                            }
                            setMobileSearchOpen(false);
                          }}
                        >
                          View all {searchResults.length} results
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
          
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">My Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  setUser(null)
                  router.push("/")
                }}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Link>
            </Button>
          )}
          <CartDrawer />
        </div>
      </div>
    </header>
  )
} 