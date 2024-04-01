import React from 'react';

export const Footer = () => {
  return (
    <>
  <div className="container p-0 m-0" style={{width:'100%',maxWidth:'2000px'}}>
    <footer
      className="text-center text-white"
      style={{ backgroundColor: "#070F2B" }}
    >
      <div className="container">
        <section className="mt-5">
          <div className="row text-center d-flex justify-content-center pt-5">
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <a href="#!" className="text-white" style={{textDecoration:'none'}}>
                  About us
                </a>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <a href="#!" className="text-white" style={{textDecoration:'none'}}>
                  Products
                </a>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <a href="#!" className="text-white" style={{textDecoration:'none'}}>
                  Help
                </a>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <a href="#!" className="text-white" style={{textDecoration:'none'}}>
                  Contact
                </a>
              </h6>
            </div>
          </div>
        </section>
        <hr className="my-5" />
        <section className="mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <p>
              Education Point Prayagraj, Shaping Futures At Education Point, we go beyond textbooks. Our passionate faculty and modern facilities create an environment where students thrive. As the sun sets over Prayagraj, our students carry knowledge and values that light their paths for a lifetime. Join us a place where dreams take flight.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2024 Copyright: Education Point
      </div>
    </footer>
  </div>
</>

  );
};