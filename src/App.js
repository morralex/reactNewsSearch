import React, { Component, useState, useEffect } from 'react';

const App = () => {
  //state
  const [news, setNews] = useState([])
  const [searchQuery, setSearchQuery] = useState()
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?')
  const [loading, setLoading] = useState(false)

  //fetch news
  const fetchNews = () => {
    // while fetching -> set loading to true
    setLoading(true)
    fetch(url)
      .then(result => result.json())
      // .then( data => console.log(data))
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error))
  };

  useEffect(() => {
    fetchNews();
  },
    [url]
  );

  /**
   * handle change method will grab the EVENT TARGET VALUE
   * we can grab the value and populate in the state and fetch the news
   */
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  };

  const handleSubmit = e => {
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  };

  // we use this function without a return (see below) and use parenthesis b/c its only one statement
  const showLoading = () => (loading ? <h2>Loading...</h2> : "")

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChange} />
      <button>Search</button>
    </form>
  )

  // here is the other way of typing with return (see ^, works better for multiple statements)
  const showNews = () => {
    return news.map((n, i) => (
      <p key={i}>{n.title}</p>
    ))}

  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  )
}

/**
 * This is the same COUNTER app using REACT HOOKS
 */

// const App = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     document.title = `Clicked ${count} times`
//   })

//   const increment = () => {
//     setCount(count + 1)
//   };

//   return (
//     <div>
//       <h2>Counter App</h2>
//       <button onClick={increment}>
//         Clicked {count} times
//       </button>
//     </div>
//   );

// };

/** 
 * This is the original counter using CLASS COMPONENTS
*/

// class App extends Component {
//   state = {
//     count: 0
//   };
//   increment = () => {
//     this.setState({
//       count:  this.state.count + 1
//     });
//   };
//   componentDidMount(){
//     document.title = `Clicked ${this.state.count} times`
//   }
//   componentDidUpdate(){
//     document.title = `Clicked ${this.state.count} times`
//   }
//   render() {
//     return (
//       <div>
//         <h2>Counter App</h2>
//         <button onClick={this.increment}>
//           Clicked {this.state.count} times
//       </button>
//       </div>
//     );
//   }
// }

export default App;
