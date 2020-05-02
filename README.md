## package.json

-- awesome-typescript-loader => 타입스크립트 로더

## tsconfig.json

-- sourceMap => 소스맵(\*.map) 파일 생성 여부
-- noImplicitAny => any타입 금지여부
-- module => 모듈 설정
-- target => 사용할 ECMAScript 버전 설정
-- lib => 컴파일에 포함될 라이브러리 파일 목록
-- removeComments => 주석삭제
-- allowSyntheticDefaultImports => export default 를 export 한 값들을 가지는 객체로 설정
-- jsx => jsx 지원
-- baseUrl => Non-relativ 모듈 혹은 paths 옵션의 기준 디렉토리
-- paths => baseUrl 옵션을 기준디렉토리로 불러올 모듈의 위치 설정이 가능

@ https://vomvoru.github.io/blog/tsconfig-compiler-options-kr/ 용어정리

## webpack.config.js

-- entry => 처음 시작할 파일을 지정해줍니다. 지정하지 않으면 './src/index.js'가 기본 값이기 때문에 적어줘야 해요
-- resolve , extensions: [ '.tsx', '.ts', '.js' ] => 확장자 지정
-- output [filename] => build시 만들어질 파일 번들 파일 이름
-- output [path] => 그 경로
-- module [rules (test)] => .tsx 확장자로 끝나는 파일들을
-- module [rules (use)] => ts-loader 가 트랜스파일 해줍니다.
-- module [rules (exclude)] => node_modules 디렉토리에 있는 파일들이 제외하고

======================================================================================

## 설치 순서

======================================================================================

1. 프로젝트 디렉토리 생성
   $ mkdir React_TypeScript
$ cd React_TypeScript

   > de : 프로젝트로 사용할 디렉토리를 생성하고 해당 디렉토리로 이동한다.

2. packge.json 생성
   \$ npm init -y

   > de : 해당 프로젝트의 디렉토리에 사용할 packge.json을 생성한다.

3. webpack 세팅
   \$ npm i -D webpack webpack-cli

   > de : 프로젝트에 사용할 webpack을 개발용 패키지로 설치한다.
   > \$ touch webpack.config.js
   > de : 이후에 webpack 실행에 관한 설정을 하는 webpack.config.js 파일을 root 경로에 생성한다.

4. webpack.config.js파일에 아래와 같이 입력한다.
   const path = require('path');
   module.exports = {
   entry: './src/index.tsx',
   output: {
   path: path.join(\_\_dirname, '/dist'),
   filename: 'bundle.min.js'
   }
   }

   > de : entry : 연결되어 있는 각 파일 중, 제일 처음으로 시작되는 최상위 파일. 해당 최상위 파일부터 각 각 하위로 따라 내려가며 번들화 작업을 한다.
   > output: 번들화 된 파일을 export 할 경로와 파일명.
   > 위의 설정에는, 'src/index.tsx'의 파일이 running 시 동작되는 것 중 제일 처음으로 동작하는 최상위 파일이며, 해당 번들화 된 파일은 루트 경로의 '/dist/bundle.min.js'파일로 추출된다.

5. TypeScript 설치
   \$ npm i typescript awesome-typescript-loader -D
   > de : 위 명령어를 보면 typescript 뿐 아니라, 'awesome-typescript-loader'라는 것을 함께 설치할 것을 알 수 있다.

webpack은 일반적인 javascript 코드만 이해하므로, loader를 사용하면 다양한 유형의 파일을 발견하고 처리할 수 있다.

Typescript파일 번들링 작업 모듈은 일반적으로 'ts-loader'와 'awesome-typescript-loader'가 있는데, 여기서는 'awesome-typescript-loader''를 쓰도록 하겠다.

6.  tsconfig.json으로 typescript 사용 환경 설정하기

    > de : root 경로에 tsconfig.json 파일을 하나 생성하고 아래와 같이 추가한다.
    > {
    > "compilerOptions": {

        "sourceMap": true,
        "noImplicitAny": false,
        "module": "commonjs",
        "target": "es6",
        "lib": [
          "es2015",
          "es2017",
          "dom"
        ],
        "removeComments": true,
        "allowSyntheticDefaultImports": false,
        "jsx": "react",
        "allowJs": true,
        "baseUrl": "./",
        "paths": {
          "components/*": [
            "src/components/*"
          ],
        }

    }
    }

