import { Achievement } from "@shared/schema";
import { Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-green-800">Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-yellow-50 to-white border-yellow-100">
              <CardContent className="p-4 flex items-center gap-3">
                <Medal className="w-8 h-8 text-yellow-500" />
                <div>
                  <h3 className="font-medium text-gray-800">{achievement.type}</h3>
                  <p className="text-sm text-gray-500">
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
