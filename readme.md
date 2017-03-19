# Code-Foo Front End Project
## Description:
Build a web page that displays the content and matches this design of the example given at http://www.ign.com/code-foo/2017/ as closely as possible. The page should be responsive, and should support common resolutions ranging from mobile to desktop.

## Instructions:
Clone repository.<br />
Open 'codefoo_frontend.html' in web browser.

## Additional Features
* Responsive images - loads from a set of images depending on the resolution of the web browser window.  Loads compact image for mobile devices and larger images for larger devices.  Since mobile devices tend to have slower internet connections loading smaller images makes for faster load times and less data usage.  
* Image toggling - toggles image if row clicked, also hides any visible images if different row clicked.  Keeps the page from looking cluttered with multiple images being displayed at the same time.
* Link to original web page - clicking on image redirects client to URL of original video.  (Articles had no url for original article to link back to)
* Toggling of active category heading - Toggle the category header so user can see whether they are looking at ARTICLES or VIDEOS
* Data caching - After page is fully loaded and displayed makes additional API requests in the background to get the rest of the collection of articles or videos.  Allows for faster load time of additional content.  Instead of user waiting for API request to display additional content, content is available instantaneously.  Data caching also allows for the ability to search all content using a keyword search.
* Search function - Searches collection titles, descriptions, and tags and displays matches.  Allows user to search for content based on search string. 
