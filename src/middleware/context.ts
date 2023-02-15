import { AuthUser } from "../models";
import { Request, Response } from "express";
import { CustomRequest } from "./check-context";

export interface ContextObject {
  authUser?: AuthUser;
  req?: CustomRequest;
  res?: Response;
}
