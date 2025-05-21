"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Upload, X, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageSearchProps {
  onImageSelect: (imageData: string) => void
  isOpen: boolean
  onClose: () => void
}

export function ImageSearch({ onImageSelect, isOpen, onClose }: ImageSearchProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setPreview(null);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Handle keyboard events for paste
  useEffect(() => {
    const handlePasteGlobal = (e: ClipboardEvent) => {
      if (isOpen && containerRef.current) {
        const items = e.clipboardData?.items;
        if (items) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              const file = items[i].getAsFile();
              if (file) {
                handleImageFile(file);
              }
              break;
            }
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('paste', handlePasteGlobal);
    }
    
    return () => {
      document.removeEventListener('paste', handlePasteGlobal);
    };
  }, [isOpen]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const validateImage = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      return false;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image is too large. Maximum size is 5MB.");
      return false;
    }
    
    setError(null);
    return true;
  }

  const handleImageFile = (file: File) => {
    if (validateImage(file)) {
      setIsLoading(true);
      const reader = new FileReader();
      
      reader.onload = () => {
        const imageData = reader.result as string;
        setPreview(imageData);
        setIsLoading(false);
      };
      
      reader.onerror = () => {
        setError("Failed to read the image. Please try again.");
        setIsLoading(false);
      };
      
      reader.readAsDataURL(file);
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
      
      // Reset file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  const handleSearch = () => {
    if (preview) {
      onImageSelect(preview);
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleImageFile(file);
        }
        break;
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute top-full right-0 mt-2 bg-background border rounded-lg shadow-lg w-80 z-50 overflow-hidden"
      onPaste={handlePaste}
      tabIndex={0} // Make div focusable for keyboard events
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Search by Image</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full" 
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        {error && (
          <div className="mb-3 p-2 bg-destructive/10 text-destructive rounded-md text-xs flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">Processing image...</p>
          </div>
        ) : preview ? (
          <div className="space-y-3">
            <div className="border rounded-md overflow-hidden">
              <img src={preview} alt="Preview" className="w-full h-auto" />
            </div>
            <div className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => setPreview(null)}
              >
                Remove
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed p-4 text-center ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mb-2 h-5 w-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground mb-2">
              Drag image here, paste, or
            </p>
            <label htmlFor="image-search-upload" className="cursor-pointer">
              <Button variant="outline" size="sm" className="text-xs">
                Select File
              </Button>
              <input 
                id="image-search-upload" 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange} 
              />
            </label>
            <p className="mt-2 text-[10px] text-muted-foreground">
              Max size: 5MB
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

