import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PackagingShowcase from "@/components/PackagingShowcase";
import MarketTrendsChart from "@/components/MarketTrendsChart";
import FlavorProfileRadar from "@/components/FlavorProfileRadar";
import { Download, Share2, ArrowRight, Coffee, MapPin } from "lucide-react";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute top-[20%] left-[10%] w-24 h-24 opacity-10 rotate-12">
            <Coffee className="w-full h-full text-primary" />
          </div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeIn} className="mb-6 inline-block">
            <span className="px-4 py-1.5 rounded-full border border-secondary text-secondary-foreground text-sm font-medium tracking-wider uppercase bg-secondary/10 backdrop-blur-sm">
              New Product Launch
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-primary leading-tight">
            Myint Myint Cho <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">
              Coffee Mooncake
            </span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            A fusion of Mandalay's rich heritage and modern coffee culture. 
            Experience the traditional Burmese "လမုန့်" reimagined.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
              Explore Design <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-primary/20 hover:bg-primary/5">
              View Specs
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Packaging Showcase Section */}
      <section className="py-24 bg-card/50 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Interactive Packaging Design</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the front and back of our new packaging. Click the hotspots to learn more about specific design elements.
            </p>
          </motion.div>

          <PackagingShowcase />
        </div>
      </section>

      {/* Design Details Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">The Essence of Mandalay</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Authentic Origin</h3>
                    <p className="text-muted-foreground">Proudly made in Mandalay, featuring the iconic MMC branding that locals trust and love.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Coffee className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Premium Ingredients</h3>
                    <p className="text-muted-foreground">Infused with rich, aromatic coffee to create a unique twist on the traditional mooncake filling.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent rounded-2xl transform rotate-3" />
              <img 
                src="/images/front.png" 
                alt="Packaging Detail" 
                className="relative rounded-2xl shadow-2xl border border-white/20 w-full max-w-md mx-auto transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Visualization Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Market & Flavor Analysis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding the trends and taste profile that drove this product innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border/50"
            >
              <MarketTrendsChart />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border/50"
            >
              <FlavorProfileRadar />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action / Footer */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-serif">Ready to Share?</h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Download the complete design package or share this interactive presentation with your stakeholders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 text-lg font-semibold shadow-lg">
              <Download className="mr-2 h-5 w-5" /> Download Assets
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-semibold bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Share2 className="mr-2 h-5 w-5" /> Share Presentation
            </Button>
          </div>

          <div className="mt-20 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
            <p>© 2024 Myint Myint Cho (MMC). All rights reserved.</p>
            <p>Designed with ❤️ in Mandalay</p>
          </div>
        </div>
      </section>
    </div>
  );
}
