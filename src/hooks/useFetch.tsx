import { useEffect, useRef, useReducer, MutableRefObject } from "react";
import { DataResults } from "../container/searchResults/SearchResults";

export const useFetch = (url: string, name: string) => {
  const cache: MutableRefObject<Record<string, DataResults>> = useRef({});
  const statusKey = name + "Status";
  const dataKey = name + "Data";
  const errorKey = name + "Error";

  const initialState: Record<
    string,
    string | boolean | null | DataResults | undefined
  > = {
    [statusKey]: "idle",
    [errorKey]: null,
  };

  interface Action {
    type: string;
    payload?: DataResults;
  }

  const [state, dispatch] = useReducer((state: any, action: Action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, [statusKey]: "fetching" };
      case "FETCHED":
        return {
          ...initialState,
          [statusKey]: "fetched",
          [dataKey]: action.payload,
        };
      case "FETCH_ERROR":
        return {
          ...initialState,
          [statusKey]: "error",
          [errorKey]: action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "FETCHING" });
      console.log();
      if (JSON.parse(localStorage.getItem("data") || "{}")[url]) {
        const data = JSON.parse(localStorage.getItem("data") || "{}")[url];
        dispatch({ type: "FETCHED", payload: data });
      } else {
        try {
          const response = await fetch(url);
          const data = await response.json();
          cache.current[url] = data;
          if (!localStorage.getItem("data")) {
            localStorage.setItem("data", JSON.stringify(cache.current));
          } else {
            const storage = JSON.parse(localStorage.getItem("data") || "{}");
            storage[url] = cache.current[url];
            localStorage.setItem("data", JSON.stringify(storage));
          }
          if (cancelRequest) return;
          dispatch({ type: "FETCHED", payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};
