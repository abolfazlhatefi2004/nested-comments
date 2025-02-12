import { createContext, useContext, useState, ReactNode, useEffect } from "react";



export interface Comment {
  id: string,
  postId?: string | null,
  parentId?: string | null,
  content: Content,
  replies: Comment[],
}

export interface Content {
  username: string,
  text: string,
  imgUrl: string,
}

interface IDsType {
  postId: string;
  parentId: string;
}

interface CommentContextType {
  comments: Comment[];
  addPostAndComment: (content: Content, postId?: string, parentId?: string) => void;
  editComment: (id: string, newText: string) => void;
  deleteComment: (id: string) => void;
  resetComments: () => void;
  handleIDs: (type: 'postId' | 'parentId' | 'reset', id?: string) => void;
  IDs: IDsType
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

const initialIDs: IDsType = {
  postId: '',
  parentId: '',
}

const storedComments = JSON.parse(localStorage.getItem('comments') as string);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>(storedComments ||  []);
  const [IDs, setIDs] = useState<IDsType>(initialIDs);

  // storing comments
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments))
  }, [comments])


  const addPostAndComment = (content: Content, postId?: string, parentId?: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      postId: postId || null,
      parentId: parentId || null,
      content,
      replies: [],
    };

    setComments((prev) => {
      if (!postId) return [...prev, newComment];

      if (postId && !parentId) {
        return prev.map((comment) =>
          comment.id === postId
            ? { ...comment, replies: [...(comment.replies || []), newComment] }
            : comment
        );
      }

      const updateNestedComments = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {

          if (comment.id === parentId) {
            return { ...comment, replies: [...(comment.replies || []), newComment] };
          }
          return { ...comment, replies: updateNestedComments(comment.replies || []) };
        });
      };

      return updateNestedComments(prev);
    });
  };

  const editComment = (id: string, newText: string) => {

    const editNestedComment = (comments: Comment[]): Comment[] => {
      return comments.map((comment) =>
        comment.id === id ?
          { ...comment, content: { ...comment.content, text: newText } }
          : { ...comment, replies: editNestedComment(comment.replies || []) }
      )
    }

    setComments((prev) => editNestedComment(prev));
  };


  const deleteComment = (id: string) => {
    const removeComment = (comments: Comment[]): Comment[] => {
      return comments
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: removeComment(comment.replies || []),
        }));
    };

    setComments((prev) => removeComment(prev));
  };

  const resetComments = () => setComments([])

  const handleIDs = (type: 'postId' | 'parentId' | 'reset', id?: string) => {
    if(type !== 'reset' && !id) throw new Error("id didn't delared");
    setIDs(prev => {
      if (type === 'reset') return { ...initialIDs }
      return {
        ...prev,
        [type]: id
      }
    })
  }

  
  return (
    <CommentContext.Provider value={{ comments, addPostAndComment, editComment, deleteComment, resetComments, handleIDs, IDs }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error("useComments must be used within a CommentProvider");
  return context;
};