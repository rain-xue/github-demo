import { AuthUser } from '../models';
import { Request, Response } from 'express';

export interface ContextObject {
  authUser: AuthUser;
  req: Request;
  res: Response;
}
