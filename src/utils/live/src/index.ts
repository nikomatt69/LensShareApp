

import { createCors, error, Router, status } from 'itty-router';

import createStream from './handlers/createStream';
import buildRequest from './helpers/buildRequest';
import type { Env, WorkerRequest } from './types';
import response from './helpers/response';
import { Errors } from './helpers/errors';

const { preflight, corsify } = createCors({
  origins: ['*'],
  methods: ['HEAD', 'GET', 'POST']
});

const router = Router();

router
  .all('*', preflight)
  .head('*', () => status(200))
  .get('/', (request: WorkerRequest) =>
    response({
      message: 'gm, to live service 👋',
      version: request.env.RELEASE ?? 'unknown'
    })
  )
  .post('/create', createStream)
  .all('*', () => error(404));

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const incomingRequest = buildRequest(request, env, ctx);

    return await router
      .handle(incomingRequest)
      .then(corsify)
      .catch(() => {
        return error(500, Errors.SomethingWentWrong);
      });
  }
};
