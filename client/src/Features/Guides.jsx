import { TabsContent } from '../components/ui/tabs'
import { Card, CardContent } from '../components/ui/card'

const Guides = () => {
  return (
    <div>
      <TabsContent value="guides">
        <Card className="bg-white/20 backdrop-blur-lg border-none">
          <CardContent className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-green-800 mb-4">Farming Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/30 rounded-lg">
                <h3 className="text-lg md:text-xl font-medium text-green-800 mb-2">Seasonal Planning</h3>
                <p className="text-sm md:text-base text-green-700">
                  Learn about optimal planting times and crop rotation strategies.
                </p>
              </div>
              <div className="p-4 bg-white/30 rounded-lg">
                <h3 className="text-lg md:text-xl font-medium text-green-800 mb-2">Water Management</h3>
                <p className="text-sm md:text-base text-green-700">
                  Tips for efficient irrigation and water conservation methods.
                </p>
              </div>
              <div className="p-4 bg-white/30 rounded-lg">
                <h3 className="text-lg md:text-xl font-medium text-green-800 mb-2">Soil Health</h3>
                <p className="text-sm md:text-base text-green-700">
                  Understand soil composition, testing methods, and organic fertilization techniques.
                </p>
              </div>
              <div className="p-4 bg-white/30 rounded-lg">
                <h3 className="text-lg md:text-xl font-medium text-green-800 mb-2">Pest Management</h3>
                <p className="text-sm md:text-base text-green-700">
                  Learn about integrated pest control methods and safe pesticide usage.
                </p>
              </div>
              <div className="p-4 bg-white/30 rounded-lg">
                <h3 className="text-lg md:text-xl font-medium text-green-800 mb-2">Crop Selection</h3>
                <p className="text-sm md:text-base text-green-700">
                  Find suitable crops based on your local climate and soil type.
                </p>
              </div>
              <div className="p-4 bg-white/30 rounded-lg">
                <h3 className="text-lg md:text-xl font-medium text-green-800 mb-2">Post-Harvest Handling</h3>
                <p className="text-sm md:text-base text-green-700">
                  Tips for storage, packaging, and transportation to maintain crop quality.
                </p>
              </div>
              <div className="p-4 bg-white/30 rounded-lg">
                <h3 className="text-lg md:text-xl font-medium text-green-800 mb-2">Organic Farming</h3>
                <p className="text-sm md:text-base text-green-700">
                  Techniques for sustainable and chemical-free farming practices.
                </p>
              </div>
              <div className="p-4 bg-white/30 rounded-lg">
                <h3 className="text-lg md:text-xl font-medium text-green-800 mb-2">Weather Adaptation</h3>
                <p className="text-sm md:text-base text-green-700">
                  Strategies for adapting to unpredictable weather patterns and climate changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  )
}

export default Guides
