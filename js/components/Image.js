export default class Image {
	constructor(url, alt) {
		this.element = document.createElement('img');
		this.element.setAttribute('src', url);
		this.element.setAttribute('alt', alt);
	}
}
