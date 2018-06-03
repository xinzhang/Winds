import { expect, request } from 'chai';
import { withLogin } from '../utils.js';
import api from '../../src/server';
import { loadFixture } from '../../src/utils/test';
import {reset} from '../utils';

describe('Features list', () => {

	before(async () => {
		await reset();
		await loadFixture('example', 'featured');
	});

	describe('read list', () => {
		it('should return rss and podcasts', async () => {
			const response = await withLogin(
				request(api).get('/featured')
			);
			expect(response).to.have.status(200);
			expect(response.body).to.be.a('Array');
			let types = response.body.map(r => { return r.type});
			expect(types).to.include('rss', 'podcast');
		});
	});

});
