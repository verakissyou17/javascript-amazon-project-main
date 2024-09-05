
 export function isWeekend (date) {
    if(date === 'Saturday' || date === 'Sunday') {
      return `${date} is a weekend day.`;
    } else {
      return `${date} is NOT a weekend day.`;
    }
  };

