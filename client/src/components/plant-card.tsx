import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plant } from "@shared/schema";

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden bg-gradient-to-b from-green-50 to-white border-green-100">
        <CardHeader className="p-0">
          <div className="aspect-square w-full overflow-hidden">
            <img 
              src={plant.imageUrl} 
              alt={plant.name}
              className="w-full h-full object-cover"
            />
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
