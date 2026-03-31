//Area of interest
var cor = [
  [48.42331357710716,31.94100799817005],
  [48.75839658491966,31.94100799817005],
  [48.75839658491966,32.18773294099697],
  [48.42331357710716,32.18773294099697],
  [48.42331357710716,31.94100799817005]
  ]

var geometry = ee.Geometry.Polygon(cor)

Map.centerObject(geometry)

var time_start = '2025', time_end = '2026'

// Load & Filter Sentinel-1 SAR Data

var sen1 = ee.ImageCollection("COPERNICUS/S1_GRD")
.filterDate(time_start, time_end)
.filterBounds(geometry) //clip to aoi
.filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV')) //VV POrlarization
.filter(ee.Filter.eq('instrumentMode','IW'))  // Interferometric Wide swath mode
.select('VV');

print(sen1)

// Separate Ascending & Descending Orbits

var asc = sen1
.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING'));

print(asc)

var des = sen1
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));

print(des)

// Build Monthly Composites 

var sen1_monthly = ee.ImageCollection(ee.List.sequence(1,12).map(function(month){
  var asc_month = asc.filter(ee.Filter.calendarRange(month, month, 'month')).mean().rename('asc')
  var des_month = des.filter(ee.Filter.calendarRange(month, month, 'month')).mean().rename('des')
  var date = ee.Date.fromYMD(2025, month, 1)
  return asc_month.addBands(des_month) // 2-band image per month
  .set('system:time_start', date.millis())
  .set('system:index', date.format('YYYY-MM'))
  }))
  
print(sen1_monthly)


// Remove speckel effects

var speckel = sen1_monthly.map(function(img){
  return img.focalMean(30, 'square', 'meters')
  .copyProperties(img, img.propertyNames())
  })

  
Map.addLayer(speckel.select('asc').toBands().clip(geometry), [], 'asc', false);
Map.addLayer(speckel.select('des').toBands().clip(geometry),[], 'des', false);


// Create time series backscatter chart

var cor2 = [48.53237427758136,32.07685060176268]

var geometry2 = ee.Geometry.Point(cor2) 

print(
  ui.Chart.image.series(sen1_monthly, geometry2, ee.Reducer.first(), 10, 'system:time_start')
  )
  

// Export Tiff file to drive

Export.image.toDrive({
  image: speckel.select('asc').toBands().clip(geometry), 
  description: 'sar_asc', 
  scale: 30, 
  region: geometry, 
  maxPixels: 1e13, 
  crs: 'EPSG:4326', 
  folder: 'test'
  })
  