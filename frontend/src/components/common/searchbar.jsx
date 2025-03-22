const SearchBar = ({ onSearchBarChange }) => {

    return (
        <>
            <div className="d-flex align-items-center position-relative my-1">
                <i className="ki-duotone ki-magnifier fs-3 position-absolute ms-4">
                    <span className="path1"></span>
                    <span className="path2"></span>
                </i>
                <input type="text" data-kt-ecommerce-order-filter="search" className="form-control form-control-solid w-250px ps-12" placeholder="Recherche..." onChange={(e) => onSearchBarChange(e.target.value)} />
            </div>
        </>
    )
}

export default SearchBar;