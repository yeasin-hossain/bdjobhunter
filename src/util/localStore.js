/* eslint-disable import/prefer-default-export */
export const saveInStorage = (data) => {
  localStorage.setItem('jobHunter', JSON.stringify(data));
};
export const getFromStorage = () => JSON.parse(localStorage.getItem('jobHunter'));
