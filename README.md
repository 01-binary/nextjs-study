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