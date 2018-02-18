import React from "react";
import { Route } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import SplitPage from "../SplitPage";
import UnSupportedRequestMethod from "./UnSupportedRequestMethod";

export default ({ match }) => {
  return (
    <SplitPage>
      <ContentHeader>Errors</ContentHeader>
      <Route
        path={`${match.url}/:errorId`}
        component={UnSupportedRequestMethod}
      />
    </SplitPage>
  );
};
