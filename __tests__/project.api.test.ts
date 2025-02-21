import '@testing-library/jest-dom'

import  request from "supertest";
import {expect, jest, test} from '@jest/globals';
import { describe, it } from "node:test";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";

test('should print request body', async () => {
    const response = await axiosInstance.post('/api/movie/762509/add_rating', '5');
    const data = response.data

    expect(data).toStrictEqual({success: true})
})