# ArtIC Art

A small site to demonstrate the usage of basic HTML, CSS, and JS along with an API.

## Access

This site is live at [https://johnoro.github.io/artic-art/]

## Technical details

The ![getData.js](https://github.com/johnoro/artic-art/blob/main/js/getData.js) file grabs data from both the artworks and exhibitions endpoints in a limited, psuedo-random way via ArtIC's search functions. There are certain additional limitations imposed to limit the amount of data called and received, along with avoiding the built-in limits of the API itself.

The `getExhibition` function in particular takes quite a few extra steps to get it functional in a similar way to `getArtwork`. I wanted to make it able to grab multiple images for an exhibition if they were available, although that is not common a majority only have one picture, while a few only have text data.

## Credits

Art Institute of Chicago's API is used; see: [https://api.artic.edu/docs/]
