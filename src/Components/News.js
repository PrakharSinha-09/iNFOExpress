import React ,{useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import newsImg from './news.png'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{

  const [articles, setArticles] = useState([])                //initial value of articles is an empty array(obviously) as we did in class based componenet
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // this will be passed as default options as props 
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // constructor(props) {
  //   super(props);
  //   console.log("Inside Constructor")

  //   // this.state = {
  //   //   articles: [],
  //   //   loading: true,
  //   //   page: 1,
  //   //   totalResults: 0
  //   // }
    //Now we want to change the title depending on the category we are at. for that, we need to send props in constructor too
    document.title = `${capitalizeFirstLetter(props.category)}-iNFOExpress`;
  
  
  const updateNews=async ()=>                   //making it async, because this will be making API calls and
  {
    props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fbcd59c57b3c4abba40faf1dffdc165f&pageSize=${props.pageSize}`;
    setLoading(true)

    let data = await fetch(url);            //this "data" will also be the promise itself and te promise will be whatever data has been came up, in which form do we need to parse it into like in text or json. Hence, in line 1322, we have parsed it in json
    
    props.setProgress(30);
    let parsedData = await data.json();
    
    props.setProgress(70);
    
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);                     //progress bar can go from 0 to 100 (see documentation)

  }

  useEffect(() => {
    updateNews();
  }, [])

  // const prevClick = async () => {
  //   // this.setState({page: this.state.page - 1});
  //   setPage(page-1)
  //   updateNews();
  // }

  // const nextClick = async () => {
  //   // this.setState({page: this.state.page + 1});
  //   setPage(page+1)

  //   updateNews();
    
  // }

  const fetchMoreData = async () => {
  
    setPage(page+1)

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fbcd59c57b3c4abba40faf1dffdc165f&page=${page+1}&pageSize=${props.pageSize}`;

    let data = await fetch(url);            //this "data" will also be the promise itself and te promise will be whatever data has been came up, in which form do we need to parse it into like in text or json. Hence, in line 1322, we have parsed it in json
    let parsedData = await data.json();
    
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    return (
      <>
        {/* <div className='container my-3'> */}
          <h2 className="text-center text-danger my-3"><img src={newsImg} className="img-fluid" style={{ width: '250px' }} alt="..." /><strong><i>iNFO Express</i> - Headlines</strong></h2>
          {loading && <Spinner />}             

          <InfiniteScroll                                           /* source:https://codesandbox.io/s/yk7637p62z?file=/src/index.js */
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
          >

            <div className="container">

              <div className="row">
                {articles.map((element) => {                    //!this.state.loading && this is not needed now, as we have our loader at last
                  return <div className="col-md-3 " key={element.url} >
                    {/* if title is null, we are setting it to be empty string otherwise whatever title is there, slicing it till 50 and then setting the new title and same applies for description too! */}
                    <Newsitem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageURL={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}
              </div>
            </div> 
          </InfiniteScroll>
          <div className="container d-flex justify-content-between">
            {/* since we are inside we have to call our function using this keyword */}

            {/* <button disabled={this.state.page <= 1} type="button" className="btn btn-danger" onClick={this.prevClick}>&larr; Prev</button>
            <button type="button" className="btn btn-danger" onClick={this.nextClick}>Next &rarr; </button> */}

          </div>
        {/* </div> */}
      </>
    )
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News