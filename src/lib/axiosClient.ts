// src/lib/axiosClient.ts
import axios from 'axios'
import { successToast, errorToast, loadingToast } from '@lib/helpers/toast';

const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.tycpicode.com/',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosClient.interceptors.request.use(
	(config) => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('accessToken')
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
		}
		return config
	},
	(error) => {
		errorToast('Lỗi cấu hình request')
		return Promise.reject(error)
	}
)

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			const status = error.response.status
			const message =
				error.response.data?.message || `Lỗi server (${status})`

			errorToast(`${message}`)
			// Optional: redirect on 401
			if (status === 401) {
				errorToast('Không nhận được phản hồi từ server, vui lòng thử lại sau')
			}
		} else if (error.request) {
			errorToast('Không nhận được phản hồi từ server, vui lòng thử lại sau')
		} else {
			errorToast('Có lỗi xảy ra khi gửi request')
		}

		return Promise.reject(error)
	}
)

export default axiosClient
