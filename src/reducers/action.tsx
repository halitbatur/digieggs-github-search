const bookmark = (state = [], action: Record<string, string>) => {
  switch (action.type) {
    case "REMOVE_BOOK_MARK":
      return [...state, action.payload];
    case "ADD_NEW_BOOK_MARK":
      return [...state, , action.payload];
    default:
      return state;
  }
};

export default bookmark;
