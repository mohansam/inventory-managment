const PREFIX = 'v1:post:';
const generateID = (key) => {
    return `${PREFIX}${key}`;
};
export const getPosts = async (KV) => {
    const list = await KV.list({ prefix: PREFIX });
    const keys = list.keys;
    const posts = [];
    const len = keys.length;
    for (let i = 0; i < len; i++) {
        const value = await KV.get(keys[i].name);
        if (value) {
            const post = JSON.parse(value);
            posts.push(post);
        }
    }
    return posts;
};
export const getPost = async (KV, id) => {
    const value = await KV.get(generateID(id));
    if (!value)
        return;
    const post = JSON.parse(value);
    return post;
};
export const createPost = async (KV, param) => {
    if (!(param && param.title && param.body))
        return;
    const id = crypto.randomUUID();
    const newPost = { id: id, title: param.title, body: param.body };
    await KV.put(generateID(id), JSON.stringify(newPost));
    return newPost;
};
export const updatePost = async (KV, id, param) => {
    if (!(param && param.title && param.body))
        return false;
    const post = await getPost(KV, id);
    if (!post)
        return false;
    post.title = param.title;
    post.body = param.body;
    await KV.put(generateID(id), JSON.stringify(post));
    return true;
};
export const deletePost = async (KV, id) => {
    const post = await getPost(KV, id);
    if (!post)
        return false;
    await KV.delete(generateID(id));
    return true;
};
