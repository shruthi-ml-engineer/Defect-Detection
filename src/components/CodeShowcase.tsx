import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Copy, Check, Download } from 'lucide-react';

const CodeShowcase = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const codeExamples = {
    training: `from ultralytics import YOLO
import matplotlib.pyplot as plt

# Initialize YOLOv8 model
model = YOLO("yolov8n.yaml")

# Train the model
results = model.train(
    data="data.yaml",
    epochs=50,
    imgsz=640,
    batch=16,
    name="defect_detection",
    patience=10,
    save_period=5
)

# Evaluate model performance
metrics = model.val()
print(f"mAP50: {metrics.box.map50:.3f}")
print(f"mAP50-95: {metrics.box.map:.3f}")`,

    inference: `from ultralytics import YOLO
import cv2
import numpy as np

# Load trained model
model = YOLO("runs/detect/defect_detection/weights/best.pt")

def detect_defects(image_path, conf_threshold=0.25):
    """
    Detect defects in an image
    
    Args:
        image_path: Path to input image
        conf_threshold: Confidence threshold for detections
    
    Returns:
        results: Detection results with bounding boxes
    """
    # Run inference
    results = model.predict(
        source=image_path,
        conf=conf_threshold,
        save=False,
        verbose=False
    )
    
    return results[0]

# Example usage
image_path = "test_image.jpg"
results = detect_defects(image_path)

# Process results
for box in results.boxes:
    cls = model.names[int(box.cls[0])]
    conf = float(box.conf[0])
    print(f"Detected {cls} with {conf:.2f} confidence")`,

    streamlit: `import streamlit as st
import numpy as np
from PIL import Image
from ultralytics import YOLO
import cv2

@st.cache_resource
def load_model():
    """Load and cache the YOLO model"""
    return YOLO("runs/detect/defect_detection/weights/best.pt")

def main():
    st.title("🔍 Defect Detection with YOLOv8")
    st.markdown("Upload an image to detect defects")
    
    # Load model
    model = load_model()
    
    # File uploader
    uploaded_file = st.file_uploader(
        "Choose an image...", 
        type=["jpg", "jpeg", "png"]
    )
    
    if uploaded_file is not None:
        # Convert to OpenCV format
        file_bytes = np.asarray(
            bytearray(uploaded_file.read()), 
            dtype=np.uint8
        )
        image = cv2.imdecode(file_bytes, 1)
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Display original image
        st.image(image_rgb, caption="Original Image", use_column_width=True)
        
        # Run detection
        with st.spinner("Analyzing image..."):
            results = model.predict(image_rgb, conf=0.25)
            result = results[0]
            
            # Display results
            if result.boxes:
                annotated = result.plot()
                st.image(annotated, caption="Detected Defects", use_column_width=True)
                
                # Show detection details
                st.subheader("Detection Results")
                for box in result.boxes:
                    cls = model.names[int(box.cls[0])]
                    conf = float(box.conf[0])
                    st.write(f"**{cls}** - Confidence: {conf:.2f}")
            else:
                st.success("No defects detected!")

if __name__ == "__main__":
    main()`,

    api: `from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import io

app = FastAPI(title="Defect Detection API", version="1.0.0")

# Load model at startup
model = YOLO("runs/detect/defect_detection/weights/best.pt")

@app.post("/detect")
async def detect_defects(
    file: UploadFile = File(...),
    confidence: float = 0.25
):
    """
    Detect defects in uploaded image
    
    Args:
        file: Uploaded image file
        confidence: Detection confidence threshold
    
    Returns:
        JSON response with detection results
    """
    try:
        # Read and process image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image")
        
        # Run inference
        results = model.predict(image, conf=confidence, verbose=False)
        result = results[0]
        
        # Format results
        detections = []
        if result.boxes:
            for box in result.boxes:
                detection = {
                    "class": model.names[int(box.cls[0])],
                    "confidence": float(box.conf[0]),
                    "bbox": box.xyxy[0].tolist()
                }
                detections.append(detection)
        
        return JSONResponse({
            "status": "success",
            "detections": detections,
            "count": len(detections)
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`
  };

  const copyToClipboard = async (code: string, key: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(key);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <section id="code" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Code Examples</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready-to-use code snippets to get you started with defect detection. 
            Copy, modify, and integrate into your projects
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-2xl"
        >
          <Tabs defaultValue="training" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-slate-800/50 p-1 rounded-lg">
              <TabsTrigger value="training" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
                Model Training
              </TabsTrigger>
              <TabsTrigger value="inference" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
                Inference
              </TabsTrigger>
              <TabsTrigger value="streamlit" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
                Streamlit App
              </TabsTrigger>
              <TabsTrigger value="api" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
                FastAPI
              </TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([key, code]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-400 text-sm ml-4">
                        {key === 'training' && 'model_training.py'}
                        {key === 'inference' && 'inference.py'}
                        {key === 'streamlit' && 'streamlit_app.py'}
                        {key === 'api' && 'api_server.py'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(code, key)}
                      >
                        {copiedCode === key ? (
                          <>
                            <Check className="h-4 w-4 text-green-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-lg text-sm transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm text-gray-300 leading-relaxed">
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Quick Start Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-slate-800/50 p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">🚀 Quick Start Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary-300 mb-2">1. Installation</h4>
                <div className="bg-slate-900 p-3 rounded-lg">
                  <code className="text-sm text-gray-300">
                    pip install ultralytics opencv-python matplotlib streamlit
                  </code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-primary-300 mb-2">2. Run Training</h4>
                <div className="bg-slate-900 p-3 rounded-lg">
                  <code className="text-sm text-gray-300">
                    python model_training.py
                  </code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-primary-300 mb-2">3. Start Streamlit App</h4>
                <div className="bg-slate-900 p-3 rounded-lg">
                  <code className="text-sm text-gray-300">
                    streamlit run streamlit_app.py
                  </code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-primary-300 mb-2">4. Launch API Server</h4>
                <div className="bg-slate-900 p-3 rounded-lg">
                  <code className="text-sm text-gray-300">
                    uvicorn api_server:app --reload
                  </code>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeShowcase;