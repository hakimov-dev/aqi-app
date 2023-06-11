// Get quality and color functions
interface AirQualityData {
    quality: string;
    color: string;
  }
  
  function getAirQualityFromAQI(aqi: number) {
    const thresholds: AirQualityData[] = [
      { quality: 'Good', color: 'green' },
      { quality: 'Moderate', color: 'yellow' },
      { quality: 'Unhealthy for Sensitive Groups', color: 'orange' },
      { quality: 'Unhealthy', color: 'red' },
      { quality: 'Very Unhealthy', color: 'purple' },
      { quality: 'Hazardous', color: 'maroon' }
    ];
  
    for (const threshold of thresholds) {
      if (aqi <= getThresholdMaxAQI(threshold)) {
        return threshold;
      }
    }
  
    return { quality: 'Unknown', color: 'gray' };
  }
  
  function getThresholdMaxAQI(threshold: AirQualityData): number {
    switch (threshold.quality) {
      case 'Good':
        return 50;
      case 'Moderate':
        return 100;
      case 'Unhealthy for Sensitive Groups':
        return 150;
      case 'Unhealthy':
        return 200;
      case 'Very Unhealthy':
        return 300;
      case 'Hazardous':
        return Infinity;
      default:
        return 0;
    }
  }
  
  
  
  