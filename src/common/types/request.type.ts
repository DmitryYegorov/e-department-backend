import { Request } from "express";

export type RequestUserPayload = Request & { userId: string };
