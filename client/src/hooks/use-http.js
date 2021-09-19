import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const clearError = useCallback(() => {
    setIsError(null);
  }, []);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data);
        }
        setIsLoading(false);
        return data;
      } catch (error) {
        setIsLoading(false);
        setIsError(error.message);
        throw new Error(error);
      }
    },
    []
  );

  return {
    isLoading,
    isError,
    sendRequest,
    clearError,
  };
};

export default useHttp;
