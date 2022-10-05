import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { CorsOptionsDelegate, oakCors } from 'https://deno.land/x/cors/mod.ts';
import data from './data.json' assert { type: 'json' };

const whitelist = ['https://kwchang0831-vue-ex02.surge.sh/', 'http://localhost:5173'];

const corsOptionsDelegate: CorsOptionsDelegate<Request> = async (request) => {
  const isOriginAllowed = whitelist.includes(request.headers.get('origin') ?? '');

  return { origin: isOriginAllowed };
};
const app = new Application();

const router = new Router();
router.get('/api/products', oakCors(corsOptionsDelegate), (c) => {
  c.response.body = data;
});

router.post('/api/checkout', oakCors(corsOptionsDelegate), async (c) => {
  // c.request.body({ type: 'json' }).value.then((text) => {
  //   console.log(text);
  // });

  // Send Email, send order to somewhere to process

  c.response.status = 200;
});

app.use(
  oakCors({
    origin: whitelist,
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
console.log('? Deno start !');
