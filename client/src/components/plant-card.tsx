import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Plant } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/plants/${plant.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/plants/${plant.userId}`] });
      toast({
        title: "Plant Removed",
        description: "The plant has been removed from your collection",
      });
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden bg-gradient-to-b from-green-50 to-white border-green-100">
        <CardHeader className="p-0">
          <div className="aspect-square w-full overflow-hidden relative">
            <img 
              src={plant.imageUrl} 
              alt={plant.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-green-800">{plant.name}</h3>
          <p className="text-sm italic text-green-600">{plant.scientificName}</p>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {plant.description}
          </p>
          <div className="mt-3 text-xs text-gray-500">
            Added on {new Date(plant.dateAdded).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}