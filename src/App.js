import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; /* Hook : 리액트에서 기본적으로 제공하는 함수 (여기서는 useState) */
import { eventWrapper } from '@testing-library/user-event/dist/utils';

// 컴포넌트(사용자 정의 태그)는 무조건 대문자로 시작해야한다. 
function Header(props) {
  return <header>
  <h1><a href="/" onClick={(event) => {
    event.preventDefault(); //기본동작(reload) 방지
    props.onChangeMode();
  }}>{props.title}</a></h1>
</header>
}

function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a id={t.id} href={'/read/'+t.id} onClick={event=>{
      event.preventDefault();
      props.onChangeMode(Number(event.target.id)); 
      //target:이벤트를 발생시킨 tag, 즉 a 
      //id 값이 배열에서는 숫자이지만, 태그의 속성으로 들어가면 문자열이 되므로 숫자로 바꾸어준다
      //props.onChangeMode(t.id); //이것도 되는데 왜 위에처럼 하는 걸까
    }}>{t.title}</a>
    </li>)
    // 배열의 요소는 반복문 안에서 고유한 prop인 key를 가져야함
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav> 
}

function Article(props) {
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article> 
}

function App() {
  // const _mode = useState('WELCOME'); /* useState : 배열을 리턴, 0번째 원소는 상태의 값을 읽을 떄 쓰는 데이터, 1번째 데이터는 그 상태의 값을 변경할 때 쓰는 함수  */
  // const mode = _mode[0];
  // const setMode_= _mode[1];
  const [mode, setMode_] = useState('WELCOME'); //위에 3줄과 같은 표현
  const [id, setId] = useState(null);
  const topics =[
    {id:1, title: 'html', body: 'html is ...'},
    {id:2, title: 'css', body: 'css is ...'},
    {id:3, title: 'JS', body: 'javascript is ...'},
  ]
  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello,WEB"></Article>
  } else if (mode === 'READ') {
    let title, body = null;
    for(let i =0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title="{title}" body="{body}"></Article>
  }
  return (
    <div className="App">
      {/* <header>
        <h1><a href="/">WEB</a></h1>
      </header> */}
      <Header title="REACT" onChangeMode={()=>{
        setMode_('WELCOME');
      }}></Header> 
      {/* <nav>
        {/* <ol>
          <li><a href="/read/1">html</a></li>
          <li><a href="/read/2">css</a></li>
          <li><a href="/read/3">js</a></li>
        </ol>}
      </nav> */}
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode_('READ');
        setId(_id);
      }}></Nav>
      {/* <article>
        <h2>Welcome</h2>
        Hello, WEB
      </article> */}
     {content}
    </div>
  );
}

export default App;
