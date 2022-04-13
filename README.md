###

lib vs framework

라이브러리와 프레임워크의 주요 차이점은 "Inversion of Control"(통제의 역전)입니다.
라이브러리에서 메서드를 호출하면 사용자가 제어할 수 있습니다.
그러나 프레임워크에서는 제어가 역전되어 프레임워크가 사용자를 호출합니다.

라이브러리
사용자가 파일 이름이나 구조 등을 정하고, 모든 결정을 내림

프레임워크
파일 이름이나 구조 등을 정해진 규칙에 따라 만들고 따름

code is guest

ReactDOM.render가 없다.

프레임워크인 next가 알아서 routing

pages 폴더에서 export default function (React Component)

### Pages

index.tsx (Home)
[file_name] (endpoint)

### Static Pre Rendering

noscript tag : 브라우저에서 자바스크립트를 비활성화 했을때 나오는 tag

csr: 인터넷이 느린 경우 첨에 들어가면 흰 화면만 보임

ssr: js가 비활성화 or 인터넷이 느려서 적어도 html은 볼수잇음 -> 왜 댐? -> 서버에서 pre rendering
- 서버에서 pre render -> html이 됨 -> client에서 html 렌더 (js와 react가 로딩이 안되어도 콘텐츠는 볼수있음) -> react가 로딩되면 존재하는 것들와 연결되어 inter action 가능
- seo 굳


hydration : 초기 상태로 pre-rendering
-  페이지가 딱 떳을떄는 html만 보임 이후에 react.js가 client로 전송되면 react app가 된다

atag 쓰지마 (브라우저가 전체 페이지를 새로고침한다ㅏ) -> client side nav 쓰셈 ㄲ


style

module
styled jsx : scope 한정 적용

### APP


App component : 모든 컴포넌트의 blueprint를 커스텀할 수 있는 장소
App page


whenever Link components appear in the browser’s viewport, Next.js automatically prefetches the code for the linked page in the background. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

<Imgae />

Next.js optimizes images on-demand


```javascript
    <Script
    src="https://connect.facebook.net/en_US/sdk.js"
    strategy="lazyOnload"
    onLoad={() =>
        console.log(`script loaded correctly, window.FB has been populated`)
    }
    />
```

Next.js compiles CSS using PostCSS.

https://nextjs.org/learn/basics/assets-metadata-css/styling-tips 
when tailwind setting in nextjs

By default, Next.js pre-renders every page

next의 Pre render 종류

- Static Generation (Recommended): The HTML is generated at build time and will be reused on each request.
- Server-side Rendering: The HTML is generated on each request.


You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

Static Page에서 데이터를 fetch 해야할 경우 build time에서 데이터를 fetch하고 페이지(html)를 만든다.
-> getStaticProps 이걸 쓴다.

예시

```javascript
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

### Static Generation 

Essentially, `getStaticProps` allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”


 `getStaticProps` only runs on the server-side.  It will never run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

- In development (npm run dev or yarn dev), getStaticProps runs on every request.
- In production, getStaticProps runs at build time. However, this behavior can be enhanced using the fallback key returned by getStaticPaths

Only Allowed in a Page
getStaticProps can only be exported from a page. You can’t export it from non-page files.

One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

### Server Side Rendering

To use Server-side Rendering, you need to export `getServerSideProps` instead of `getStaticProps` from your page.

```
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

Because getServerSideProps is called at request time, its parameter (context) contains request specific parameters.

You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time. Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.

Static Generation without Data + Fetch Data on the Client-Side 
-> ssr에서 Fetch안하고 client side에서 fetch할 수도 있다. (seo가 필요 없을 경우에 쓸 수 있다)


### SWR

We highly recommend it if you’re fetching data on the client side


### Dynamic Route

```javascript
export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
```

`getStaticPaths` : 가능한 [id] 리스트 get 
pages/**/[id].tsx 형태의 동적 라우팅 페이지 중, 빌드 시에 static하게 생성할 페이지를 정함


#### Catch-all Routes
Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:

pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.

#### 404 Pages
To create a custom 404 page, create pages/404.js. This file is statically generated at build time.

```javascript
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

#### Do Not Fetch an API Route from getStaticProps or getStaticPaths
You should not fetch an API Route from `getStaticProps` or `getStaticPaths`. Instead, write your server-side code directly in `getStaticProps` or `getStaticPaths` (or call a helper function).

Here’s why: `getStaticProps` and `getStaticPaths` run only on the server-side and will never run on the client-side. Moreover, these functions will not be included in the JS bundle for the browser. That means you can write code such as direct database queries without sending them to browsers. Read the Writing Server-Side code documentation to learn more.

API Route : 서버 사이드에서 실행된다. (cs X)


API 키 숨기기 : `next.config.js`, Server Side Rendering `getServerSideProps`

redirects

```javascript
    async redirects() {
    return [{
      source: '/old-blog/:path*',
      destination: '/new-sexy-blog/:path*',
      permanent: false,
    }];
  },
```

rewrites : redirect를 하기는 하지만 URL이 변하지는 않는다.

```javascript
    async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
```


실행 순서 :

`getServerSideProps` -> `App Component` -> `Component`

**home에서 detail로 link로 이동한 경우 (Client Router)**

서버에서 `getServerSideProps` 실행 -> 클라이언트에서 `App Component` -> `Component` render

**detail로 url통해 바로 이동한 경우**

서버에서 `getServerSideProps` -> `App Component` -> `Component` (html pre-render를 위해) -> 클라이언트에서 html를 받고 다시 `App Component` -> `Component` render


컴포넌트 내부에 들어있는 router는 cs에서만 실행됨