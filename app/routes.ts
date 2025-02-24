import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
  route("code", "routes/code.tsx"),
  route("design", "routes/design.tsx"),
  route("customize", "routes/customize.tsx"),
] satisfies RouteConfig;
