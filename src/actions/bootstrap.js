import { request } from '../core/helpers/Request';

export function bootstrap(success, error) {
    request(`/store/bootstrap`, {}, 'get', success, error);
};
