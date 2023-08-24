import { fetcher } from "./axios"
import { apiConstants } from "constants/apiConstants"
import { Post } from "modules/post/postList";

const { POSTS } = apiConstants;

/**
 * Get posts list
 */
export const getPostList = async () => {
  const { data } = await fetcher.get(POSTS);
  return data;
}

/**
 * Get particular post details
 * @param id
 */
export const getPostById = async (id: string) => {
  const { data } = await fetcher.get(`${POSTS}/${id}`);
  return data;
}

/**
 * 
 * @param id 
 */
export const deletePost = async (id: string) => {
  const { data } = await fetcher.delete(`${POSTS}/${id}`);
  return data;
}

/**
 * Update changed data
 * @param id 
 * @param updatedData 
 */
export const updatePost = async (id: string, updatedData: Post) => {
  const { data } = await fetcher.patch(`${POSTS}/${id}`, updatedData);
  return data;
}