7.  webpack.config.js에서 모듈 설정하기
    > de : webpack.config.js에서 모듈 설정하기
    > const path = require('path');

module.exports = {
entry: './src/index.tsx',
resolve: {
extensions: ['.ts', '.tsx', '.js']
},
output: {
path: path.join(\_\_dirname, '/dist'),
filename: 'bundle.min.js'
},
module: {
rules: [
{
test: /\.tsx?$/,
loader: 'awesome-typescript-loader'
}
]
}
}

8. React 설치
   \$ npm i react react-dom @types/react @types/react-dom

   > de: 설치한 모듈 중 react, react-dom 뿐 아니라, @types/react, @types/react-dom을 설치한 것을 알 수 있다.
   > 이는 typescript 방식으로 사용할 수 있도록 호환성을 제공해주는 모듈이다.

9. 간단한 react component 생성
   > de : root경로에 src디렉토리를 하나 생성 후, 변수의 타입을 지정해 줄 수 있는 interface를 생성한다.

<code>
'/src/PageInterface.ts'
export default interface Page {
  color: string;
}

'/src/components/App.tsx'
import \* as React from 'react';
import PageInterface from '../PageInterface';

class App extends React.Component<PageInterface, {}> {
render() {
return (<div>
<h1>Welcome to React with Typescript</h1>
<p>The color of this page is: {this.props.color}</p>
</div>
);
}
}

export default App;

'/src/index.tsx'
import _ as React from 'react';
import _ as ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render (
<App color="Blue" />,
document.getElementById("root")
);

'src/index.html'

<!DOCTYPE html>
<html lang="en"> 
  <head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
    <title>TypeScript + React</title> 
  </head> 
  <body> 
    <div id="root">

    </div>

  </body>
</html>

10. HTML Plugin 추가

    > de : webpack의 번들링 작업이 끝난 후 나온 html파일이 자동으로 bundle.min.js파일을 참조하는 코드를 추가하도록 도와주는 플러그인을 설치한다.
    > \$ npm i html-webpack-plugin -D

11. webpack.config.js 파일에 해당 플러그인 파일을 적용한다.
    const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
entry: './src/index.tsx',
resolve: {
extensions: ['.ts', '.tsx', '.js']
},
output: {
path: path.join(\_\_dirname, '/dist'),
filename: 'bundle.min.js'
},
module: {
rules: [
{
test: /\.tsx?$/,
loader: 'awesome-typescript-loader'
}
]
},
plugins: [
new HtmlWebpackPlugin({
template: './src/index.html'
})
]
}

12. packge.json의 script 명령어 추가
    "scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production"
    }
    > de : npm start로 실행시키게 되면, webpack 명령어에 의해 webpack.config.js파일에 설정한 방식대로 동작하게 되어, dist디렉토리 안에 번들링 된 파일이 추출된다.

13.typescript파일을 번들링 시키기
\$ npm start

> de : 그러면 번들링 작업이 실행되면서, 번들링 작업 후에 dist 디렉토리와 번들링된 파일이 생성된 것을 확인할 수 있다.

14.개발용 환경 구축

> de : 개발중이면 이러한 번들작업과 웹브라우저 실행을 일일이 하게되면 매우 귀찮다. 그래서 실시간 번들링 작업과 자동 새로고침이 되는 개발용 환경을 구축해보자.
> webpack 개발용 서버 모듈을 설치한다.

npm i webpack-dev-server --D

> de : 그리고 package.json의 스크립트 명령어를 아래와 같이 변경한다.
> "scripts": {
> "start": "webpack-dev-server --mode development --open --hot",
> "build": "webpack --mode production"
> }

15.npm start 명렁어에서, webpack 개발용 서버로 실행을 시킨다는 것을 알 수 있다.

de> :
--open : default로 브라우저를 열어주는 옵션
--hot : 개발 중 변경된 사항을 자동으로 번들링 작업
