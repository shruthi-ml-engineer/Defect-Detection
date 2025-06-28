import React from 'react';
import { motion } from 'framer-motion';

const TechStack = () => {
  const technologies = [
    {
      category: "AI/ML Framework",
      items: [
        { name: "YOLOv8", description: "State-of-the-art object detection", logo: "🎯" },
        { name: "Ultralytics", description: "Computer vision platform", logo: "🚀" },
        { name: "PyTorch", description: "Deep learning framework", logo: "🔥" },
      ]
    },
    {
      category: "Computer Vision",
      items: [
        { name: "OpenCV", description: "Image processing library", logo: "👁️" },
        { name: "PIL/Pillow", description: "Python imaging library", logo: "🖼️" },
        { name: "NumPy", description: "Numerical computing", logo: "🔢" },
      ]
    },
    {
      category: "Web Interface",
      items: [
        { name: "Streamlit", description: "Interactive web apps", logo: "⚡" },
        { name: "Matplotlib", description: "Data visualization", logo: "📊" },
        { name: "FastAPI", description: "Modern web framework", logo: "🌐" },
      ]
    },
    {
      category: "Development",
      items: [
        { name: "Python", description: "Core programming language", logo: "🐍" },
        { name: "Docker", description: "Containerization", logo: "🐳" },
        { name: "Git", description: "Version control", logo: "📝" },
      ]
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
    <section id="tech" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Technology Stack</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built with cutting-edge technologies and frameworks to ensure optimal performance, 
            scalability, and maintainability
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{category.category}</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-4">
                {category.items.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    className="glass p-4 rounded-xl hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {tech.logo}
                      </span>
                      <h4 className="font-semibold text-white group-hover:text-primary-300 transition-colors duration-300">
                        {tech.name}
                      </h4>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {tech.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">System Architecture</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              End-to-end pipeline from data ingestion to real-time inference and visualization
            </p>
          </div>

          <div className="glass p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              {[
                { step: "1", title: "Data Input", desc: "Image Upload/Stream", icon: "📤" },
                { step: "2", title: "Preprocessing", desc: "Resize & Normalize", icon: "⚙️" },
                { step: "3", title: "YOLOv8 Model", desc: "Defect Detection", icon: "🧠" },
                { step: "4", title: "Post-processing", desc: "NMS & Filtering", icon: "🔍" },
                { step: "5", title: "Results", desc: "Visualization & Export", icon: "📊" },
              ].map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    className="flex flex-col items-center text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <div className="bg-primary-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center mb-2">
                      {step.step}
                    </div>
                    <h4 className="font-semibold text-white mb-1 group-hover:text-primary-300 transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-gray-300 text-sm">{step.desc}</p>
                  </motion.div>
                  
                  {index < 4 && (
                    <div className="hidden md:block">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;