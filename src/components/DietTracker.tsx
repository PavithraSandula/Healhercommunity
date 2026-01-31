import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface DietTrackerProps {
  onBack: () => void;
}

interface Meal {
  id: string;
  name: string;
  calories: number;
  logged: boolean;
}

const mealSuggestions = {
  breakfast: [
    { id: 'b1', name: 'Oatmeal with berries and nuts', calories: 350, logged: false },
    { id: 'b2', name: 'Greek yogurt with honey and granola', calories: 280, logged: false },
    { id: 'b3', name: 'Whole grain toast with avocado', calories: 320, logged: false },
    { id: 'b4', name: 'Smoothie bowl with fruits', calories: 290, logged: false }
  ],
  lunch: [
    { id: 'l1', name: 'Quinoa salad with grilled chicken', calories: 450, logged: false },
    { id: 'l2', name: 'Brown rice with dal and vegetables', calories: 380, logged: false },
    { id: 'l3', name: 'Whole wheat wrap with hummus', calories: 420, logged: false },
    { id: 'l4', name: 'Vegetable stir-fry with tofu', calories: 360, logged: false }
  ],
  dinner: [
    { id: 'd1', name: 'Grilled fish with steamed veggies', calories: 400, logged: false },
    { id: 'd2', name: 'Chickpea curry with chapati', calories: 430, logged: false },
    { id: 'd3', name: 'Baked chicken with sweet potato', calories: 480, logged: false },
    { id: 'd4', name: 'Lentil soup with whole grain bread', calories: 350, logged: false }
  ],
  snacks: [
    { id: 's1', name: 'Apple slices with almond butter', calories: 180, logged: false },
    { id: 's2', name: 'Mixed nuts (handful)', calories: 160, logged: false },
    { id: 's3', name: 'Carrot sticks with hummus', calories: 120, logged: false },
    { id: 's4', name: 'Greek yogurt', calories: 150, logged: false }
  ]
};

const pcosNutritionTips = [
  {
    title: 'High Fiber Foods',
    description: 'Include whole grains, vegetables, and legumes',
    icon: '🌾'
  },
  {
    title: 'Lean Proteins',
    description: 'Fish, chicken, tofu, and legumes support hormonal balance',
    icon: '🥚'
  },
  {
    title: 'Healthy Fats',
    description: 'Nuts, avocados, and olive oil reduce inflammation',
    icon: '🥑'
  },
  {
    title: 'Limit Processed Foods',
    description: 'Reduce refined carbs and added sugars',
    icon: '🚫'
  }
];

export function DietTracker({ onBack }: DietTrackerProps) {
  const [meals, setMeals] = useState(mealSuggestions);

  const toggleMeal = (category: keyof typeof mealSuggestions, mealId: string) => {
    setMeals({
      ...meals,
      [category]: meals[category].map(meal =>
        meal.id === mealId ? { ...meal, logged: !meal.logged } : meal
      )
    });
  };

  const totalCalories = Object.values(meals)
    .flat()
    .filter(meal => meal.logged)
    .reduce((sum, meal) => sum + meal.calories, 0);

  const MealCategory = ({ 
    category, 
    title, 
    icon 
  }: { 
    category: keyof typeof mealSuggestions; 
    title: string; 
    icon: string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3>{title}</h3>
      </div>
      {meals[category].map(meal => (
        <Card
          key={meal.id}
          className={`p-4 rounded-xl cursor-pointer transition-all ${
            meal.logged
              ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300'
              : 'bg-white/80 border-purple-100 hover:bg-purple-50'
          }`}
          onClick={() => toggleMeal(category, meal.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="mb-1">{meal.name}</p>
              <p className="text-sm text-gray-600">{meal.calories} calories</p>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                meal.logged
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                  : 'bg-gray-200'
              }`}
            >
              {meal.logged && <Check className="w-4 h-4 text-white" />}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-white/50 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <h1 className="mb-2">Daily Diet Tracker</h1>
          <p className="text-gray-600">Plan and track your nutritious meals</p>
        </div>

        {/* Calorie Summary */}
        <Card className="mb-8 p-6 rounded-2xl border-purple-100 bg-gradient-to-r from-purple-100 via-pink-100 to-teal-100 shadow-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Today's Total</p>
            <p className="text-4xl mb-2">{totalCalories}</p>
            <p className="text-sm text-gray-600">calories logged</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Meal Tracker */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="breakfast" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/80 p-1 rounded-xl">
                <TabsTrigger value="breakfast" className="rounded-lg">🌅 Breakfast</TabsTrigger>
                <TabsTrigger value="lunch" className="rounded-lg">☀️ Lunch</TabsTrigger>
                <TabsTrigger value="dinner" className="rounded-lg">🌙 Dinner</TabsTrigger>
                <TabsTrigger value="snacks" className="rounded-lg">🍎 Snacks</TabsTrigger>
              </TabsList>

              <TabsContent value="breakfast">
                <MealCategory category="breakfast" title="Breakfast Ideas" icon="🌅" />
              </TabsContent>

              <TabsContent value="lunch">
                <MealCategory category="lunch" title="Lunch Options" icon="☀️" />
              </TabsContent>

              <TabsContent value="dinner">
                <MealCategory category="dinner" title="Dinner Suggestions" icon="🌙" />
              </TabsContent>

              <TabsContent value="snacks">
                <MealCategory category="snacks" title="Healthy Snacks" icon="🍎" />
              </TabsContent>
            </Tabs>
          </div>

          {/* PCOS Nutrition Tips */}
          <div className="space-y-4">
            <h3 className="mb-4">PCOS Nutrition Tips</h3>
            {pcosNutritionTips.map((tip, index) => (
              <Card key={index} className="p-4 rounded-xl border-purple-100 bg-white/80 backdrop-blur-sm">
                <div className="flex gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <h4 className="mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 rounded-xl border-purple-100 bg-gradient-to-br from-teal-50 to-cyan-50">
              <div className="text-center">
                <div className="text-3xl mb-3">💧</div>
                <h4 className="mb-2">Water Intake</h4>
                <p className="text-sm text-gray-600 mb-4">Track your daily hydration</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((glass) => (
                    <div
                      key={glass}
                      className={`w-8 h-8 rounded-full ${
                        glass <= 5 ? 'bg-blue-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-blue-600 mt-3">5/8 glasses</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
