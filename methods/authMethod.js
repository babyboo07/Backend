const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.generateToken = async (payload, secretSignature) => {
	try {
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: process.env.ACCESS_TOKEN_LIFE,
			},
		);
	} catch (error) {
		console.log(`Error in generate access token:  + ${error}`);
		return null;
	}
};

exports.decodeToken = async (token, secretKey) => {
	try {
		return await verify(token, secretKey, {
			ignoreExpiration: true,
		});
	} catch (error) {
		console.log(`Error in decode access token: ${error}`);
		return null;
	}
};