const MAX_PAGES_DISPLAYED = 3;

const Pagination = ({ totalData, dataPerPage, setCurrentPage, currentPage, setDataPerPage }) => {
    let totalPages = [];

    //Récupération de toute les pages nécessaire dans la pagination
    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        totalPages.push(i)
    }

    //Fonction pour calculer les pages à afficher dans la pagination
    const calculateDisplayedPages = () => {
        if (totalPages <= MAX_PAGES_DISPLAYED) {
            return Array.from({ length: totalPages.length }, (_, i) => i + 1);
        }

        const startPage = Math.max(currentPage - 2, 1);
        const endPage = Math.min(currentPage + 2, totalPages.length);

        let pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

        // Ajoutez les pages avant et après les pages actuelles
        if (startPage > 1) {
            pages = [1, '...', ...pages];
        }
        if (endPage < totalPages.length) {
            pages = [...pages, '...', totalPages.length];
        }

        return pages;
    };

    //Capture du clic sur une page dans la pagination
    const handlePageClick = (page) => {
        if (page !== currentPage && page !== '...') {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            {
                <div className="row">
                    <div className="col-sm-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start">
                        <div className="dataTables_length" id="kt_ecommerce_report_sales_table_length">
                            <label>
                                <select name="kt_ecommerce_report_sales_table_length" aria-controls="kt_ecommerce_report_sales_table" className="form-select form-select-sm form-select-solid" defaultValue={dataPerPage} onChange={(e) => setDataPerPage(parseInt(e.target.value, 10))}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-9 d-flex align-items-center justify-content-center justify-content-md-end">
                        <div className="dataTables_paginate paging_simple_numbers" id="kt_ecommerce_report_sales_table_paginate">
                            <ul className="pagination">
                                <li className={`paginate_button page-item previous ${currentPage === 1 ? 'disabled' : ''}`} id="kt_ecommerce_report_sales_table_previous"><a onClick={() => handlePageClick(currentPage - 1)} aria-controls="kt_ecommerce_report_sales_table" data-dt-idx="0" tabIndex="0" className="page-link"><i className="previous"></i></a></li>
                                {
                                    calculateDisplayedPages().map((page, index) => {
                                        return (
                                            <li className={`paginate_button page_item ${page == currentPage ? "active" : ''} me-2 borderRadius`} style={{ borderRadius: '5px' }} key={index}>
                                                <a aria-controls="kt_ecommerce_report_sales_table" data-dt-idx="1" tabIndex="0" className="page-link" onClick={() => setCurrentPage(page)}>
                                                    {page}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                                <li className={`paginate_button page-item next ${currentPage === totalPages.length ? 'disabled' : ''}`} id="kt_ecommerce_report_sales_table_next"><a onClick={() => handlePageClick(currentPage + 1)} aria-controls="kt_ecommerce_report_sales_table" data-dt-idx="6" tabIndex="0" className="page-link"><i className="next"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Pagination;