import '@testing-library/jest-dom'

import  request from "supertest";
import {expect, jest, test} from '@jest/globals';
import { describe, it } from "node:test";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";

// describe('all tests', () => {
//     it('should print request body', async () => {
//         const response = await axiosInstance.post('/api/movie/762509/add_rating', '5');
//         const data = response.data
    
//         expect(data).toStrictEqual({success: true})
//     })
    
//     it('should print rated movies data of user', async () => {
//         const response = await axiosInstance.get('/api/account/2/rated_movies/1');
//         const data = response.data
    
//         expect(data).toHaveProperty('total_count')
//     })

//     it('should be success', async () => {
//         const response = await axiosInstance.post('/api/auth', { requestToken: '4f42f3f51cbf2a5b0a82f2ccb0f91723aa10e408' }, {
//             headers: {
//                 'Accept': '*/*',
//                 'Content-Type': 'applcation/json',
//                 'Authorization': `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
//             }
//         });

//         const data = await response.data;

//         expect(data.success).toBe(true);
//     })
// })

test('should be success', async () => {
    const response = await fetch('http://localhost:3000/api/auth', {
		method: 'POST',
		body: JSON.stringify({ request_token: '4721e60dcd0492931c561988bb099af36c9d04a7' }),
	});

    const data = await response.json();

    expect(data.success).toBe(true);
})