import { Hono } from 'hono';
import * as model from '../model/productModel';
import { cors } from 'hono/cors';
const products = new Hono();

products.use('/*', cors());

products.get('/', (context) =>(context.json({ message: 'this is product end point', ok: true })))

products.get('/getAllProducts', async (c) => {
    const posts = await model.getPosts(c.env.BLOG_EXAMPLE);
    return c.json({ posts: posts, ok: true });
});
products.post('/createNewProduct', async (c) => {
    const param = await c.req.json();
    const newPost = await model.createPost(c.env.BLOG_EXAMPLE, param);
    if (!newPost) {
        return c.json({ error: 'Can not create new post', ok: false }, 422);
    }
    return c.json({ post: newPost, ok: true }, 201);
});
products.get('/updateProductsById/:id', async (c) => {
    const id = c.req.param('id');
    const post = await model.getPost(c.env.BLOG_EXAMPLE, id);
    if (!post) {
        return c.json({ error: 'Not Found', ok: false }, 404);
    }
    return c.json({ post: post, ok: true });
});
// products.put('/posts/:id', async (c) => {
//     const id = c.req.param('id');
//     const post = await model.getPost(c.env.BLOG_EXAMPLE, id);
//     if (!post) {
//         // 204 No Content
//         return new Response(null, { status: 204 });
//     }
//     const param = await c.req.json();
//     const success = await model.updatePost(c.env.BLOG_EXAMPLE, id, param);
//     return c.json({ ok: success });
// });
// products.delete('/posts/:id', async (c) => {
//     const id = c.req.param('id');
//     const post = await model.getPost(c.env.BLOG_EXAMPLE, id);
//     if (!post) {
//         // 204 No Content
//         return new Response(null, { status: 204 });
//     }
//     const success = await model.deletePost(c.env.BLOG_EXAMPLE, id);
//     return c.json({ ok: success });
// });
export { products };
