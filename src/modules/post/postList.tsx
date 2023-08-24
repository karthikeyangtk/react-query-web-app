import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import {
  getPostList,
  getPostById,
  deletePost,
  updatePost,
} from "utils/postsApi";
import {
  DivButtonContainer,
  DivDetailContainer,
  DivDetailHeader,
  DivErrorMessage,
  DivLoadingIndicator,
  DivPostContainer,
  DivPostHeader,
  DivTableContainer,
} from "modules/post/postList.styles";

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

/**
 * Post list
 * @module JsonList
 */
const JsonList = () => {
  const [id, setId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [detail, setDetail] = useState<Post>({
    id: 1,
    userId: 1,
    title: "",
    body: "",
  });
  const [list, setList] = useState<Post[]>([]);
  const { isLoading, isError } = useQuery(["postList"], getPostList, {
    onSuccess: (data = []) => {
      setList(data);
    },
  });
  const { isLoading: detailLoading } = useQuery(
    ["getPostById", id],
    async () => await getPostById(id),
    {
      enabled: !!id /** API will call  */,
      onSuccess: (data: Post) => {
        setDetail({ ...detail, ...data });
      },
    }
  );
  const { isLoading: deleteLoading } = useQuery(
    ["deletePost", deleteId],
    async () => deletePost(deleteId),
    {
      enabled: !!deleteId,
      onSuccess: () => {
        const listData = list.filter((post) => post.id !== +deleteId);
        setList(listData);
        setDeleteId("");
      },
    }
  );

  const { mutate, isLoading: updateLoading } = useMutation(
    ["updatePost", id, detail],
    async () => await updatePost(id, detail),
    {
      onSuccess: () => {
        const updateDetail = [...list];
        const findIndex = list.findIndex((list) => list.id === +id);
        if (findIndex !== -1) {
          updateDetail[findIndex] = detail;
        }
        setList(updateDetail);
        setId("");
        clearDetail();
      },
    }
  );

  /**
   * Clear detail data
   */
  const clearDetail = () => {
    setDetail({
      id: 1,
      userId: 1,
      title: "",
      body: "",
    });
  };

  /**
   * Get loading
   */
  const getLoading = (text = "Loading...") => {
    return <DivLoadingIndicator>{text}</DivLoadingIndicator>;
  };

  /**
   * Get error data
   */
  const getError = () => {
    return <DivErrorMessage>Failed to fetch data.!</DivErrorMessage>;
  };

  /**
   * Display loaded data
   */
  const displayData = () => {
    return (
      <DivTableContainer>
        <table>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((post, index) => {
              return (
                <tr key={index}>
                  <td>{post.id}</td>
                  <td className="align-left">{post.title}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setId(`${post.id}`);
                      }}
                    >
                      View
                    </button>{" "}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setDeleteId(`${post.id}`);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DivTableContainer>
    );
  };

  return (
    <DivPostContainer>
      <DivPostHeader>
        <span>Fetching sample JSON data...</span>
      </DivPostHeader>
      {id && detailLoading && getLoading("Fetching details is in progress...")}
      {deleteId && deleteLoading && getLoading("Delete is in progress...")}
      {id && !detailLoading && Object.keys(detail)?.length > 0 && (
        <DivDetailContainer>
          <h3>User Details</h3>
          <DivDetailHeader>
            <span className="head-title">User Id:</span>
            <span className="detail-value">{detail?.id}</span>
          </DivDetailHeader>
          <DivDetailHeader>
            <span className="head-title">Title:</span>
            <textarea
              value={detail?.title || ""}
              className="detail-value"
              onChange={(e) => {
                setDetail({ ...detail, title: e.target.value || "" });
              }}
            />
          </DivDetailHeader>
          <DivDetailHeader>
            <span className="head-title">Detail:</span>
            <textarea
              value={detail?.body || ""}
              className="detail-value"
              onChange={(e) => {
                setDetail({ ...detail, body: e.target.value || "" });
              }}
            />
          </DivDetailHeader>
          <DivButtonContainer>
            <button
              disabled={updateLoading}
              onClick={(e) => {
                e.preventDefault();
                if (updateLoading) return;
                mutate();
              }}
            >
              Update
            </button>{" "}
            <button
              className="is-clear"
              disabled={updateLoading}
              onClick={(e) => {
                e.preventDefault();
                if (updateLoading) return;
                setId("");
                clearDetail();
              }}
            >
              Clear
            </button>
          </DivButtonContainer>
        </DivDetailContainer>
      )}
      {isLoading ? getLoading() : displayData()}
      {isError && getError()}
    </DivPostContainer>
  );
};

export default JsonList;
