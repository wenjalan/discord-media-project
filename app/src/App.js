import './App.css';
import React from 'react';

// creates a Gallery of images given a list of media urls
function Gallery(props) {
  // get urls from props
  const media = props.media;

  // if no media urls were given, complain
  if (media === undefined || media.length === 0) {
    console.error("Error loading media URLS");
  }

  // create the rows of items
  let galleryRows = [];

  // do sets of 3 or less links at a time
  const maxItemsPerRow = 3;
  for (let i = 0; i < media.length; i += maxItemsPerRow) {
    // get a subset of the links
    let subset = media.slice(i, i + maxItemsPerRow);

    // create a new row for each set of links
    galleryRows.push(<GalleryRow items={subset}/>);
  }

  // return the gallery with its rows as children
  return (
    <div className="Gallery">
        {galleryRows}
    </div>
  )
}

// creates a row in the gallery, given a list of background image urls
function GalleryRow(props) {
  // retrieve items
  const items = props.items;

  // create divs for each item
  const itemDivs = [];

  // for each URL
  let index = 0;
  items.forEach((item) => {
    // create a new Gallery Item and add it to itemDivs
    itemDivs.push(
      <GalleryItem key={index} itemInfo={item}/>
    );
    index++;
  });

  // return the items in a row
  return (
    <div className="Gallery-row">{itemDivs}</div>
  );
}

function GalleryItem(props) {
  // get the media url of this item
  const itemInfo = props.itemInfo;

  // create a background style for this item
  let backgroundImageStyle = {
    backgroundImage: "url(" + itemInfo.url + ")"
  }

  // return an item
  return (
    <div
      className="Gallery-item"
      onClick={() => window.open(itemInfo.url, "_blank")}
      style={backgroundImageStyle}>
      {/*{itemInfo.author + " at " + itemInfo.date}*/}
    </div>
  );
}

function App(props) {
  const channelName = props.channelName;
  const items = props.items;
  return (
    <div className="App">
      <header className="App-header">
        <h1>{"#" + channelName}</h1>
        <div className="Divider"/>
        <Gallery media={items}/>
      </header>
    </div>
  );
}

export default App;
