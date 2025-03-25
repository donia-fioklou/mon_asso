const FooterComponent = () => {
    return (
        <div id="kt_app_footer" className="app-footer">
            <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
                <div className="text-gray-900 order-2 order-md-1">
                    <span className="text-muted fw-semibold me-1">2024&copy;</span>
                    <a target="_blank" className="text-gray-800 text-hover-primary">Audrey</a>
                </div>
                <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                    <li className="menu-item">
                        <a href="https://wa.me/+22892474315" target="_blank" className="menu-link px-2">Support</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FooterComponent;