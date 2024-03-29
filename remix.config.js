/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_routeConvention: true,
    v2_meta: true,
  },
  serverBuildTarget: "vercel",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  cacheDirectory: "./node_modules/.cache/remix",
  appDirectory: "app",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  assetsBuildDirectory: "public/build",
};
