import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SearchBar from "../../components/common/searchbar"
import { showSuccessAlert, showSuccessUpdateAlert } from "../../utils/alerts"
import { API_BASE_URL } from "../../utils/constants"
import { useHandleExpiredToken } from "../auth/service"

const EditCommande = () => {
    const { id } = useParams()
    const [commande, setCommande] = useState({})
    const [detailsCommande, setDetailsCommande] = useState([])
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

    useEffect(() => {
        fetch(`${API_BASE_URL}/gest-stock/commandes/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setCommande(data)
                })
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })
    }, [])

    useEffect(() => {
        fetch(`${API_BASE_URL}/gest-stock/fournisseurs/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setFournisseurs(data.results)
                })
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })
    }, [])

    useEffect(() => {
        fetch(`${API_BASE_URL}/gest-stock/produits/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    const produits = data.results.filter((l) => l.fournisseur === commande.fournisseur)
                    setProduits(produits)
                })
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })
    }, [commande])

    useEffect(() => {
        fetch(`${API_BASE_URL}/gest-stock/detail-commandes/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    const cmds = data.results.filter((l) => l.commande === commande.id);
                    setDetailsCommande(cmds)
                    cmds.forEach((c) => {
                        setSelectedProduits((prevSelectedProduits) => {
                            const updatedSelectedProduits = Array.isArray(prevSelectedProduits) ? prevSelectedProduits : [];

                            if (!updatedSelectedProduits.includes(c.produit)) {
                                return [...updatedSelectedProduits, c.produit];
                            } else {
                                return updatedSelectedProduits;
                            }
                        });

                        setSelectedProduitData((prevData) => ({
                            ...prevData,
                            [c.produit]: c.qte_casier
                        }));
                    });
                });
            } else if (response.status === 401) {
                handleExpiredToken();
            }
        });
    }, [commande]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/gest-stock/types-casiers/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setTCasiers(data.results)
                })
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })
    }, [])

    const handleProduits = (e) => {
        setSelectedProduitData({
            ...selectedProduitData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmita = (e) => {
        e.preventDefault()
        fetch(`${API_BASE_URL}/gest-stock/commandes/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(commande)
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        }).then((data) => {
            for (let index = 0; index < selectedProduits.length; index++) {
                const element = selectedProduits[index];
                const produit = produits.find((p) => p.id === element)
                fetch(`${API_BASE_URL}/gest-stock/detail-commandes/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        commande: data.id,
                        produit: produit.id,
                        pu: produit.prix_achat_casier,
                        qte_casier: parseInt(selectedProduitData[produit.id]),
                    })
                }).then((response) => {
                    if (response.ok) {
                        if (index + 1 === selectedProduits.length) {
                            showSuccessAlert({
                                after: () => navigate(-1)
                            })
                        }
                    } else if (response.status === 401) {
                        handleExpiredToken()
                    }
                })
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

    const handleChange = (e) => {
        setCommande({
            ...commande,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API_BASE_URL}/gest-stock/commandes/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(commande)
        }).then((response) => {
            if (response.ok) {
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })

        // Supposons que API_BASE_URL est défini ailleurs
        const apiUrl = `${API_BASE_URL}/gest-stock/detail-commandes/`;

        // Cas 1 : Produit modifié ou toujours sélectionné
        selectedProduits.forEach(async (p) => {
            const existingDetail = detailsCommande.find((d) => d.produit === p);
            const qte = selectedProduitData[p]

            if (existingDetail) {
                try {
                    await fetch(`${apiUrl}${existingDetail.id}/`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            commande: id,
                            produit: p,
                            qte_casier: qte,
                        }),
                    });
                } catch (error) {
                    console.error(`Erreur lors de la mise à jour du produit ${p}:`, error);
                }

            } else {
                try {
                    await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            commande: id,
                            produit: p,
                            qte_casier: qte,
                        }),
                    });
                } catch (error) {
                    console.error(`Erreur lors de l'ajout du produit ${p}:`, error);
                }
            }
        });

        // Cas 3 : Produit supprimé
        detailsCommande.forEach(async (d) => {
            if (!selectedProduits.some((s) => s === d.produit)) {
                console.log('2');
                // Si le produit est dans detailsCommande mais pas dans selectedProduits, il doit être supprimé
                try {
                    const response = await fetch(`${apiUrl}${d.id}/`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`
                        },
                    });
                    if (response.ok) {
                        console.log('2');
                    } else if (response.status === 401) {
                        handleExpiredToken()
                    } else {
                        console.error('Network response was not ok.');
                    }
                } catch (error) {
                    console.error(`Erreur lors de la suppression du produit ${d.produit}:`, error);
                }
            }
        });

        showSuccessUpdateAlert({
            after: () => navigate(-1)
        })
    }

    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">Modifier un commande</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-muted">
                                <a href="/" className="text-muted text-hover-primary">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-500 w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-muted"><a href="/commande/liste" className="text-muted text-hover-primary">Commandes</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <form id="kt_ecommerce_edit_order_form" onSubmit={handleSubmit} className="form d-flex flex-column flex-lg-row" >
                        <div className="w-100 flex-lg-row-auto w-lg-300px mb-7 me-7 me-lg-10">
                            <div className="card card-flush py-4">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Commande</h2>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Reference</label>
                                        <input type="text" name="code" onChange={handleChange} className="form-control mb-2" value={commande.code} />
                                        <div className="text-muted fs-7">Saisir la référence du bon de commande</div>
                                    </div>
                                    <div className="mb-10" >
                                        <label className=" required form-label">Fournisseur</label>
                                        <div id="kt_ecommerce_add_product_options">
                                            <div className="form-group">
                                                <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                    <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                        <div className="w-100 w-md-200px">
                                                            <select className="form-select" name="fournisseur" data-placeholder="Sélectionner le fournisseur" value={commande.fournisseur}>
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
                                    </div>
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Date</label>
                                        <input type="date" name="date" className="form-control mb-2" onChange={handleChange} value={commande.date} />
                                        <div className="text-muted fs-7">Choisir la date de la commande</div>
                                    </div>
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Total</label>
                                        <input type="text" name="total" readOnly className="form-control mb-2" value={formData.total} />
                                        <div className="text-muted fs-7">Quantité totale commandé</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-lg-row-fluid gap-7 gap-lg-10">
                            <div className="card card-flush py-4">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Sélectionner les produits</h2>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="d-flex flex-column gap-10">
                                        <div>
                                            <label className="form-label">Ajouter les produits de cette commande</label>
                                            <div className="row row-cols-1 row-cols-xl-3 row-cols-md-2 border border-dashed rounded pt-3 pb-1 px-2 mb-5 mh-300px overflow-scroll" id="kt_ecommerce_edit_order_selected_products">
                                                {
                                                    selectedProduits.length === 0 ?
                                                        (
                                                            <span className="w-100 text-muted">Sélectionner les produits que vous voulez commander et mettez la quantité</span>
                                                        ) :
                                                        selectedProduits.map((id, index) => {
                                                            const produit = produits.find((p) => p.id === id)
                                                            const tCasier = tCasiers.find((t) => t.id === produit ? produit.type_casier : '')
                                                            const qte = selectedProduitData[id]
                                                            return (
                                                                <div key={index} className="col my-2" data-kt-ecommerce-edit-order-filter="product">
                                                                    <div className="d-flex align-items-center border border-dashed p-3 rounded bg-white">
                                                                        <div className="ms-5">
                                                                            <a className="text-gray-800 text-hover-primary fs-5 fw-bold">{produit?.nom + ` [Casier de ${tCasier ? tCasier.taille : ''}]`}</a>
                                                                            <div className="fw-semibold fs-7">Prix:
                                                                                <span data-kt-ecommerce-edit-order-filter="price">{produit?.prix_achat_casier}</span> FCFA</div>
                                                                            <div className="text-muted fs-7">Qte: {qte}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                }
                                            </div>
                                            <div className="fw-bold fs-4">Total :
                                                <span id="kt_ecommerce_edit_order_total_price">{prixTotal ? prixTotal : 0}</span> FCFA</div>
                                        </div>
                                        <div className="separator"></div>
                                        <SearchBar onSearchBarChange={setSearchInput} />
                                        <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_edit_order_product_table">
                                            <thead>
                                                <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                                                    <th className="w-25px pe-2"></th>
                                                    <th className="min-w-200px">Produits</th>
                                                    <th className="min-w-200px">Qte en stock </th>
                                                    <th className="min-w-75px text-end pe-5">Qte Commandé</th>
                                                </tr>
                                            </thead>
                                            <tbody className="fw-semibold text-gray-600">
                                                {
                                                    currentData.map((produit, index) => {
                                                        const tCasier = tCasiers.find((t) => t.id === produit.type_casier)
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                                        <input className="form-check-input" type="checkbox" checked={selectedProduits.includes(produit.id)}
                                                                            onChange={() => handleSelectedProduit(produit.id)} />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center" >
                                                                        <div className="ms-5">
                                                                            <p className="text-gray-800 fs-5 fw-bold">{produit.nom + ` [Casier de ${tCasier ? tCasier.taille : ''}]`}</p>
                                                                            <div className="fw-semibold fs-7">Prix:
                                                                                <span>{produit.prix_achat_casier}</span> FCFA</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center pe-5">
                                                                    {produit.qte_casier}
                                                                </td>
                                                                <td className="text-end pe-5">
                                                                    <input type="number" min={0} name={produit.id} className="form-control mb-2" onChange={handleProduits} value={selectedProduitData[`${produit.id}`] ?? 0} />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-flush py-4">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Transport</h2>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="d-flex flex-column gap-5 gap-md-7">
                                        <div className="d-flex flex-column flex-md-row gap-5">
                                            <div className="flex-row-fluid">
                                                <label className="required form-label">Type de transport</label>
                                                <select className="form-select" data-placeholder="Select an option" name="type_transport" onChange={handleChange} value={commande.type_transport}>
                                                    <option></option>
                                                    <option value="1">Charge fournisseur</option>
                                                    <option value="2">Charge personnel</option>
                                                    <option value="3">Autre</option>
                                                </select>
                                            </div>
                                            <div className="fv-row flex-row-fluid">
                                                <label className="required form-label">Frais du transport</label>
                                                <input className="form-control" name="frais_transport" value={commande.frais_transport} onChange={handleChange} placeholder="Frais de transport" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <a href="/commande/liste" id="kt_ecommerce_add_product_cancel" className="btn btn-light me-5">Retour</a>
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

export default EditCommande;