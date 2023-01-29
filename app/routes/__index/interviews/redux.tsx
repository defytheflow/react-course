import { useLoaderData } from "@remix-run/react";
import fs from "fs";
import { marked } from "marked";

export function loader() {
  const markdown = fs.readFileSync("./docs/redux-interview-questions.md").toString();
  const html = marked(markdown);
  return html;
}

export default function ReduxInterview() {
  const html = useLoaderData<typeof loader>();
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
