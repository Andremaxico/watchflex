import  request from "supertest";
import { describe, it } from "node:test";
import axios from "axios";
import { axiosInstance } from "@/lib/axios";

describe('movies endpoints', () => {
	it('should print body', async () => {
		const response = await axiosInstance.post('/api/movie/939243', {
			rating: 5,
		})
	})
})