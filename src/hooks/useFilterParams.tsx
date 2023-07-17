import {useLocation, useNavigate} from 'react-router-dom';

export const useFilterParams = () => {
    const navigate = useNavigate();
    const {search} = useLocation();
    const url = new URL(window.location.href);

    const setUrlParams = (searchValue: string, param: string) => {
        if (!searchValue && search.includes(param)) {
            url.searchParams.delete(param);
            navigate(`${url.pathname}${url.search}`, {replace: true});
            return;
        }

        if (!searchValue) {
            return;
        }

        if (search.includes(param)) {
            url.searchParams.set(param, searchValue);
            navigate(`${url.pathname}${url.search}`, {replace: true});
            return;
        }

        url.searchParams.append(param, searchValue);
        navigate(`${url.pathname}${url.search}`, {replace: true});
    };

    const getParam = (param: string) => {
        const queryParams = search.replace('?', '').split('&');

        const queryParamsToObject = queryParams.reduce((accumulator, queryParam) => {
            const [key, value] = queryParam.split('=');
            return {
                ...accumulator,
                [key]: value,
            };
        }, {});

        return queryParamsToObject[param] ?? '';
    };

    return {
        setUrlParams,
        getParam,
    };
};
