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

Hydrate는 Server Side 단에서 렌더링 된 정적 페이지와 번들링된 JS파일을 클라이언트에게 보낸 뒤, 클라이언트 단에서 HTML 코드와 React인 JS코드를 서로 매칭 시키는 과정

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

---

공식문서

Each page is associated with a route based on its file name.

When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called hydration.)

`getServerSideProps` 안에서 `API Route` call 하지마라

데이터가 자주 바끼면 cs에서 call해라

If an error is thrown inside getServerSideProps, it will show the pages/500.js file.

getStaticPaths will only run during build in production,

`getStaticProps` runs during next build for any paths returned during build
`getStaticProps` runs in the background when using fallback: true
`getStaticProps` is called before initial render when using fallback: blocking

`getStaticPaths` can only be exported from a dynamic route that also uses getStaticProps

In development (next dev), getStaticPaths will be called on every request.

`getStaticProps` always runs on the server and never on the client.


Next.JS에서 내부적으로 사용하는 ReactDOM.hydrate 함수는 다음과 같은 일을 한다.
서버에서 받아온 DOM tree와 자체적으로 렌더링한 tree를 비교한다.
두 tree 사이의 diff를 얻어낸 뒤, 자체적으로(클라이언트사이드) 렌더링 한 tree에 맞춰 patch를 적용한다.

HYDRATE의 등장은 SSR을 위한 것으로, getInitialProps와 getServerSideProps에서도 Redux store에 접근이 가능하도록 하기 위한 처리이다.

next에서 생성한 redux store와 client에서 생성한 redux store는 다르다.
이 둘을 합칠 때 사용하는 것이 HYDRATE 이다. 서버에서 생성한 상태를 client store에 합쳐준다.

getServerSideProps에서 사용하기 위한 모듈은 최상단에 import하여 사용 가능하다.
getServerSideProps에 사용된 모듈들은 클라이언트 측에 번들로 제공 되지 않는다.
즉, 이 영역에서는 서버 측 코드를 작성 할 수 있게 된다.
예를 들어 숨기고 싶은 api url 또는 파일 읽기, 데이터베이스 읽기 등이 포함된다.

getServerSideProps는 항상 페이지 내에 사용되는 데이터가 최신이어야 할 때 사용해야 한다.
매번 페이지가 요청 될때 마다 getServerSideProps를 통해 프리랜더링 과정이 일어나
Time to first Byte (TTFB) 가 getStaticProps보다 느리기 때문이다.
또, getServerSideProps는 추가 설정 없이는 결과가 CDN에 캐시되지 않는다는 점도 있다.

getInitialProps를 사용 할 경우 ssr은 가능하지만 해당 코드가 클라이언트에서도 실행 되어야 하는
상황이 존재 하기 때문에 코드가 브라우저에도 전달 되어야 하고,
해당 영역에서 사용한 모듈이 있으면 또 그만큼 번들 사이즈가 커지게 된다는 점이 있다고 한다.

getServerSideProps를 사용하게 되면 항상 서버 사이드에서만 실행되므로,
해당 영역이 브라우저로 전달될 필요가 없어서 번들 사이즈를 줄일 수 있다.
클라이언트 사이드에서 데이터 패칭을 해야 할 경우 페이지를 먼저 보여주고 스켈레톤 ui나 로딩 아이콘을 보여준 다음 가져온 데이터를 화면에 보여주는 방식을 권장 하는 듯 하다.

아무래도 서버 사이드에서만 실행되어야 숨기고 싶은 api url 또는 파일 읽기, 데이터베이스 읽기 등의
코드를 작성 할 수 있어서 클라이언트 사이드에서도 실행 가능한 getInitialProps의 애매한 포지션보다는 getServerSideProps를 권장하고 클라이언트 사이드에서의 데이터는 클라이언트에서 가져오고
로딩 중이라는 표시를 사용자에게 해주는 방향으로 가려는 의도로 보인다.