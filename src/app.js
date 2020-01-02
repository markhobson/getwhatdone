const express = require('express');
const port = process.env.PORT || 3000;

express()
	.get('/', (request, response) => response.send('Get request done'))
	.listen(port, () => console.log('Get app done'));
