import React from "react";
import SearchResultsContent from "../../components/searchResultsContent/SearchResultsContent";
import { connect } from "react-redux";
import {
  addNewBookmark,
  removeBookMark,
  repoData,
} from "../../reducers/action";

interface BookmarksProps {
  bookmarks: any;
}

const Bookmarks: React.FC<BookmarksProps> = ({ bookmarks }) => {
  return (
    <div style={{ display: "flex" }}>
      <SearchResultsContent type="Bookmarks" userPageRepos={bookmarks} />
    </div>
  );
};

const mapStateToProps = (state: repoData[]) => {
  return {
    bookmarks: state,
  };
};

export default connect(mapStateToProps)(Bookmarks);
