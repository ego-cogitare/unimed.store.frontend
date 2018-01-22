import { request } from '../core/helpers/Request';

export function brands(params, success, error) {
    request(`/store/brands`, params, 'get', success, error);
};

export function products(params, success, error) {
    request(`/store/products`, params, 'get', success, error);
};

export function product({ id }, success, error) {
    request(`/store/product/${id}`, {}, 'get', success, error);
};

export function blog(params, success, error) {
    request(`/store/blog`, params, 'get', success, error);
};

export function tags(params, success, error) {
    request(`/store/tags`, params, 'get', success, error);
};

export function categories(params, success, error) {
    request(`/store/categories`, params, 'get', success, error);
};
