import {post, get, put, del} from "./request.js"

export const getPagination = p => post("articles", p);

export const login = p => post("login",p);

export const logout = () => post("logout");

export const getPost = p => post("post", p);

export const getCategories = p => post("category", p);

export const getInterestTags = () => post("interestTag");

export const upLoadPost = p => post("post/save", p)

export const deletePost = p => del(p)

export const deleteArticle = p => del(p)

export const getPaginationArticlesByCategoryId = (url, p) => post(url, p);

export const getTotalPost = () => post("post/total");

export const getRecent = () => post("articles/latest");

export const getComments = p => get(p)

export const saveComments = p => post('comment/', p)

// export const uploadImg = p => uploadImg("upload", p);

export const saveMessage = p => put("message", p);

export const putArticle = p => put("articles", p);

export const updateArticle = p => put("articles/update", p)

export const getArticleInfoById = id => get("articles/info/" + id);

export const getArticleSegmentById = (id, page) => get("articles/" + id + "/" + page)

export const getHotArticles = () => post('articles/hot')

export const getArticleContentByArticleId = p => get(p)

export const getTotalInterestTag = () => get("interestTag");

export const getHotTag = () => get("tags/hot");

export const getAllTags = () => get("tags");

export const getArticlesNum = () => get("articles");

export const getCurrentUser = () => get("users/currentUser");

export const getCategoriesNum = () => get('category');

export const getArticleNumByCategoryId = p => get(p)

export const getAllCategories = () => get("category/all");

export const getMessages = () => get("message");

export const addViewCount = () => post("/viewCount")

export const getViewCount = () => get("/viewCount")

// export const apiGetArticle = () => get();

//album

export const getAllAlbum = () => get("/album")

export const getPaginationPhotoByAlbumId = (id, p) => post("photo/" + id, p)

export const getAllPhotoByAlbumId = (id) => get("photo/all/" + id)

export const verifyAlbumPassword = (param) => post('album/verify', param)