import { NextRequest, NextResponse } from "next/server";

type RouteHandler = (
  request: NextRequest
) => void | Promise<void> | Promise<NextResponse<any>>;
export class Router {
  private _routes: Map<string, RouteHandler> = new Map();
  constructor() {}
  get(route: string, handler: RouteHandler) {
    this._routes.set(`GET /api${route}`, handler);
  }
  post(route: string, handler: RouteHandler) {
    this._routes.set(`POST /api${route}`, handler);
  }
  public findRoute(request: NextRequest): RouteHandler | null {
    console.log(new URL(request.url));
    const key = `${request.method} ${new URL(request.url).pathname}`;
    console.log(key);
    console.log(this._routes.keys().next());
    return this._routes.get(key) || null;
  }
}
