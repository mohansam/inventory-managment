import { Hono } from 'hono';
import {products} from './controller/productController'

const router = new Hono();

router.route('/products', products);


export { router };
