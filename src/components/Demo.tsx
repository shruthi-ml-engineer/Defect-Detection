import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  Image as ImageIcon, 
  Play, 
  CheckCircle, 
  AlertTriangle,
  Download
} from 'lucide-react';

const Demo = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  // Sample images for demo
  const exampleImages = [
    {
      id: 'scratch',
      url: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Metal Surface with Scratches',
      defects: ['scratch']
    },
    {
      id: 'dent',
      url: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Car Body with Dent',
      defects: ['dent']
    },
    {
      id: 'misalignment',
      url: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Assembly Misalignment',
      defects: ['misalignment']
    }
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setResults(null);
        setSelectedExample(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false
  });

  const processImage = async () => {
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock results based on selected example or random for uploaded images
    const mockResults = {
      detections: selectedExample 
        ? exampleImages.find(img => img.id === selectedExample)?.defects.map(defect => ({
            type: defect,
            confidence: 0.85 + Math.random() * 0.14,
            bbox: [Math.random() * 200, Math.random() * 200, 100 + Math.random() * 100, 100 + Math.random() * 100]
          })) || []
        : [
            { type: 'scratch', confidence: 0.92, bbox: [120, 80, 150, 120] },
            { type: 'dent', confidence: 0.87, bbox: [200, 150, 100, 80] }
          ],
      processingTime: 47 + Math.random() * 20,
      imageSize: '640x480'
    };
    
    setResults(mockResults);
    setIsProcessing(false);
  };

  const selectExample = (imageId: string, imageUrl: string) => {
    setSelectedExample(imageId);
    setUploadedImage(imageUrl);
    setResults(null);
  };

  const currentImage = uploadedImage;

  return (
    <section id="demo" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Interactive Demo</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of AI-driven defect detection. Upload your own image or try our sample images
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Upload Image</h3>
            
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`glass p-8 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
                isDragActive 
                  ? 'border-primary-400 bg-primary-400/10' 
                  : 'border-gray-600 hover:border-primary-500'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white font-semibold mb-2">
                  {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
                </p>
                <p className="text-gray-400 text-sm">
                  or click to select from your device
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Supports: JPG, PNG, WebP (max 10MB)
                </p>
              </div>
            </div>

            {/* Example Images */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Or try these examples:</h4>
              <div className="grid grid-cols-3 gap-4">
                {exampleImages.map((example) => (
                  <motion.div
                    key={example.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedExample === example.id 
                        ? 'border-primary-400 ring-2 ring-primary-400/50' 
                        : 'border-transparent hover:border-primary-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectExample(example.id, example.url)}
                  >
                    <img 
                      src={example.url} 
                      alt={example.title}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium truncate">
                        {example.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Detection Results</h3>
            
            <div className="glass p-6 rounded-2xl">
              {currentImage ? (
                <div className="space-y-6">
                  {/* Image Preview */}
                  <div className="relative">
                    <img 
                      src={currentImage} 
                      alt="Analysis target"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    {results && (
                      <div className="absolute inset-0 rounded-lg">
                        {/* Mock bounding boxes */}
                        {results.detections.map((detection: any, index: number) => (
                          <div
                            key={index}
                            className="absolute border-2 border-red-400 bg-red-400/20"
                            style={{
                              left: `${(detection.bbox[0] / 640) * 100}%`,
                              top: `${(detection.bbox[1] / 480) * 100}%`,
                              width: `${(detection.bbox[2] / 640) * 100}%`,
                              height: `${(detection.bbox[3] / 480) * 100}%`,
                            }}
                          >
                            <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                              {detection.type} ({(detection.confidence * 100).toFixed(1)}%)
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Process Button */}
                  {!results && (
                    <motion.button
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={processImage}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5" />
                          <span>Analyze Image</span>
                        </>
                      )}
                    </motion.button>
                  )}

                  {/* Results Display */}
                  <AnimatePresence>
                    {results && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        {/* Detection Summary */}
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-white">Detection Summary</h4>
                            <div className="flex items-center space-x-2 text-green-400">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">Complete</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Processing Time:</span>
                              <span className="text-white ml-2">{results.processingTime.toFixed(0)}ms</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Detections:</span>
                              <span className="text-white ml-2">{results.detections.length}</span>
                            </div>
                          </div>
                        </div>

                        {/* Individual Detections */}
                        <div className="space-y-2">
                          {results.detections.map((detection: any, index: number) => (
                            <div key={index} className="bg-slate-800/50 p-3 rounded-lg flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                                <div>
                                  <span className="text-white font-medium capitalize">{detection.type}</span>
                                  <div className="text-xs text-gray-400">
                                    Confidence: {(detection.confidence * 100).toFixed(1)}%
                                  </div>
                                </div>
                              </div>
                              <div className="w-16 bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full"
                                  style={{ width: `${detection.confidence * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button
                            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                            onClick={() => {
                              setResults(null);
                              setUploadedImage(null);
                              setSelectedExample(null);
                            }}
                          >
                            Reset
                          </button>
                          <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-colors duration-200">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ImageIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Upload an image or select an example to get started</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Demo;