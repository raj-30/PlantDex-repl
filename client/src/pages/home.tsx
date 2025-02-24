import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const identifyMutation = useMutation({
    mutationFn: async (image: string) => {
      const response = await apiRequest("POST", "/api/identify", { image });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Plant Identified!",
        description: `We found a ${data.name}`,
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Discover and Collect Plants
          </h1>
          <p className="text-lg text-gray-600">
            Scan any plant to identify it and add it to your collection
          </p>
        </div>

        <div className="space-y-8">
          <ImageUpload onImageSelected={setSelectedImage} />
          
          {selectedImage && (
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => identifyMutation.mutate(selectedImage)}
                disabled={identifyMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                <Leaf className="mr-2 h-5 w-5" />
                {identifyMutation.isPending ? "Identifying..." : "Identify Plant"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
