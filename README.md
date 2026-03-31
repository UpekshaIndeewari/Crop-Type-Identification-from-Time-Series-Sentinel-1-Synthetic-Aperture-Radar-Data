# Crop Type Identification from Time Series Sentinel-1 Synthetic Aperture Radar Data

## 1. Project Overview

This report presents the complete design, implementation, and scientific rationale of a multi
temporal Sentinel-1 Synthetic Aperture Radar (SAR) time-series monitoring pipeline developed 
using the Google Earth Engine (GEE) cloud computing platform for crop type detection.

## 2. Project Objectives 
- Construct an automated, cloud-based pipeline that retrieves, filters, and processes all available Sentinel-1 GRD scenes over the defined AOI.
- Separate data by satellite orbit direction (ascending and descending) to maintain geometric consistency within each composite.
- Generate monthly mean backscatter composites that reduce speckle noise and represent the average surface scattering state for each calendar month.
- Apply spatial speckle filtering to further suppress residual noise before visualization and export.
- Produce a pixel-level time-series chart at a representative point within the AOI for qualitative validation of seasonal backscatter dynamics.
- Export the ascending orbit monthly composite stack to Google Drive as a multi-band GeoTIFF ready for downstream analysis. 

## 3. Tools & Technologies

![Google Earth Engine](https://img.shields.io/badge/Google_Earth_Engine-34A853?style=for-the-badge&logo=googleearth&logoColor=white)
![SAR](https://img.shields.io/badge/SAR-Synthetic_Aperture_Radar-1E90FF?style=for-the-badge)
![Google Earth JS API](https://img.shields.io/badge/Google_Earth_JS_API-4285F4?style=for-the-badge&logo=googleearth&logoColor=white)

## 4. Methodology

Folloiwng shows the work flow of the project
<p align="center">
  <img src="https://github.com/UpekshaIndeewari/Crop-Type-Identification-from-Time-Series-Sentinel-1-Synthetic-Aperture-Radar-Data/blob/main/Workflow.png" alt="GeoNLP Workflow" width="700">
</p>

Pipeline steps:

- AOI definition
- Sentinel-1 filtering (VV, IW, GRD)
- Orbit separation
- Monthly compositing
- Speckle filtering (focal mean)
- Visualization (time series chart)
- Export to GeoTIFF

### Dataset
- Sentinel-1 GRD (COPERNICUS/S1_GRD)
- VV polarization
- Year: 2025
- Resolution: 30 m

## 5. How to Use

Google Earth Engine Setup
1. Create account: https://earthengine.google.com
2. Open Code Editor
3. Paste script from /gee/sentinel1_pipeline.js

Export Data
1. Run script
2. Check Google Drive for exported GeoTIFF

## 6. Limitations
- Linear averaging
- Monthly temporal aggregation
- Single polarization (VV only)

## 7.Future Work
- Add VH polarization
- Apply refined speckle filtering
- Use machine learning for classification
- Sub-monthly compositing

## 8. LICENSE
Use a standard license such as:
MIT License (recommended for research projects)
