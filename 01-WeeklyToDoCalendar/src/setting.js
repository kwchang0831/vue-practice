const today = new Date();
const date = today.getDate();
const day = today.getDay();

export const settingData = {
  month: today.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
  week: Math.ceil((date - 1 - day) / 7),
};
