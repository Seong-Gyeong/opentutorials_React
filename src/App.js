import logo from './logo.svg';
import './App.css';
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
      props.onChangeMode(event.target.id); //target:이벤트를 발생시킨 tag, 즉 a
      //props.onChangeMode(t.target.id);
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
  const topics =[
    {id:1, title: 'html', body: 'html is ...'},
    {id:2, title: 'css', body: 'css is ...'},
    {id:3, title: 'JS', body: 'javascript is ...'},
  ]
  return (
    <div className="App">
      {/* <header>
        <h1><a href="/">WEB</a></h1>
      </header> */}
      <Header title="REACT" onChangeMode={()=>{
        alert('Header');
      }}></Header> 
      {/* <nav>
        {/* <ol>
          <li><a href="/read/1">html</a></li>
          <li><a href="/read/2">css</a></li>
          <li><a href="/read/3">js</a></li>
        </ol>}
      </nav> */}
      <Nav topics={topics} onChangeMode={(id)=>{
        alert(id);
      }}></Nav>
      {/* <article>
        <h2>Welcome</h2>
        Hello, WEB
      </article> */}
      <Article title="Welcome" body="Hello,WEB"></Article>
    </div>
  );
}

export default App;
