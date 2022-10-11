import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { create } from 'https://deno.land/x/djwt/mod.ts';
import users from './users.json' assert { type: 'json' };
import { key } from './utils/apikey.ts';

const app = new Application();

const router = new Router();
router.post('/api/login', async ({ request, response }) => {
  const body = request.body({ type: 'json' });
  const { username, password } = await body.value;

  if (!!username && !!password) {
    const user = users.find((user) => {
      return user.username === username && user.password === password;
    });
    if (user) {
      const payload = {
        id: user.id,
        username: user.username,
      };
      const jwt = await create({ alg: 'HS512', typ: 'JWT' }, payload, key);
      response.body = {
        id: user.id,
        username: user.username,
        token: jwt,
      };
      response.status = 200;
      return;
    } else {
      response.status = 403;
      return;
    }
  }
  response.status = 401;
});

const errorHandler = (evt) => {
  console.log(evt.error);
};

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.addEventListener('error', errorHandler);

console.log('Server Listening @ 8080');
await app.listen({ port: 8080 });
