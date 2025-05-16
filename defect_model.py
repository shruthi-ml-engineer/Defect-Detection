from ultralytics import YOLO
import matplotlib.pyplot as plt
import cv2
import os
import streamlit as st
import numpy as np
from PIL import Image

# Train the model
def train_model():
    model = YOLO("yolov8n.yaml")  
    model.train(data="data.yaml", epochs=50, imgsz=640, batch=16, name="defect_detection")

#Evaluate the model
def evaluate_model():
    model = YOLO("runs/detect/defect_detection/weights/best.pt")
    metrics = model.val()
    print("Validation metrics:", metrics)

#Test on a sample image using matplotlib
def test_model(image_path):
    model = YOLO("runs/detect/defect_detection/weights/best.pt")
    results = model.predict(source=image_path, conf=0.25, save=False)
    result = results[0]

    # Display the image
    annotated = result.plot()
    plt.imshow(cv2.cvtColor(annotated, cv2.COLOR_BGR2RGB))
    plt.axis("off")
    plt.title("Detected Defects")
    plt.show()

#Streamlit interface for testing
def streamlit_inference():
    st.title("🔍 Defect Detection with YOLOv8")
    st.markdown("Upload an image to detect defects using your trained model.")

    uploaded_file = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])

    if uploaded_file:
        file_bytes = np.asarray(bytearray(uploaded_file.read()), dtype=np.uint8)
        image = cv2.imdecode(file_bytes, 1)
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        st.image(image_rgb, caption="Uploaded Image", use_column_width=True)

        st.subheader("🔎 Detecting Defects...")
        model = YOLO("runs/detect/defect_detection/weights/best.pt")
        results = model.predict(image_rgb, conf=0.25)
        result = results[0]
        annotated_image = result.plot()

        st.image(annotated_image, caption="Detected Defects", use_column_width=True)

        st.subheader("📋 Detections")
        if result.boxes:
            for box in result.boxes:
                cls = model.names[int(box.cls[0])]
                conf = float(box.conf[0])
                st.markdown(f"**{cls}** - Confidence: {conf:.2f}")
        else:
            st.write("No defects detected.")

# to run:
# train_model()
# evaluate_model()
# test_model("path/to/test_image.jpg")
# To run streamlit: `streamlit run this_script.py`
# streamlit_inference()
