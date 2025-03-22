import FooterComponent from "./Footer"
import HeaderComponent from "./Header"
import SidebarComponent from "./SideBar"

export const WrapperComponent = ({ children }) => {
    return (
        <div id="kt_app_body" data-kt-app-layout="dark-sidebar" data-kt-app-header-fixed="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" data-kt-app-toolbar-enabled="true" className="app-default">
            <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
                <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                    <HeaderComponent />
                    <MainWrapper>
                        <SidebarComponent />
                        <BodyWrapper>
                            <ContentWrapper>
                                {children}
                            </ContentWrapper>
                            <FooterComponent />
                        </BodyWrapper>
                    </MainWrapper>
                </div>
            </div>
        </div>
    )
}

export const MainWrapper = ({ children }) => {
    return (
        <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
            {children}
        </div>
    )
}

export const BodyWrapper = ({ children }) => {
    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            {children}
        </div>
    )
}

export const ContentWrapper = ({ children }) => {
    return (
        <div className="d-flex flex-column flex-column-fluid">
            {children}
        </div>
    )
}