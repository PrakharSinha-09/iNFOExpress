import React from 'react'

const Newsitem=(props)=> {
  
    let { title, description, imageURL, newsUrl, author, date,source} = props;                   //this is how we set props in the class based component i.e., via this.props ...and then destructuring
    return (
      <>
        <div className="my-3" style={{}}>
          <div className="card" style={{padding:'20px'}}>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}</span>
            <img src={!imageURL ? "https://media.istockphoto.com/id/1212012012/vector/breaking-news-isolated-vector-icon-sign-of-main-news-on-dark-world-map-background.jpg?s=612x612&w=0&k=20&c=a8gFWIOUbtQYc40M1Fj0r1JRekqBin-7dM2gCvzpa_8=" : imageURL} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>

              <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </>
    )
  
}

export default Newsitem;