import express from 'express';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignInController } from '../factories/makeSignInController';
import { routerAdapter } from './adapters/routeAdapter';
import { makeListLeadsController } from '../factories/makeListLeadsController';
import { middlewareAdapter } from './adapters/middlewareAdapter';

const app = express();

app.use(express.json());

app.post('/sign-up', routerAdapter(makeSignUpController()));
app.post('/sign-in', routerAdapter(makeSignInController()));

app.get('/leads',
  middlewareAdapter(makeAuthenticationMiddleware());
  routerAdapter(makeListLeadsController()));

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001 ');
});
