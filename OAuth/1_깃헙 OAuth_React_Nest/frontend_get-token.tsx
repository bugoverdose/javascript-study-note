import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";
import {
  GetGithubTokenMutation,
  GetGithubTokenMutationVariables,
} from "../generated_api_types/GetGithubTokenMutation";
import { commonRoute } from "../routes/common-routes";

export const GET_GITHUB_TOKEN_MUTATION = gql`
  mutation GetGithubTokenMutation($getGithubTokenInput: GetGithubTokenInput!) {
    getGithubToken(input: $getGithubTokenInput) {
      ok
      error
    }
  }
`;

export const GetGithubToken = () => {
  const history = useHistory();
  const location = useLocation();
  const code = location.search.split("?code=")[1];

  console.log(code);

  const onMutationCompleted = (data: GetGithubTokenMutation) => {
    const {
      getGithubToken: { ok },
    } = data;
    if (ok) {
      alert("인증 성공!");
      history.push(commonRoute.home);
    }
  };

  const [getGithubTokenMutation, { loading: loadingMutation }] = useMutation<
    GetGithubTokenMutation,
    GetGithubTokenMutationVariables
  >(GET_GITHUB_TOKEN_MUTATION, { onCompleted: onMutationCompleted });

  const sendMutation = () => {
    if (!loadingMutation) {
      getGithubTokenMutation({
        variables: {
          getGithubTokenInput: { code },
        },
      });
    }
  };

  useEffect(sendMutation, []);

  return (
    <main className="w-full h-screen bg-white">
      <Helmet>
        <title>Loading | havom</title>
      </Helmet>
      <div className="w-full h-full flex items-center justify-center font-bold text-3xl">
        Loading...
      </div>
    </main>
  );
};
