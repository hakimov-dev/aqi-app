// Get quality and color functions
interface AirQualityData {
    quality: string;
    color: string;
  }
  
export function getAirQualityFromAQI(aqi: number) {
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
  
  // Get advice and about functions
  interface AirQualityAboutData {
    advice: string;
    additionalText: string;
  }
  
 export function getAirQualityAbout(aqi: number): AirQualityAboutData {
    const thresholds: AirQualityAboutData[] = [
      {
        advice: 'Enjoy the fresh air!',
        additionalText: 'The air quality is good. It is a great time to be outdoors.'
      },
      {
        advice: 'Moderate outdoor activities are okay.',
        additionalText: 'The air quality is moderate. If you are sensitive to air pollution, consider reducing prolonged or heavy outdoor activities.'
      },
      {
        advice: 'Sensitive groups should limit outdoor exposure.',
        additionalText: 'The air quality is unhealthy for sensitive groups. If you have respiratory issues or other health conditions, it is advisable to reduce outdoor exposure.'
      },
      {
        advice: 'Avoid outdoor activities.',
        additionalText: 'The air quality is unhealthy. It is recommended to avoid prolonged or heavy exertion outdoors, especially if you have health problems.'
      },
      {
        advice: 'Stay indoors and protect your health.',
        additionalText: 'The air quality is very unhealthy. It is crucial to remain indoors, minimize physical exertion, and keep windows and doors closed.'
      },
      {
        advice: 'Protect your health and avoid outdoor exposure.',
        additionalText: 'The air quality is hazardous. Everyone should avoid all outdoor activities and stay indoors to protect their health.'
      }
    ];
  
    for (const threshold of thresholds) {
      if (aqi <= getAboutThresholdMaxAQI(threshold)) {
        return threshold;
      }
    }
  
    return {
      advice: 'Unknown air quality',
      additionalText: 'We couldn\'t determine the advice for this AQI range. Please check again later.'
    };
  }
  
  function getAboutThresholdMaxAQI(threshold: AirQualityAboutData): number {
    switch (threshold.advice) {
      case 'Enjoy the fresh air!':
        return 50;
      case 'Moderate outdoor activities are okay.':
        return 100;
      case 'Sensitive groups should limit outdoor exposure.':
        return 150;
      case 'Avoid outdoor activities.':
        return 200;
      case 'Stay indoors and protect your health.':
        return 300;
      case 'Protect your health and avoid outdoor exposure.':
        return Infinity;
      default:
        return 0;
    }
  }
  