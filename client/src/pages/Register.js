import {Link} from 'react-router-dom';

function Register(){


    return <div>

<section className="vh-100">
  <div className="mask d-flex align-items-center h-100">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white">
            <div className="card-body p-5 text-center">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form>

                <div className="form-outline mb-3">
                  <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                </div>

                <div className="form-outline mb-3">
                  <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                </div>

                <div className="form-outline mb-3">
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form3Example4cg">Password</label>
                </div>

                <div className="form-outline mb-3">
                  <input type="password" id="form3Example4cdg" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3cg"
                  />
                   <label className="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" className="text-white"><u>Terms of service</u></a>
                  </label> 
                </div>

                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-outline-light btn-lg px-5">Register</button>
                </div>

                <p className="mt-5 mb-0">Have already an account? <Link className="text-white-50 fw-bold" to='/login'> Zaloguj się </Link></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>

}

export default Register;