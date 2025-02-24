import { Plant } from "@shared/schema";
import { PlantCard } from "./plant-card";

interface CollectionGridProps {
  plants: Plant[];
}

export function CollectionGrid({ plants }: CollectionGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
}
