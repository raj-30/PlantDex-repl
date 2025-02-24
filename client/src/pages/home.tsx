import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Leaf, Trophy, Flower } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showTrophy, setShowTrophy] = useState(false);
  const { toast } = useToast();

  const identifyMutation = useMutation({
    mutationFn: async (image: string) => {
      const response = await apiRequest("POST", "/api/identify", { image });
      return response.json();
    },
    onSuccess: (data) => {
      setShowTrophy(true);
      setTimeout(() => setShowTrophy(false), 3000);
      toast({
        title: "🌿 Plant Discovered!",
        description: `You found a ${data.name}! Added to your collection.`,
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-green-800 mb-4 relative inline-block">
            PlantDex
            <motion.span
              className="absolute -right-12 -top-8 text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌱
            </motion.span>
          </h1>
          <p className="text-xl text-green-600 mb-6">
            Discover and Collect Amazing Plants!
          </p>
          <Link href="/profile/1">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50"
            >
              <Flower className="mr-2 h-5 w-5" />
              View My Collection
            </Button>
          </Link>
        </motion.div>

        <div className="space-y-6">
          <AnimatePresence>
            {showTrophy && (
              <motion.div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <div className="bg-yellow-100 p-8 rounded-full shadow-lg">
                  <Trophy className="w-20 h-20 text-yellow-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ImageUpload onImageSelected={setSelectedImage} />

          {selectedImage && (
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                size="lg"
                onClick={() => identifyMutation.mutate(selectedImage)}
                disabled={identifyMutation.isPending}
                className="bg-green-600 hover:bg-green-700 text-lg"
              >
                <Leaf className="mr-2 h-6 w-6" />
                {identifyMutation.isPending ? "Identifying..." : "Identify Plant!"}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}