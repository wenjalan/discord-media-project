import './App.css';
import React from 'react';

// creates a Gallery of images given a list of media urls
function Gallery(props) {
  // get urls from props
  const mediaUrls = props.media;

  // if no media urls were given, complain
  if (mediaUrls === undefined || mediaUrls.length === 0) {
    console.error("Error loading media URLS");
  }

  // create the rows of items
  let galleryRows = [];

  // do sets of 3 or less links at a time
  const maxItemsPerRow = 3;
  for (let i = 0; i < mediaUrls.length; i += maxItemsPerRow) {
    // get a subset of the links
    let subset = mediaUrls.slice(i, i + maxItemsPerRow);

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
  items.forEach((url) => {
    // create a new Gallery Item and add it to itemDivs
    itemDivs.push(
      <GalleryItem key={index} url={url}/>
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
  const mediaUrl = props.url;

  // create a background style for this item
  let backgroundImageStyle = {
    backgroundImage: "url(" + mediaUrl + ")"
  }

  // return an item
  return (
    <div
      className="Gallery-item"
      onClick={() => window.open(mediaUrl, "_blank")}
      style={backgroundImageStyle} />
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>#channel-name</h1>
        <div className="Divider"/>
        <Gallery media={
          [
            "https://media.discordapp.net/attachments/722365245653385268/842607169342144522/image0.png?width=377&height=670",
            "https://media.discordapp.net/attachments/722365245653385268/842607169342144522/image0.png?width=377&height=670",
            "https://media.discordapp.net/attachments/722365245653385268/842607169342144522/image0.png?width=377&height=670",
            "https://media.discordapp.net/attachments/722365245653385268/842607169342144522/image0.png?width=377&height=670",
            "https://media.discordapp.net/attachments/722365245653385268/842607169342144522/image0.png?width=377&height=670",
          ]
        }/>
      </header>
    </div>
  );
}

export default App;
