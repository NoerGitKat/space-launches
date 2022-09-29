import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "../../constants";

function getPagination({
    page = DEFAULT_PAGE_NUMBER,
    limit = DEFAULT_PAGE_LIMIT,
}: {
    page: string | number;
    limit: string | number;
}) {
    const pageNumber = Math.abs(Number(page));
    const limitNumber = Math.abs(Number(limit));
    const skippedPerPage = (pageNumber - 1) * limitNumber;

    return { skippedPerPage, limitNumber };
}

export default { getPagination };
