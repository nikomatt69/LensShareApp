import type { Env, WorkerRequest } from '../types';

const buildRequest = (request: Request, env: Env): WorkerRequest => {
  const temp: WorkerRequest = request as WorkerRequest;
  temp.req = request;
  temp.env = env;

  return temp;
};

export default buildRequest;
