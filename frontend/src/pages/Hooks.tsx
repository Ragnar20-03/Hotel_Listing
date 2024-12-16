import Cookies from "js-cookie";
export const useCookie = () => {
  const getCookie = (name: string): string | undefined => {
    return Cookies.get(name);
  };
  const removeCookie = (name: string): void => {
    Cookies.remove(name);
  };
  return { getCookie, removeCookie };
};
