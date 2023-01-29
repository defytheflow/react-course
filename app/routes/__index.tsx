import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import clsx from "clsx";
import fs from "fs";
import React from "react";

import { capitalize } from "~/utils/misc";
import useToggle from "~/utils/use-toggle";

export const meta: MetaFunction = ({ location }) => {
  const { length, [length - 1]: lastPathnameSegment } = location.pathname.split("/");
  const name = makeTitle(lastPathnameSegment ?? "");
  return { title: `React Course - ${name}` };
};

type LinkType = Readonly<{ to: string; title: string }>;

type LoaderData = {
  initialAsideOpen: "true" | "false";
  linksData: Record<string, LinkType[]>;
};

function getFilesRecursive(dir: string, _files: string[] = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const name = dir + "/" + file;
    if (fs.statSync(name).isDirectory()) {
      getFilesRecursive(name, _files);
    } else {
      _files.push(name);
    }
  }

  return _files;
}

const makeTitle = (s: string) => s.split("-").map(capitalize).join(" ");

const ASIDE_COOKIE = "aside_open";

// https://stackoverflow.com/a/3409200
function parseCookies(request: Request) {
  const cookies: Record<string, string> = {};
  const cookieHeader = request.headers.get("cookie");

  if (cookieHeader === null) {
    return cookies;
  }

  for (const cookie of cookieHeader.split(";")) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) continue;
    const value = rest.join(`=`).trim();
    if (!value) continue;
    cookies[name] = decodeURIComponent(value);
  }

  return cookies;
}

export const loader: LoaderFunction = ({ request }) => {
  const cookies = parseCookies(request);

  const pathnames = getFilesRecursive("./app/routes/__index/exercises")
    .map(s => s.replace(/^.*__index/, ""))
    .map(s => s.replace(/.tsx/, ""));

  const map: LoaderData["linksData"] = {};

  for (const pathname of pathnames) {
    const parts = pathname.split("/");
    const category = makeTitle(parts[2]);
    const name = makeTitle(parts[3]);
    map[category] = map[category] ?? [];
    map[category].push({ to: pathname, title: name });
  }

  const data: LoaderData = {
    initialAsideOpen: cookies[ASIDE_COOKIE] as LoaderData["initialAsideOpen"],
    linksData: map,
  };

  return data;
};

export default function Index() {
  const { initialAsideOpen, linksData } = useLoaderData<LoaderData>();
  const allLinks = Object.values(linksData).flat();

  const { pathname } = useLocation();
  const link = allLinks.find(link => link.to === pathname);
  const [isAsideOpen, toggleAside] = useToggle(initialAsideOpen !== "false");

  React.useEffect(() => {
    document.cookie = `${ASIDE_COOKIE}=${isAsideOpen}; SameSite=Lax; path=/`;
  }, [isAsideOpen]);

  const navId = "aside-navigation";

  return (
    <div className="flex h-screen flex-col">
      <header className="relative h-10 bg-[#639] bg-[#82AAFF] py-4 text-white">
        <h1 className="m-0 text-center">{link ? link.title : "React Course ★"}</h1>
        <button
          aria-expanded={isAsideOpen}
          aria-controls={navId}
          onClick={toggleAside}
          className="absolute top-1/2 ml-6"
          style={{ transform: "translateY(-50%)" }}
        >
          {`${isAsideOpen ? "Hide" : "Show"} menu`}
        </button>
      </header>
      <div
        className={clsx("grid", isAsideOpen ? "grid-cols-layout" : "grid-cols-1", "grow")}
      >
        {isAsideOpen && (
          <nav id={navId} className="max-w-xs bg-[#ececec]">
            <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0 px-6">
              {Object.entries(linksData).map(([title, links]) => (
                <NavItem key={title} title={title} links={links} />
              ))}
            </ul>
          </nav>
        )}
        <main className="flex grow justify-center px-6 pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({ title, links }: { title: string; links: LinkType[] }) {
  return (
    <li>
      <h3 className="mt-0 mb-2">{title}</h3>
      <ul className="list-inside p-0 leading-6">
        {links.map(link => (
          <li key={link.to}>
            <NavLink to={link.to}>{link.title}</NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
