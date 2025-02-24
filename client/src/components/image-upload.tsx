import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageSelected: (image: string) => void;
}

export function ImageUpload({ onImageSelected }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onImageSelected(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          {preview ? (
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2"
                onClick={() => setPreview(null)}
              >
                Change Image
              </Button>
            </div>
          ) : (
            <label className="w-full cursor-pointer">
              <div className="border-2 border-dashed border-green-200 rounded-lg p-8 flex flex-col items-center gap-2">
                <Camera className="w-12 h-12 text-green-400" />
                <span className="text-sm text-gray-600">Click to upload or take a photo</span>
              </div>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
