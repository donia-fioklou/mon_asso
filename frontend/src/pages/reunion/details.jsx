import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_BASE_URL } from "../../utils/constants"
import { formatDate } from "../../utils/functions"
import { useHandleExpiredToken } from "../auth/service"

const DetailCommande = () => {
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
        fetch(`${API_BASE_URL}/build-fast-app/commandes/${id}/`, {
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
        fetch(`${API_BASE_URL}/gest-users/clients/`, {
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
                        <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">Détails de commande</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-muted">
                                <a href="/" className="text-muted text-hover-primary">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-500 w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-muted"><a href="/commande/liste" className="text-muted text-hover-primary">Commande</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="d-flex flex-column flex-xl-row">
                        <div className="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
                            <div className="card mb-5 mb-xl-8">
                                <div className="card-body pt-15">
                                    <div className="d-flex flex-stack fs-4 py-3">
                                        <div className="fw-bold">Details</div>
                                    </div>
                                    <div className="separator separator-dashed my-3"></div>
                                    <div className="pb-5 fs-6">
                                        <div className="fw-bold mt-5"></div>
                                        {/* <div className="text-gray-600">{commande.code}</div> */}
                                        <div className="fw-bold mt-5">Clients</div>
                                        <div className="text-gray-600">
                                            {
                                                (() => {
                                                    const client = clients.find((f) => f.id === commande.client);
                                                    return (
                                                        < a href="#" className="text-gray-600 text-hover-primary" > {client ? client.nom : ""}</a>
                                                    );
                                                })()
                                            }
                                        </div>
                                        <div className="fw-bold mt-5">Date</div>
                                        <div className="text-gray-600">{formatDate(commande.date_commande)}</div>
                                        <div className="fw-bold mt-5">Statut</div>
                                        <div className="text-gray-600">{statut==0?"Non Traiter":statut==1?"En traitement":statut==2?"En livraison":""}</div>
                                        <div className="fw-bold mt-5">Changer statut</div>
                                        <div className="w-100 mw-150px">
                                            <select className="form-select form-select-solid" data-control="select2" data-hide-search="true" value={statut} onChange={handleStatutChange} data-placeholder="Status" data-kt-ecommerce-order-filter="status">
                                                <option value="0">Non Traiter</option>
                                                <option value="1">En traitement</option>
                                                <option value="2">En livraison</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                <h2>Détails commande</h2>
                                            </div>
                                        </div>
                                        <div className="card-body pt-0 pb-5">
                                            <table className="table align-middle table-row-dashed gy-5" id="kt_table_customers_payment">
                                                <thead className="border-bottom border-gray-200 fs-7 fw-bold">
                                                    <tr className="text-start text-muted text-uppercase gs-0">
                                                        <th className="min-w-100px">Produit</th>
                                                        <th className="min-w-100px">Quantité</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="fs-6 fw-semibold text-gray-600">
                                                    {
                                                        detailCommande.filter((d) => d.commande === commande.id).map((d) => {
                                                            const produit = produits.find((p) => p.id === d.produit)
                                                            // const tCasier = tCasiers.find((t) => t.id === produit.type_casier)
                                                            return (
                                                                <tr key={d.id}>
                                                                    <td>{produit? produit.nom :"" }</td>
                                                                    <td>{d.quantite_commandee}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
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

export default DetailCommande