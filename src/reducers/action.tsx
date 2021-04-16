export interface repoData {
  name: string;
  description: string;
  id: number;
}
export function addNewBookmark(payload: repoData) {
  return {
    type: "ADD_NEW_BOOK_MARK",
    payload,
  };
}

export function removeBookMark(payload: repoData) {
  return {
    type: "REMOVE_BOOK_MARK",
    payload,
  };
}
