import http from "@/lib/http";
import { APIError } from "@/types/common";
import { AxiosError } from "axios";
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export const useSignUp = (
  props?: UseMutationOptions<any, AxiosError<APIError>, any, unknown>
): UseMutationResult<any, AxiosError<APIError>, any> => {
  const mutation = useMutation<any, AxiosError<APIError>, any>({
    ...props,
    mutationFn: async (payload) => {
      const response = await http.post("/v2/auth/signup", payload);
      return response.data;
    },
  });

  return mutation;
};

export const useSignIn = (
  props?: UseMutationOptions<any, AxiosError<APIError>, any, unknown>
): UseMutationResult<any, AxiosError<APIError>, any> => {
  const mutation = useMutation<any, AxiosError<APIError>, any>({
    ...props,
    mutationFn: async (payload) => {
      const response = await http.post("/v2/auth/login", payload);
      return response.data;
    },
  });

  return mutation;
};

export const useGoogleSignIn = (
  props?: UseMutationOptions<any, AxiosError<APIError>, null>
): UseMutationResult<any, AxiosError<APIError>, null> => {
  const mutation = useMutation<any, AxiosError<APIError>, null>({
    ...props,
    mutationFn: async () => {
      const response = await http.get("v2/auth/google");
      return response.data;
    },
  });

  return mutation;
};

export const useSpotifyAuthUrl = (
  props?: UseMutationOptions<any, AxiosError<APIError>, null>
): UseMutationResult<any, AxiosError<APIError>, null> => {
  const mutation = useMutation<any, AxiosError<APIError>, null>({
    ...props,
    mutationFn: async () => {
      const response = await http.get("v2/auth/spotify");
      return response.data;
    },
  });

  return mutation;
};
export const useConnectSpotify = (
  props?: UseMutationOptions<string, AxiosError<APIError>, string>
): UseMutationResult<string, AxiosError<APIError>, string> => {
  const mutation = useMutation<string, AxiosError<APIError>, string>({
    ...props,
    mutationFn: async (token) => {
      const response = await http.put("v2/auth/spotify/connect", {
        spotifyToken: token,
      });
      return response.data;
    },
  });

  return mutation;
};

export const useVerifyAccess = (
  queryOptions: UseQueryOptions<any, AxiosError<APIError>, any>
): UseQueryResult<any, AxiosError<APIError>> => {
  return useQuery({
    ...queryOptions,
    queryFn: async () => {
      const response = await http.get(`/v2/auth/verify-access`);
      return response.data;
    },
  });
};