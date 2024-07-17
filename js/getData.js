const apiUrl = 'https://api.artic.edu/api/v1/';
const apiLimit = 1000;
let iiifUrl = '';
const endpoints = {
	artworks: {
		search: '/search?query[term][is_public_domain]=true',
		fields: '&fields=id,title,image_id'
	},
	exhibitions: {
		search: '/search?query[term][status]=Confirmed',
		fields: '&fields=id,title',
		idFields: '?fields=image_id,image_url,alt_image_ids'
	}
};

// on page load, grab some API constants
Object.keys(endpoints).forEach(async key => {
	const json = await getData({ endpoint: key, limit: 0 });

	endpoints[key].total = json.pagination.total;
	if (iiifUrl === '') {
		iiifUrl = json.config.iiif_url;
	}
});

async function getData({ endpoint, limit = 1, id = null }) {
	const ext = endpoints[endpoint];

	if (limit > apiLimit || limit > ext.total || limit < 0) {
		console.error('Misuse of limit variable has occurred.');
		return {};
	}

	let url = `${apiUrl}${endpoint}`;
	if (id !== null) {
		url += `/${id}${ext.idFields}`;
	} else {
		url += `${ext.search}&limit=${limit}${ext.fields}`;

		if (limit > 0) {
			let pageCount = ext.total / limit;
			if (pageCount > apiLimit) pageCount = apiLimit;
			let page = Math.floor(Math.random() * pageCount) + 1;
			if (page > 0) url += `&page=${page}`;
		}
	}

	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Status: ${res.status}`);
		}

		const json = await res.json();
		return json;
	} catch (err) {
		console.error(err.message);
	}
}

function getImageUrl(id) {
	const defaults = 'full/400,/0/default.jpg';
	return `${iiifUrl}/${id}/${defaults}`;
}

export async function getArtwork() {
	const endpoint = 'artworks';
	const {
		data: [{ image_id, title }]
	} = await getData({ endpoint });
	const urls = [await getImageUrl(image_id)];
	return { urls, title };
}

// grabs exhibition at random-ish,
// then grabs the specific exhibition data in order to get the image id(s)
export async function getExhibition() {
	const endpoint = 'exhibitions';
	const {
		data: [{ id, title }]
	} = await getData({ endpoint });
	const subJson = await getData({ endpoint, id });
	const imageId = subJson.data.image_id;
	const urls = [];
	if (imageId === null) {
		urls.push(subJson.data.image_url);
	} else {
		urls.push(await getImageUrl(imageId));
		subJson.data.alt_image_ids.slice(0, 5).forEach(async altId => {
			urls.push(await getImageUrl(altId));
		});
	}
	return { urls, title };
}
