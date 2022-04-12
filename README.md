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

<Script />

      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />


Next.js compiles CSS using PostCSS.

https://nextjs.org/learn/basics/assets-metadata-css/styling-tips 
when tailwind setting in nextjs

By default, Next.js pre-renders every page

next의 Pre render 종류

- Static Generation (Recommended): The HTML is generated at build time and will be reused on each request.
- Server-side Rendering: The HTML is generated on each request.


You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
