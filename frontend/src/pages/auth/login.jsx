import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { API_BASE_URL } from "../../utils/constants";

const LoginPage = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        document.body.style.margin = 0;
        document.body.style.height = '100vh';
        document.body.style.display = 'flex';
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems = 'center';
        document.body.style.backgroundImage = "url('assets/media/auth/bg10.jpeg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';

        return () => {
            document.body.style.margin = '';
            document.body.style.height = '';
            document.body.style.display = '';
            document.body.style.justifyContent = '';
            document.body.style.alignItems = '';
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundAttachment = '';
        };
    }, []);

    const loginAction = (e) => {
        e.preventDefault()
        try {
            fetch(`${API_BASE_URL}/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        dispatch({ type: "LOGIN", payload: data.access });
                        localStorage.setItem('refresh', data.refresh);
                        navigate('/reunion/liste')
                    })
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="d-flex flex-column flex-root" id="kt_app_root" >
            <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                <div className="d-flex flex-lg-row-fluid">
                    <div className="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
                        <img className="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20" src="assets/media/auth/agency.png" alt="" />
                        <img className="theme-dark-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20" src="assets/media/auth/agency-dark.png" alt="" />
                        <h1 className="text-gray-800 fs-2qx fw-bold text-center mb-7">Fast, Efficient and Productive</h1>
                        <div className="text-gray-600 fs-base text-center fw-semibold">In this kind of post,
                            <a href="" className="opacity-75-hover text-primary me-1">the blogger</a>introduces a person they’ve interviewed
                            <br />and provides some background information about
                            <a href="" className="opacity-75-hover text-primary me-1"> the interviewee</a>and their
                            <br />work following this is a transcript of the interview.</div>
                    </div>
                </div>
                <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12">
                    <div className="bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-10">
                        <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px">
                            <div className="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
                                <form className="form w-100" onSubmit={loginAction} id="kt_sign_in_form" data-kt-redirect-url="" action="#">
                                    <div className="text-center mb-11">
                                        <h1 className="text-gray-900 fw-bolder mb-3">Se connecter</h1>
                                    </div>
                                    <div className="fv-row mb-8">
                                        <input type="text" placeholder="Nom d'utilisateur" name="username" autoComplete="off" className="form-control bg-transparent" onChange={handleChange} />
                                    </div>
                                    <div className="fv-row mb-3">
                                        <input type="password" placeholder="Mot de passe" name="password" autoComplete="off" className="form-control bg-transparent" onChange={handleChange} />
                                    </div>
                                    <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                                        <div></div>
                                    </div>
                                    <div className="d-grid mb-10">
                                        <button type="submit" id="kt_sign_in_submit" className="btn btn-primary">
                                            <span className="indicator-label">Se connecter</span>
                                            <span className="indicator-progress">Please wait...
                                                <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage