export default function (context) {
  console.log("context",context.route.path);
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}