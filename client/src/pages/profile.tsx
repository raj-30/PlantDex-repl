import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { CollectionGrid } from "@/components/collection-grid";
import { Achievements } from "@/components/achievements";
import { Plant, Achievement } from "@shared/schema";

export default function Profile() {
  const { id = "1" } = useParams();
  const userId = parseInt(id);

  const { data: plants = [] } = useQuery<Plant[]>({
    queryKey: ["/api/plants", userId],
  });

  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements", userId],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-800">My Plant Collection</h1>
          <p className="text-gray-600 mt-2">
            {plants.length} plants collected • {achievements.length} achievements earned
          </p>
        </div>

        <CollectionGrid plants={plants} />
        <Achievements achievements={achievements} />
      </div>
    </div>
  );
}