import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: Target,
      value: "99.2%",
      label: "Detection Accuracy",
      description: "Industry-leading precision across all defect types",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Clock,
      value: "47ms",
      label: "Average Inference Time",
      description: "Real-time processing for production environments",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: TrendingUp,
      value: "1,200+",
      label: "Images Per Minute",
      description: "High-throughput batch processing capability",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Zap,
      value: "3",
      label: "Defect Categories",
      description: "Scratches, dents, and misalignment detection",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Performance Metrics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Benchmarked performance metrics demonstrating the reliability and efficiency 
            of our defect detection system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass p-8 rounded-2xl text-center hover:bg-white/15 transition-all duration-300 relative overflow-hidden">
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${stat.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Value */}
                <motion.div
                  className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-500/30 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 glass p-8 rounded-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Model Performance Breakdown</h3>
            <p className="text-gray-300">Detailed accuracy metrics by defect type</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { type: "Scratches", accuracy: 99.5, color: "bg-red-500" },
              { type: "Dents", accuracy: 98.8, color: "bg-yellow-500" },
              { type: "Misalignment", accuracy: 99.3, color: "bg-blue-500" },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-white mb-1">{metric.accuracy}%</div>
                  <div className="text-gray-300 font-medium">{metric.type}</div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`${metric.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.accuracy}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;