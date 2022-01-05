
import {Link} from 'react-router-dom';

function Login(){


    return <div>
    
        <section className="vh-100 gradient">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white">
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-2">

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <div className="form-outline form-white mb-4">
                <input type="email" id="typeEmailX" className="form-control form-control-lg" />
                <label className="form-label" for="typeEmailX">Email</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" id="typePasswordX" className="form-control form-control-lg" />
                <label className="form-label" for="typePasswordX">Password</label>
              </div>

              <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

              <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

            </div>

            <div>
              <p className="mb-0">Don't have an account? <Link className="text-white-50 fw-bold" to='/rejestracja'> Rejestracja </Link></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>

}

export default Login;