import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Cpu, 
  Gauge, 
  Shield, 
  Layers, 
  BarChart3,
  Zap,
  Target,
  Settings
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Eye,
      title: "Advanced Computer Vision",
      description: "State-of-the-art YOLOv8 architecture for precise object detection and classification",
      color: "from-blue-500 to-cyan-500",
      stats: "99.2% accuracy"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Lightning-fast inference with optimized model architecture for production environments",
      color: "from-yellow-500 to-orange-500",
      stats: "< 50ms latency"
    },
    {
      icon: Target,
      title: "Multi-class Detection",
      description: "Simultaneously detects scratches, dents, and misalignments with high precision",
      color: "from-green-500 to-emerald-500",
      stats: "3 defect types"
    },
    {
      icon: Layers,
      title: "Scalable Architecture",
      description: "Modular design supporting batch processing and real-time streaming workflows",
      color: "from-purple-500 to-pink-500",
      stats: "1000+ images/min"
    },
    {
      icon: BarChart3,
      title: "Comprehensive Analytics",
      description: "Detailed metrics, confidence scores, and performance monitoring dashboards",
      color: "from-indigo-500 to-blue-500",
      stats: "Real-time metrics"
    },
    {
      icon: Settings,
      title: "Easy Integration",
      description: "RESTful API, Python SDK, and Streamlit interface for seamless deployment",
      color: "from-teal-500 to-green-500",
      stats: "Multiple interfaces"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Cutting-Edge Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built with modern AI/ML technologies to deliver unparalleled performance 
            in industrial quality control and defect detection
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass p-8 rounded-2xl h-full hover:bg-white/15 transition-all duration-300 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon with glow effect */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute top-0 left-0 w-16 h-16 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <span className="text-xs font-semibold text-primary-400 bg-primary-400/10 px-2 py-1 rounded-full">
                      {feature.stats}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-500/30 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 glass p-8 rounded-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "99.2%", label: "Detection Accuracy" },
              { value: "47ms", label: "Avg. Inference Time" },
              { value: "1,200+", label: "Images/Minute" },
              { value: "3", label: "Defect Categories" },
            ].map((metric, index) => (
              <div key={index} className="group">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  {metric.value}
                </div>
                <div className="text-gray-300 text-sm font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;