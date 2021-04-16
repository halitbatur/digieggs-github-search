export interface repoData {
  name: string;
  description: string;
  id: number;
}
export function addNewBookmark(payload: Record<string, repoData>) {
  return {
    type: "ADD_NEW_BOOK_MARK",
    payload,
  };
}

export function removeBookMark(payload: Record<string, repoData>) {
  return {
    type: "REMOVE_BOOK_MARK",
    payload,
  };
}
