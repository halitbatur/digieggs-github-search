import { repoData } from "./action";

const bookmark = (state: repoData[] = [], action: any) => {
  switch (action.type) {
    case "REMOVE_BOOK_MARK":
      return [...state.filter((repo) => repo.id !== action.payload.id)];
    case "ADD_NEW_BOOK_MARK":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default bookmark;
