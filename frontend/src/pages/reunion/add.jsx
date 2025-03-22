import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/searchbar";
import { showSuccessAlert } from "../../utils/alerts";
import { API_BASE_URL } from "../../utils/constants";
import { useHandleExpiredToken } from "../auth/service";

const AddReunion = () => {
    const [formData, setFormData] = useState({})
    const [selectedProduits, setSelectedProduits] = useState([])
    const [selectedProduitData, setSelectedProduitData] = useState({})
    const [fournisseurs, setFournisseurs] = useState([])
    const [produits, setProduits] = useState([])
    const [tCasiers, setTCasiers] = useState([])
    const [prixTotal, setPrixTotal] = useState(0)

    const token = localStorage.getItem('token')

    const navigate = useNavigate()
    const handleExpiredToken = useHandleExpiredToken();

    //Variables pour gérer la pagination de la liste
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState(10)

    //Variable pour le champ de recherche
    const [filteredData, setFilteredData] = useState([])

    //Variable pour gérer le champ de recherche
    const [searchInput, setSearchInput] = useState("")

    // useEffect(() => {
    //     fetch(`${API_BASE_URL}/gest-stock/fournisseurs/`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         },
    //     }).then((response) => {
    //         if (response.ok) {
    //             response.json().then((data) => {
    //                 setFournisseurs(data.results)
    //             })
    //         } else if (response.status === 401) {
    //             handleExpiredToken()
    //         }
    //     })
    // }, [])

    // useEffect(() => {
    //     fetch(`${API_BASE_URL}/gest-stock/produits/`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         },
    //     }).then((response) => {
    //         if (response.ok) {
    //             response.json().then((data) => {
    //                 const produits = data.results.filter((l) => l.fournisseur === formData.fournisseur)
    //                 setProduits(produits)
    //             })
    //         } else if (response.status === 401) {
    //             handleExpiredToken()
    //         }
    //     })
    // }, [formData])

    // useEffect(() => {
    //     fetch(`${API_BASE_URL}/gest-stock/types-casiers/`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleProduits = (e) => {
        setSelectedProduitData({
            ...selectedProduitData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API_BASE_URL}/reunions/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            if (response.ok) {
                
                navigate(-1)
                
                return response.json()
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })
    }

    const handleSelectedProduit = (produitId) => {
        setSelectedProduits((prevSelectedProduits) => {
            if (prevSelectedProduits.includes(produitId)) {
                return prevSelectedProduits.filter(id => id !== produitId);
            } else {
                return [...prevSelectedProduits, produitId];
            }
        });
    };

    useEffect(() => {
        const total = selectedProduits.reduce((acc, produitId) => {
            const produit = produits.find(produit => produit.id === produitId);
            const qte = selectedProduitData[produitId]

            return acc + (parseInt(produit.prix_achat_casier) * parseInt(qte ? qte : 0));
        }, 0);

        const casiers = Object.values(selectedProduitData) ?? []
        setFormData({
            ...formData,
            total: casiers.reduce((acc, qte) => acc + parseInt(qte, 10), 0),
        })

        setPrixTotal(total)

    }, [selectedProduitData, selectedProduits])

    //Fonction pour gerer la recherche dans la liste de donnée
    useEffect(() => {
        if (!searchInput) {
            setFilteredData(produits);
            return;
        }

        const filtered = produits.filter(
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

    }, [produits, searchInput])

    // Calcul des données pour la page actuelle
    const lastDataIndex = currentPage * dataPerPage;
    const firstDataIndex = lastDataIndex - dataPerPage;
    const currentData = filteredData.slice(firstDataIndex, lastDataIndex);

    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">Ajouter une Réunion</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-muted">
                                <a href="/" className="text-muted text-hover-primary">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-500 w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-muted"><a href="/commande/liste" className="text-muted text-hover-primary">Réunion</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <form id="kt_ecommerce_edit_order_form" onSubmit={handleSubmit} className="form d-flex flex-column flex-lg-row" >
                        
                        <div className="d-flex flex-column flex-lg-row-fluid gap-7 gap-lg-10">
                            <div className="card card-flush py-4">
                                <div className="card-header">
                                    <div className="card-title">
                                        
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="d-flex flex-column">
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Nom</label>
                                        <input type="text" name="nom" className="form-control mb-2" onChange={handleChange} />
                                        <div className="text-muted fs-7">Saisir le nom de la réunion</div>
                                    </div>
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Lieu</label>
                                        <input type="text" name="lieu" className="form-control mb-2" onChange={handleChange} />
                                        <div className="text-muted fs-7">Saisir le lieu de la réunion</div>
                                    </div>
                                    {/* <div className="mb-10" >
                                        <label className=" required form-label">Fournisseur</label>
                                        <div id="kt_ecommerce_add_product_options">
                                            <div className="form-group">
                                                <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                    <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                        <div className="w-100 w-md-200px">
                                                            <select className="form-select" name="fournisseur" data-placeholder="Sélectionner le fournisseur" onChange={handleChange}>
                                                                <option></option>
                                                                {
                                                                    fournisseurs.map((f) => (
                                                                        <option key={f.id} value={f.id}>{f.nom}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="mb-10 fv-row">
                                        <label className="required form-label">Date</label>
                                        <input type="date" name="date" className="form-control mb-2" onChange={handleChange} />
                                        <div className="text-muted fs-7">Choisir la date de la réunion</div>
                                    </div> */}
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Description</label>
                                        <textarea type="text" name="description" className="form-control mb-2" onChange={handleChange}></textarea>
                                        <div className="text-muted fs-7">Saisir la description de la réunion</div>
                                    </div>
                                    
                                    </div>
                                </div>
                            </div>
                            
                            <div className="d-flex justify-content-end">
                                <a href="/reunion/liste" id="kt_ecommerce_add_product_cancel" className="btn btn-light me-5">Retour</a>
                                <button type="submit" id="kt_ecommerce_add_product_submit" className="btn btn-primary">
                                    <span className="indicator-label">Enregistrer</span>
                                    <span className="indicator-progress">Please wait...
                                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddReunion