const express = require('express');

express()
	.get('/', (request, response) => response.send('Get request done'))
	.listen(process.env.PORT || 3000, () => console.log('Get app done'));
