import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/common/pagination";
import SearchBar from "../../components/common/searchbar";
import { showDeleteAlert } from "../../utils/alerts";
import { API_BASE_URL } from "../../utils/constants";
import { formatDate } from "../../utils/functions";
import { useHandleExpiredToken } from "../auth/service";

const CompteRenduListe = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')


    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [commandes, setCommandes] = useState([])
    const [clients, setClients] = useState([])

    const handleExpiredToken = useHandleExpiredToken();

    //Variables pour gérer la pagination de la liste
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState(10)

    //Variable pour le champ de recherche
    const [filteredData, setFilteredData] = useState([])

    //Variable pour gérer le champ de recherche
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/compte_rendus/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        //"Authorization": `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                    console.log('data',data);
                    setCommandes(data || []);
                    setLoading(false)
                } else if (response.status === 401) {
                    handleExpiredToken()
                } else {
                    console.error('Network response was not ok.');
                }
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };
        const fetchClients = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/gest-users/clients/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        //"Authorization": `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('data',data);
                    
                    setClients(data || []);
                } else if (response.status === 401) {
                    handleExpiredToken()
                } else {
                    console.error('Network response was not ok.');
                }
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchCommandes()
        fetchClients()
    }, [loading])
    console.log("commandes",commandes);
    console.log("Clients",clients);
    

    const goToDetails = (id) => {
        navigate(`/compte/rendu/detail/${id}`)
    }
    const goToEdit = (id) => {
        navigate(`/commande/edit/${id}`)
    }

    const handleDelete = (id) => {
        showDeleteAlert('Voulez vous supprimer cette commande?', async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/gest-stock/commandes/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    setLoading(true)
                } else if (response.status === 401) {
                    handleExpiredToken()
                } else {
                    console.error('Network response was not ok.');
                }
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        })
    }

    //Fonction pour gerer la recherche dans la liste de donnée
    useEffect(() => {
        if (!searchInput) {
            setFilteredData(commandes);
            return;
        }

        const filtered = commandes.filter(
            (element) =>
                Object.values(element).some(
                    (value) =>
                        value !== null && value !== undefined &&
                        value.toString().toLowerCase().includes(
                            searchInput.toLowerCase()
                        )
                )
        );

        setFilteredData(filtered);

    }, [commandes, searchInput])

    // Calcul des données pour la page actuelle
    const lastDataIndex = currentPage * dataPerPage;
    const firstDataIndex = lastDataIndex - dataPerPage;
    const currentData = filteredData.slice(firstDataIndex, lastDataIndex);

    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">Compte Rendu</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-muted">
                                <a href="/" className="text-muted text-hover-primary">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-500 w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-muted">Compte Rendu</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card card-flush">
                        <div className="card-header align-items-center py-5 gap-2 gap-md-5">
                            <div className="card-title">
                                <SearchBar onSearchBarChange={setSearchInput} />
                            </div>
                            <div className="card-toolbar flex-row-fluid justify-content-end gap-5">
                                <a href="/compte/rendu/add" className="btn btn-primary">Ajouter une Compte Rendu</a>
                            </div> 
                        </div>
                        <div className="card-body pt-0">
                            <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_sales_table">
                                <thead>
                                    <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                                        <th className="w-10px pe-2">
                                            <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                                                <input className="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_ecommerce_sales_table .form-check-input" value="1" />
                                            </div>
                                        </th>
                                        <th className="text-start">Titre</th>
                                        {/* <th className="min-w-175px">Lieu</th> */}
                                        <th className="text-end min-w-100px">Date</th>
                                        <th className="text-end min-w-100px">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="fw-semibold text-gray-600">
                                    {
                                        currentData.map((commande, index) => {
                                            const client = clients.find((f) => f.id === commande.client)
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                            <input className="form-check-input" type="checkbox" value="1" />
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="text-start ">
                                                        <span className="fw-bold">{commande.titre}</span>
                                                    </td>
                                                    {/* <td className="text-start ">
                                                        <span className="fw-bold">{commande.lieu}</span>
                                                    </td> */}
                                                    <td className="text-end pe-0">
                                                        <span className="fw-bold">{formatDate(commande.created_at)}</span>
                                                    </td>
                                                    <td className="text-end">
                                                        <div onClick={() => goToDetails(commande.id)} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                            <i className="ki-duotone ki-switch fs-2">
                                                                <span className="path1"></span>
                                                                <span className="path2"></span>
                                                            </i>
                                                        </div>
                                                        {/* <div onClick={() => goToEdit(commande.id)} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                            <i className="ki-duotone ki-pencil fs-2">
                                                                <span className="path1"></span>
                                                                <span className="path2"></span>
                                                            </i>
                                                        </div> */}
                                                        {/* <div onClick={() => handleDelete(commande.id)} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                                                            <i className="ki-duotone ki-trash fs-2">
                                                                <span className="path1"></span>
                                                                <span className="path2"></span>
                                                                <span className="path3"></span>
                                                                <span className="path4"></span>
                                                                <span className="path5"></span>
                                                            </i>
                                                        </div> */}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <Pagination
                                totalData={filteredData.length}
                                dataPerPage={dataPerPage}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                setDataPerPage={setDataPerPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompteRenduListe