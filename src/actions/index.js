import { request } from '../core/helpers/Request';

export function brands(params, success, error) {
    request(`/store/brands`, params, 'get', success, error);
};

export function products(params, success, error) {
    request(`/store/products`, params, 'get', success, error);
};
