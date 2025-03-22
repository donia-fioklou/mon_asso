import { useResolvedPath } from "react-router-dom";

const SidebarComponent = () => {
    const pathname = useResolvedPath()

    const activateMenu = (menu) => {
        const menuConfig = {
            '/': ['/'],
            '/stock': ['/stock/liste', '/stock/operation'],
            '/produit': ['/produit/liste', '/produit/add', /^\/produit\/edit\/[0-9a-fA-F-]{36}$/],
            '/commande': ['/commande/liste', '/commande/add', /^\/commande\/edit\/[0-9a-fA-F-]{36}$/, /^\/commande\/detail\/[0-9a-fA-F-]{36}$/],
            '/vente': ['/vente/liste', '/vente/add', /^\/vente\/edit\/[0-9a-fA-F-]{36}$/, /^\/vente\/detail\/[0-9a-fA-F-]{36}$/],
            '/client': ['/client/liste', '/client/add', /^\/client\/edit\/[0-9a-fA-F-]{36}$/],
            '/livreur': ['/livreur/liste', '/livreur/add', /^\/livreur\/edit\/[0-9a-fA-F-]{36}$/],
            '/consignation': ['/consignation/liste', '/consignation/add', /^\/consignation\/edit\/[0-9a-fA-F-]{36}$/],
            '/defaut': ['/defaut/liste', '/defaut/add', /^\/defaut\/edit\/[0-9a-fA-F-]{36}$/],
            '/fournisseur': ['/fournisseur/liste', '/fournisseur/add', /^\/fournisseur\/edit\/[0-9a-fA-F-]{36}$/],
            '/parametre': ['/parametre/type_casier/liste', '/parametre/type_casier/add', /^\/parametre\/type_casier\/edit\/[0-9a-fA-F-]{36}$/],
        };

        for (const [key, paths] of Object.entries(menuConfig)) {
            for (const path of paths) {
                if (typeof path === 'string' && path === pathname.pathname && menu === key) {
                    return 'here show';
                } else if (path instanceof RegExp && path.test(pathname.pathname) && menu === key) {
                    return 'here show';
                }
            }
        }

        return '';
    };

    return (
        <div id="kt_app_sidebar" className="app-sidebar flex-column" data-kt-drawer="true" data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="225px" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
            <div className="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
                <a href="/">
                    <img alt="Logo" src="assets/media/logos/default-dark.svg" className="h-25px app-sidebar-logo-default" />
                    <img alt="Logo" src="assets/media/logos/default-small.svg" className="h-20px app-sidebar-logo-minimize" />
                </a>
            </div>
            <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
                <div id="kt_app_sidebar_menu_wrapper" className="app-sidebar-wrapper">
                    <div id="kt_app_sidebar_menu_scroll" className="scroll-y my-5 mx-3" data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer" data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-offset="5px" data-kt-scroll-save-state="true">
                        <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6" id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">
                            {/* <div data-kt-menu-trigger="click">
                                <a className={`menu-item ${activateMenu('/')}`} href="/">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-element-11 fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                                <span className="path4"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Dashboard</span>
                                    </span>
                                </a>
                            </div>
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <a className={`menu-item ${activateMenu('/produit')}`} href="/produit/liste">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-lots-shopping fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                                <span className="path4"></span>
                                                <span className="path5"></span>
                                                <span className="path6"></span>
                                                <span className="path7"></span>
                                                <span className="path8"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Produits</span>
                                    </span>
                                </a>
                            </div> */}
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <a className={`menu-item ${activateMenu('/commande')}`} href="/reunion/liste">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-delivery-2 fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                                <span className="path4"></span>
                                                <span className="path5"></span>
                                                <span className="path6"></span>
                                                <span className="path7"></span>
                                                <span className="path8"></span>
                                                <span className="path9"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Réunion</span>
                                    </span>
                                </a>
                            </div>
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <a className={`menu-item ${activateMenu('/vente')}`} href="/compte/rendu/liste">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-basket-ok fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                                <span className="path4"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Compte rendu</span>
                                    </span>
                                </a>
                            </div>
                            {/*
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <a className={`menu-item ${activateMenu('/stock')}`} href="/stock/liste">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-shop fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                                <span className="path4"></span>
                                                <span className="path5"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Stock</span>
                                    </span>
                                </a>
                            </div>
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <a className={`menu-item ${activateMenu('/consignation')}`} href="/consignation/liste">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-element-plus fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                                <span className="path4"></span>
                                                <span className="path5"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Consignations</span>
                                    </span>
                                </a>
                            </div>
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <a className={`menu-item ${activateMenu('/defaut')}`} href="/defaut/liste">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-shield-cross fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Defauts</span>
                                    </span>
                                </a>
                            </div>
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <a className={`menu-item ${activateMenu('/client')}`} href="/client/liste">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-people fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                                <span className="path4"></span>
                                                <span className="path5"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Clients</span>
                                    </span>
                                </a>
                            </div>
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <a className={`menu-item ${activateMenu('/livreur')}`} href="/livreur/liste">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-courier fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Livreurs</span>
                                    </span>
                                </a>
                            </div>
                            <div data-kt-menu-trigger="click" className="menu-item">
                                <a className={`menu-item ${activateMenu('/fournisseur')}`} href="/fournisseur/liste">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-truck fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                                <span className="path4"></span>
                                                <span className="path5"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Fournisseurs</span>
                                    </span>
                                </a>
                            </div>
                            <div className={`menu-item`} >
                                <a href="/parametre/type_casier/liste" className={`menu-item ${activateMenu('/parametre')}`}>
                                    <div className="menu-link">
                                        <span className="menu-bullet">
                                            <i className="ki-duotone ki-abstract-41 fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Type de casier</span>
                                    </div>
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarComponent;