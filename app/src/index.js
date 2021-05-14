import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// example items
const exampleItems = [
  {
    author: "@wen",
    url: "https://media.discordapp.net/attachments/722365245653385268/842588587338104882/unknown.png?width=375&height=670",
    date: "2021-5-13 11:13 PM",
  },
  {
    author: "@frn",
    url: "https://media.discordapp.net/attachments/722365245653385268/842595582032084992/unknown.png?width=514&height=670",
    date: "2021-5-13 11:13 PM",
  },
  {
    author: "@nuq",
    url: "https://media.discordapp.net/attachments/722365245653385268/842588153722044446/cae3bde1de5e3627d16addafe2ba1ec1.png?width=377&height=670",
    date: "2021-5-13 11:13 PM",
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App channelName={"pics"} items={exampleItems}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
