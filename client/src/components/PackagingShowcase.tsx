import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCw, ZoomIn } from "lucide-react";

export default function PackagingShowcase() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleFlip = () => setIsFlipped(!isFlipped);
  const toggleZoom = () => setIsZoomed(!isZoomed);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <div className="relative perspective-1000 min-h-[600px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={isFlipped ? "back" : "front"}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`relative ${isZoomed ? "scale-125 z-50" : "scale-100"} transition-transform duration-500`}
          >
            <Card className="relative overflow-hidden shadow-2xl border-4 border-secondary/20 bg-transparent rounded-xl">
              <div className="relative group">
                <img
                  src={isFlipped ? "/images/back.png" : "/images/front.png"}
                  alt={isFlipped ? "Packaging Back View" : "Packaging Front View"}
                  className="w-full max-w-md h-auto object-contain rounded-lg"
                />
                
                {/* Interactive Hotspots Overlay */}
                {!isFlipped && (
                  <>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute top-[20%] left-[50%] -translate-x-1/2 w-8 h-8 bg-secondary/80 rounded-full cursor-pointer animate-pulse flex items-center justify-center text-primary-foreground font-bold text-xs"
                      title="Brand Logo"
                    >
                      MMC
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 }}
                      className="absolute bottom-[30%] left-[50%] -translate-x-1/2 w-24 h-24 border-2 border-dashed border-white/50 rounded-lg cursor-pointer flex items-center justify-center"
                      title="Transparent Window"
                    >
                      <span className="text-white/80 text-xs bg-black/30 px-2 py-1 rounded">See Product</span>
                    </motion.div>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-4">
          <Button 
            onClick={toggleFlip}
            variant="outline"
            className="bg-background/80 backdrop-blur-sm hover:bg-secondary hover:text-secondary-foreground border-secondary"
          >
            <RotateCw className="mr-2 h-4 w-4" />
            {isFlipped ? "View Front" : "View Back"}
          </Button>
          <Button 
            onClick={toggleZoom}
            variant="outline"
            className="bg-background/80 backdrop-blur-sm hover:bg-secondary hover:text-secondary-foreground border-secondary"
          >
            <ZoomIn className="mr-2 h-4 w-4" />
            {isZoomed ? "Zoom Out" : "Zoom In"}
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-card rounded-lg shadow-sm border border-border/50">
          <h3 className="font-serif font-bold text-lg text-primary mb-2">Dimensions</h3>
          <p className="text-muted-foreground">4" Width x 5.5" Height</p>
        </div>
        <div className="p-4 bg-card rounded-lg shadow-sm border border-border/50">
          <h3 className="font-serif font-bold text-lg text-primary mb-2">Material</h3>
          <p className="text-muted-foreground">Food-grade Plastic with Window</p>
        </div>
        <div className="p-4 bg-card rounded-lg shadow-sm border border-border/50">
          <h3 className="font-serif font-bold text-lg text-primary mb-2">Flavor Profile</h3>
          <p className="text-muted-foreground">Premium Coffee (Mandalay)</p>
        </div>
      </div>
    </div>
  );
}
