import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_BASE_URL } from "../../utils/constants"
import { formatDate, formatTextWithBreaks } from "../../utils/functions"
import { useHandleExpiredToken } from "../auth/service"

const DetailCompteRendu = () => {
    const { id } = useParams()
    const token = localStorage.getItem('token')

    const [commande, setCommande] = useState({})
    const [clients, setClients] = useState([])
    const [produits, setProduits] = useState([])
    const [detailCommande, setDetailCommande] = useState([])
    const [tCasiers, setTCasiers] = useState([])
    const [statut, setStatut] = useState();

    const navigate = useNavigate()
    const handleExpiredToken = useHandleExpiredToken();

    console.log(detailCommande);

    useEffect(() => {
        fetch(`${API_BASE_URL}/compte_rendus/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setCommande(data)
                    setStatut(data.statut);
                })
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })
    }, [])


    const UpdateCommande = async (newStatut) => {
        try {
            const response = await fetch(`${API_BASE_URL}/build-fast-app/commandes/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "statut": newStatut,
                    "client": commande.client
                })
            });

            if (response.ok) {
                console.log('Statut mis à jour avec succès');
            } else if (response.status === 401) {
                console.log('Non autorisé');
            } else {
                console.log('Erreur lors de la mise à jour du statut');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    const handleStatutChange = (event) => {
        const newStatut = parseInt(event.target.value, 10);
        setStatut(newStatut);
        UpdateCommande(newStatut); // Appeler la mise à jour après le changement de statut
    };

    useEffect(() => {
        fetch(`${API_BASE_URL}/reunions/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setClients(data)
                })
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })
    }, [])

    useEffect(() => {
        fetch(`${API_BASE_URL}/build-fast-app/produits/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setProduits(data)
                })
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })
    }, [])

    useEffect(() => {
        fetch(`${API_BASE_URL}/build-fast-app/lignes_commande/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setDetailCommande(data)
                })
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })
    }, [])
    console.log('detailCommande',detailCommande);

    
    
    // useEffect(() => {
    //     fetch(`${API_BASE_URL}/gest-stock/types-casiers/`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             //"Authorization": `Bearer ${token}`
    //         },
    //     }).then((response) => {
    //         if (response.ok) {
    //             response.json().then((data) => {
    //                 setTCasiers(data.results)
    //             })
    //         } else if (response.status === 401) {
    //             handleExpiredToken()
    //         }
    //     })
    // }, [])

    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">Détails de compte rendu</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-muted">
                                <a href="/" className="text-muted text-hover-primary">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-500 w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-muted"><a href="/commande/liste" className="text-muted text-hover-primary">compte rendu</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="d-flex flex-column flex-xl-row">
                        
                        <div className="flex-lg-row-fluid ms-lg-15">
                            {/* <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8">
                                <li className="nav-item">
                                    <a className="nav-link text-active-primary pb-4 active" data-bs-toggle="tab" href="#kt_ecommerce_customer_overview">Général</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab" href="#kt_ecommerce_customer_general">Transport</a>
                                </li>
                            </ul> */}
                            
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="kt_ecommerce_customer_overview" role="tabpanel">
                                    <div className="card pt-4 mb-6 mb-xl-9">
                                        <div className="card-header border-0">
                                            <div className="card-title">
                                                <h2>Détails Compte Rendu</h2>
                                            </div>
                                        </div>
                                        <div className="card-body pt-0 pb-5">
                                        <div className="fw-bold mt-5">Titre</div>
                                        <div className="text-gray-600">{commande.titre}</div>
                                        <div className="fw-bold mt-5">Réunion</div>
                                        <div className="text-gray-600">
                                            {
                                                (() => {
                                                    const client = clients.find((f) => f.id === commande.id);
                                                    return (
                                                        < a href="#" className="text-gray-600 text-hover-primary" > {client ? client.nom : ""}</a>
                                                    );
                                                })()
                                            }
                                        </div>
                                        <div className="fw-bold mt-5">Date</div>
                                        <div className="text-gray-600">{formatDate(commande.created_at)}</div>
                                        <div className="fw-bold mt-5">Description</div>
                                        <div className="text-gray-600">{formatTextWithBreaks(commande.description||"")}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailCompteRendu