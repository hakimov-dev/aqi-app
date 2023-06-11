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
        additionalText: 'The air quality is excellent, with little to no health risks. The air is clean and fresh, and it is safe for outdoor activities. People of all ages and health conditions can breathe comfortably.'
      },
      {
        advice: 'Moderate outdoor activities are okay.',
        additionalText: 'The air quality is generally acceptable, but there may be a moderate level of pollutants present. This may cause minor discomfort for sensitive individuals such as those with respiratory issues, children, and the elderly. Most people can continue with their regular activities without significant adverse effects.'
      },
      {
        advice: 'Sensitive groups should limit outdoor exposure.',
        additionalText: 'The air quality is unhealthy for sensitive groups, including children, older adults, and individuals with respiratory or heart conditions. They may experience symptoms such as coughing, throat irritation, and shortness of breath. The general population is less likely to be affected, but it is advisable to reduce prolonged or heavy outdoor exertion.'
      },
      {
        advice: 'Avoid outdoor activities.',
        additionalText: 'The air quality is unhealthy for everyone, and the general population may experience adverse health effects. People with respiratory or heart conditions may experience more severe symptoms such as difficulty breathing, wheezing, and reduced lung function. Outdoor activities should be limited, especially for sensitive individuals.'
      },
      {
        advice: 'Stay indoors and protect your health.',
        additionalText: 'The air quality is very unhealthy, posing a significant risk to health. The entire population may experience serious health effects. Individuals with respiratory or heart conditions, as well as children and older adults, are at a higher risk of severe symptoms. Outdoor activities should be avoided, and it is advisable to stay indoors with proper air filtration.'
      },
      {
        advice: 'Protect your health and avoid outdoor exposure.',
        additionalText: 'The air quality is hazardous, and it presents a severe health risk to the entire population. The pollution levels are extremely high, and everyone may experience severe respiratory issues, including difficulty breathing, coughing, and aggravated symptoms. It is crucial to stay indoors, keep windows closed, and use air purifiers or filtration systems.'
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
  