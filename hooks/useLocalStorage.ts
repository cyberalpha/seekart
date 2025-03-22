export function useLocalStorage() {
  const setItem = async (key: string, value: any) => {
    try {
      await localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const getItem = async (key: string) => {
    try {
      const item = await localStorage.getItem(key);
      return item;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  };

  const removeItem = async (key: string) => {
    try {
      await localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  };

  return { setItem, getItem, removeItem };
}