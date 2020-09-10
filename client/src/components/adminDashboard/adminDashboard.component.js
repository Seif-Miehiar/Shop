import React, { useState, Fragment, useEffect } from "react";
import { createProduct } from "../../api/product.api"
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from "../../helpers/message.helper";
import { showLoading } from "../../helpers/loading.helper"

const AdminDashboard = () => {

  const [catagories, setCatagories] = useState(null);
  const [catagory, setCatagory] = useState('');
  const [product, setProduct] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(''); 
  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDescription: "",
    productPrice: "",
    productCatagory: ""
  })

  const {
    productImage,
    productName,
    productDescription,
    productPrice,
    productCatagory
  } = productData

  // using effects.
  useEffect(() => {
    loadCatagories()
  }, [loading])

  const loadCatagories = async () => {
    await getCatagories()
      .then((response) => {
        setCatagories(response.data.catagories);
        // console.log(catagories)
      })
      .catch((err) => {
        console.log("error in reading catagories:",err);
        
      })
  }



  // event handlers

  const handleMessages = (event) => {
    setErrorMsg('');
    setSuccessMsg('')

  };

  const handleCatagoryChange = (event) => {
    setCatagory(event.target.value);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleCatagorySubmit = (event) => {
    event.preventDefault();

    if (isEmpty(catagory)) {
      setErrorMsg('Please enter a catagory')
    } else {
      const data = { catagory };
      
      setLoading(true);
      createCatagory(data)
        .then((response) => {
          setLoading(false);
          setSuccessMsg(response.data.successMessage);
          setCatagory('')
        })
        .catch((err) => {
          setLoading(false);
          setErrorMsg(err.response.data.errorMessage);
        })
    }
  };

  const handleProductImage = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.files[0]
    });
  };

  const handleProductChange = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value
    });
  };

  const handleProductSubmit = (event) => {
    event.preventDefault();

    // console.log(productImage)
    if (productImage === null) {
      setErrorMsg("please Select an image");
    } else if (isEmpty(productName) || isEmpty(productDescription) || isEmpty(productPrice)) {
      setErrorMsg("All fields are required");
    } else if ( isEmpty(productCatagory) ) {
      setErrorMsg("Please select a catagory");
    } else {
      let formData = new FormData();

      // formData.append("product", { product })
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("productCatagory", productCatagory);
      formData.append("productPrice", productPrice);

      setLoading(true);
      console.log(formData)
      createProduct(formData)
        .then((response) => {
          setLoading(false);
          setSuccessMsg(response.formData.successMessage);
          setProduct('')
        })
        .catch((err) => {
          console.log(err.response.data)
          setLoading(false);
          setErrorMsg(err.response.data.errorMessage);
        })
    }

    //   createProduct(formData)
    //     .then((response) => {
    //       console.log("server response: ", response)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }
  }

  // views.
  const showHeader = () => (
    <div className="bg-dark text-white py-4">
      <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>
            <i className="fas fa-home"> Dashboard</i>
          </h1>
        </div>
      </div>
      </div>
    </div>
  );

  const showActionBtns = () => (
    <div className="bg-light my-2">
      <div className="container">
        <div className="row pb-3">
          <div className="col-md-4 my-1">
            <button className="btn btn-outline-info btn-block" data-toggle="modal" data-target="#addCatagoryModal">
              <i className="fas fa-plus"> Add catagory</i>
            </button>
          </div>

          <div className="col-md-4 my-1">
            <button className="btn btn-outline-warning btn-block" data-toggle="modal" data-target="#addProductModal">
              <i className="fas fa-plus"> Add product</i>
            </button>
          </div>

          <div className="col-md-4 my-1">
            <button className="btn btn-outline-success btn-block">
              <i className="fas fa-money-check-alt"> view </i>
            </button>
          </div>

        </div>
      </div>
    </div>
  )


  const showCatagoryModel = () => (
    <div id="addCatagoryModal" className="modal" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
        <form onSubmit={handleCatagorySubmit}>
          <div className="modal-header bg-info text-white"> 
            <h5 className="modal-title">Add Catagory</h5>
              <button className="close" data-dismiss="modal">
                <span><i className="fas fa-times"></i></span>
              </button>
          </div>
          <div className="modal-body my-2">
            {errorMsg && showErrorMsg(errorMsg)}
            {successMsg && showSuccessMsg(successMsg)}
            
            {
              loading ? (
                <div className="text-center"> {showLoading(loading)} </div>
              ) : (
                <Fragment>
                <label className="text-secondary"> Catagory </label>
                <input className="form-control" type="text" onChange={handleCatagoryChange} name="catagory" value={catagory} />
                </Fragment>
              )
            }
              
          </div>
          <div className="modal-footer">
            <button data-dismiss="modal" className="btn btn-secondary"> close </button>
            <button className="btn btn-info" type="submit"> submit </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )


  // show product 
  const showProductModel = () => (
    <div id="addProductModal" className="modal" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
        <form encType="multipart/form-data" onSubmit={handleProductSubmit}>
          <div className="modal-header bg-warning text-white"> 
            <h5 className="modal-title">Add Product</h5>
              <button className="close" data-dismiss="modal">
                <span><i className="fas fa-times"></i></span>
              </button>
          </div>
          <div className="modal-body my-2">
            {errorMsg && showErrorMsg(errorMsg)}
            {successMsg && showSuccessMsg(successMsg)}
            
            {
              loading ? (
                <div className="text-center"> {showLoading(loading)} </div>
              ) : (
                <Fragment>
                  <div className="custom-file mb-2">
                    <input type="file" className="custom-file-input" name="productImage" onChange={handleProductImage} />
                    <label className="custom-file-label"> choose file</label>
                  </div>
                  <div className="form-group">
                    <label className="text-secondary"> Name</label>
                    <input className="form-control" type="text" name="productName" onChange={handleProductChange}/>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label className="text-secondary">
                        Catagory
                      </label>
                      <select className="custom-select mr-sm-2" name="productCatagory" onChange={handleProductChange}> choose one
                        <option value="">choose one...</option>
                        {catagories && catagories.map(oneCatagory => (
                          <option key={oneCatagory._id} value={oneCatagory._id}>
                            {oneCatagory.catagory}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="text-secondary"> Description</label>
                    <textarea className="form-control" rows="3" name="productDescription" onChange={handleProductChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label className="text-secondary"> Price</label>
                    <input type="text" className="form-control" name="productPrice" onChange={handleProductChange} />
                  </div>
                </Fragment>
              )
            }
              
          </div>
          <div className="modal-footer">
            <button data-dismiss="modal" className="btn btn-secondary"> close </button>
            <button className="btn btn-warning text-white" type="submit" > submit </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )

  // render.
  return (
    <section>
      {showHeader()}
      {showActionBtns()}
      {showCatagoryModel()}
      {showProductModel()}
    </section>
  )
}

export default AdminDashboard;