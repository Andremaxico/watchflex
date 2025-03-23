import '@testing-library/jest-dom'

import  request from "supertest";
import {expect, jest, test} from '@jest/globals';
import { describe, it } from "node:test";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";

describe('all tests', () => {
    it('should print request body', async () => {
        const response = await axiosInstance.post('/api/movie/762509/add_rating', '5');
        const data = response.data
    
        expect(data).toStrictEqual({success: true})
    })
    
    it('should print rated movies data of user', async () => {
        const response = await axiosInstance.get('/api/account/2/rated_movies/1');
        const data = response.data
    
        expect(data).toHaveProperty('total_count')
    })
})