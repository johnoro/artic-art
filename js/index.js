import Button from './components/Button.js';
import { getArtwork, getExhibition } from './getData.js';

const btnDiv = document.querySelector('.btns');
const artworkBtn = new Button(btnDiv, 'Generate Art', getArtwork);
const exhibitionBtn = new Button(btnDiv, 'Generate Exhibition', getExhibition);
