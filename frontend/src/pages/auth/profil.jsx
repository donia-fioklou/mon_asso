import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/constants";
import { useHandleExpiredToken } from "./service";

const ProfilPage = () => {
    const [formData, setFormData] = useState({})
    const [ok, setOk] = useState(false)

    const token = localStorage.getItem('token')

    const navigate = useNavigate()
    const handleExpiredToken = useHandleExpiredToken();

    useEffect(() => {
        if (formData.newpass === formData.confirm) {
            setOk(true)
        } else {
            setOk(false)
        }
    }, [formData])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API_BASE_URL}/gest-users/change-password/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 401) {
                handleExpiredToken()
            }
        })
    }
    return (
        <>
            <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" class="app-container container-xxl d-flex flex-stack">
                    <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 class="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">Changement de mot de passe</h1>
                        <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li class="breadcrumb-item text-muted">
                                <a href="/" class="text-muted text-hover-primary">Dashboard</a>
                            </li>
                            <li class="breadcrumb-item">
                                <span class="bullet bg-gray-500 w-5px h-2px"></span>
                            </li>
                            <li class="breadcrumb-item text-muted">Profil</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" class="app-content flex-column-fluid">
                <div id="kt_app_content_container" class="app-container container-xxl">
                    <div class="card mb-5 mb-xl-10">
                        <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                            <div class="card-title m-0">
                                <h3 class="fw-bold m-0">Profil</h3>
                            </div>
                        </div>
                        <div id="kt_account_settings_profile_details" class="collapse show">
                            <form id="kt_account_profile_details_form" class="form" onSubmit={handleSubmit} onReset={() => { navigate(-1) }} >
                                <div class="card-body border-top p-9">
                                    <div class="row mb-6">
                                        <label class="col-lg-4 col-form-label required fw-semibold fs-6">Ancien mot de passe</label>
                                        <div class="col-lg-8 fv-row">
                                            <input type="text" name="oldpass" class="form-control form-control-lg form-control-solid" placeholder="Ancien mot de passe" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div class="row mb-6">
                                        <label class="col-lg-4 col-form-label fw-semibold fs-6">
                                            <span class="required">Nouveau mot de passe</span>
                                        </label>
                                        <div class="col-lg-8 fv-row">
                                            <input type="tel" name="newpass" class="form-control form-control-lg form-control-solid" placeholder="Nouveau mot de passe" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div class="row mb-6">
                                        <label class="col-lg-4 col-form-label fw-semibold fs-6">Confirmez le mot de passe</label>
                                        <div class="col-lg-8 fv-row">
                                            <input type="text" name="confirm" class="form-control form-control-lg form-control-solid" placeholder="Confirmez le mot de passe" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer d-flex justify-content-end py-6 px-9">
                                    <button type="reset" class="btn btn-light btn-active-light-primary me-2">Annuler</button>
                                    <button type="submit" class="btn btn-primary" id="kt_account_profile_details_submit" disabled={!ok}>Enregistrer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilPage;