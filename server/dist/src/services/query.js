"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
function getPagination({ page = constants_1.DEFAULT_PAGE_NUMBER, limit = constants_1.DEFAULT_PAGE_LIMIT, }) {
    const pageNumber = Math.abs(Number(page));
    const limitNumber = Math.abs(Number(limit));
    const skippedPerPage = (pageNumber - 1) * limitNumber;
    return { skippedPerPage, limitNumber };
}
exports.default = { getPagination };
