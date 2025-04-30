import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useFetcher } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function LocationComponent({ locationInfo, imageInfo }) {
  var _a, _b, _c, _d, _e, _f;
  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function convertFromKelvinToCelsius(kelvin) {
    if (kelvin < 0) return 0;
    return Math.round(kelvin - 273.15);
  }
  return /* @__PURE__ */ jsxs("section", { className: "h-full grow-3 flex", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col grow pt-5 pl-5", children: /* @__PURE__ */ jsxs("h2", { className: "text-2xl", children: [
      "Image by ",
      /* @__PURE__ */ jsx(
        "a",
        {
          href: (_a = imageInfo == null ? void 0 : imageInfo.links) == null ? void 0 : _a.html,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-white underline",
          children: (_b = imageInfo == null ? void 0 : imageInfo.user) == null ? void 0 : _b.name
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-end items-end pb-10 pr-20 grow text-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsx("span", { className: "self-start", children: /* @__PURE__ */ jsx("img", { className: "w-[80%]", src: `https://openweathermap.org/img/wn/${(_d = (_c = locationInfo == null ? void 0 : locationInfo.weather) == null ? void 0 : _c[0]) == null ? void 0 : _d.icon}.png` }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-5xl", children: locationInfo.name })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl", children: [
        capitalizeFirstLetter((_e = locationInfo == null ? void 0 : locationInfo.weather) == null ? void 0 : _e[0].description),
        ": ",
        convertFromKelvinToCelsius((_f = locationInfo == null ? void 0 : locationInfo.main) == null ? void 0 : _f.feels_like),
        "° C"
      ] })
    ] })
  ] });
}
function MenuComponent({ setInputtedLocation, locationInfo }) {
  var _a, _b, _c, _d;
  console.log(locationInfo);
  return /* @__PURE__ */ jsxs("section", { className: "h-full w-20 gap-10 flex flex-col justify-start items-start px-4 pt-10 isolate aspect-video w-96 rounded-l-xl bg-black/40 shadow-lg ring-1 ring-black/5 text-white", children: [
    /* @__PURE__ */ jsx(
      SearchForm,
      {
        setInputtedLocation
      }
    ),
    /* @__PURE__ */ jsx(
      ListOfCities,
      {
        setInputtedLocation
      }
    ),
    /* @__PURE__ */ jsx(
      CityInfo,
      {
        windSpeed: ((_a = locationInfo == null ? void 0 : locationInfo.wind) == null ? void 0 : _a.speed) || 0,
        sunrise: new Date(((_b = locationInfo == null ? void 0 : locationInfo.sys) == null ? void 0 : _b.sunrise) || 0),
        sunset: new Date(((_c = locationInfo == null ? void 0 : locationInfo.sys) == null ? void 0 : _c.sunset) || 0),
        country: ((_d = locationInfo == null ? void 0 : locationInfo.sys) == null ? void 0 : _d.country) || ""
      }
    )
  ] });
}
function SearchForm({ setInputtedLocation }) {
  let fetcher = useFetcher();
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const city = formData.get("city");
    setInputtedLocation(city);
  }
  return /* @__PURE__ */ jsxs(fetcher.Form, { method: "get", onSubmit: handleSubmit, className: "w-full grow-1 flex justify-center items-center ", children: [
    /* @__PURE__ */ jsx("input", { type: "text", name: "city", placeholder: "Search...", className: "border-y-2 border-l-2 outline-none border-white rounded-l-md p-2 " }),
    /* @__PURE__ */ jsx("button", { className: "bg-amber-500 h-11 w-10  flex justify-center items-center cursor-pointer border-y-2 border-r-2 border-white", children: /* @__PURE__ */ jsx(SearchIcon, {}) })
  ] });
}
function ListOfCities({ setInputtedLocation }) {
  const cities = ["London", "New York", "Tokyo", "Paris", "Amsterdam"];
  const handleCitiesSubmit = (city) => {
    setInputtedLocation(city);
  };
  return /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("ul", { className: "grow-3 flex flex-col gap-4 pl-5", children: cities.map((city, index) => /* @__PURE__ */ jsx("li", { className: "text-2xl list-none cursor-pointer hover:font-medium", children: /* @__PURE__ */ jsx("button", { className: "cursor-pointer hover:font-medium", onClick: () => handleCitiesSubmit(cities[index]), children: city }) }, index)) }) });
}
const CityInfo = ({ windSpeed, sunrise, sunset, country }) => {
  return /* @__PURE__ */ jsxs("section", { className: "w-full pl-5 grow-2 flex flex-col justify-center items-start gap-2", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-xl", children: [
      "Country Code: ",
      country
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-xl", children: [
      "Sunrise: ",
      sunrise.toLocaleString().split(",")[1]
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-xl", children: [
      "Sunset:  ",
      sunset.toLocaleString().split(",")[1]
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-xl", children: [
      "Wind Speed: ",
      windSpeed,
      " m/h"
    ] })
  ] });
};
function SearchIcon() {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "25", height: "25", viewBox: "0 0 50 50", children: /* @__PURE__ */ jsx("path", { d: "M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" }) });
}
function Welcome() {
  var _a, _b, _c;
  function successLocationMethod(pos) {
    const { latitude, longitude } = pos.coords;
    setLocationCoords({
      latitude,
      longitude
    });
  }
  function errorLocationMethod(err) {
    setLocationError({
      error: true,
      message: err.message,
      code: err.code
    });
  }
  const [locationCoords, setLocationCoords] = useState({
    latitude: 0,
    longitude: 0
  });
  const [locationError, setLocationError] = useState({
    error: false,
    message: "",
    code: 0
  });
  const [locationData, setLocationData] = useState({
    image: {
      results: []
    },
    location: ""
  });
  const [inputtedLocation, setInputtedLocation] = useState(null);
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successLocationMethod, errorLocationMethod);
    }
  }, []);
  useEffect(() => {
    if (locationCoords.latitude !== 0 && locationCoords.longitude !== 0) {
      const fetchUrl = `https://weather-backend-6kka.onrender.com/lat=${locationCoords.latitude}&lon=${locationCoords.longitude}`;
      fetch(fetchUrl).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }).then((data) => {
        setLocationData({
          image: data.image,
          location: data.weather
        });
      });
    }
  }, [locationCoords, locationError]);
  useEffect(() => {
    const fetchUrl = `https://weather-backend-6kka.onrender.com/q=`;
    inputtedLocation && fetch(fetchUrl + inputtedLocation).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then((data) => {
      setLocationData({
        image: data.image,
        location: data.weather
      });
    });
  }, [inputtedLocation]);
  const randomImage = (_b = (_a = locationData == null ? void 0 : locationData.image) == null ? void 0 : _a.results) == null ? void 0 : _b[randomNumber(1, 5)];
  return /* @__PURE__ */ jsxs(
    "main",
    {
      className: "h-screen w-screen flex justify-center items-center",
      style: {
        backgroundImage: `url("${(_c = randomImage == null ? void 0 : randomImage.urls) == null ? void 0 : _c.regular}")`,
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)"
      },
      children: [
        /* @__PURE__ */ jsx(
          LocationComponent,
          {
            locationInfo: locationData.location,
            imageInfo: randomImage
          }
        ),
        /* @__PURE__ */ jsx(
          MenuComponent,
          {
            setInputtedLocation,
            locationInfo: locationData.location
          }
        )
      ]
    }
  );
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BwAjAglT.js", "imports": ["/assets/chunk-LSOULM7L-DyHgxyxV.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-D_EJ66WF.js", "imports": ["/assets/chunk-LSOULM7L-DyHgxyxV.js", "/assets/with-props-BOZ2agzP.js"], "css": ["/assets/root-CqRf9ViD.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BjWVSFd_.js", "imports": ["/assets/with-props-BOZ2agzP.js", "/assets/chunk-LSOULM7L-DyHgxyxV.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-d6f55e49.js", "version": "d6f55e49", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
