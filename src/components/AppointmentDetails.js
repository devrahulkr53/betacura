import React, { Component } from 'react'
import { useForm } from "react-hook-form";

export default function AppointmentDetails(props){
 
  const { values, setValues, handleStep, family, setFamily } = props
  const { register, getValues, handleSubmit, watch, errors } = useForm();
  
  
  const onSubmit = (data) => {
    const address1 = data.street1 + " " + data.locality1 + " " + data.landmark1 + " " + data.city1 + " " + data.state1;
    const address2 = data.street2 + " " + data.locality2 + " " + data.landmark2 + " " + data.city2 + " " + data.state2;
    const date1 = data.date1 + " " + data.time1; 
    const date2 = data.date2 + " " + data.time2; 
    const date3 = data.date3 + " " + data.time3; 
    const date4 = data.date4 + " " + data.time4; 
    const apmt1 = {address:address1,date1:date1,date2:date2}
    const apmt2 = {address:address2,date1:date3,date2:date4}  
    setValues({...values,appointmentDetails:family?[apmt1,apmt2]:[apmt1]})
    handleStep();
  }
 
  return (
    <div className="container-fluid p-4 bg-white border shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {family?<>
          <div className="col-md-12">
            <div className="py-2 text-dark font-medium">Address for {values.employeeDetails[0]?.name} *</div> 
          </div></>:<></>}

          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">State *</div>
            <input type="text" name="state1" ref={register({required:true})} className="form-control" placeholder="Enter your State" />
            {errors.state1?.type==="required" && <small className="text-danger">State is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">City *</div>
            <select name="city1" ref={register({required:true})} className="form-select">
              <option value="">- Select -</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi & NCR">Delhi & NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hydrabad">Hydrabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Ahemdabad">Ahemdabad</option>
            </select>
            {errors.city1?.type==="required" && <small className="text-danger">City is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">Locality*</div>
            <input type="text" name="locality1" ref={register({required:true})} className="form-control" placeholder="Enter your locality" />
            {errors.locality1?.type==="required" && <small className="text-danger">Locality is required</small>}
          </div>
          <div className="col-md-4 my-1"> 
            <div className="py-2 text-dark font-medium">Street Address*</div>
            <input type="text" name="street1" ref={register({required:true})} className="form-control" placeholder="Street Address" />
            {errors.street1?.type==="required" && <small className="text-danger">Street Address is required</small>}
          </div>
          <div className="col-md-4 my-1"> 
            <div className="py-2 text-dark font-medium">Landmark*</div>
            <input type="text" name="landmark1" ref={register({required:true})} className="form-control" placeholder="Landmark" />
            {errors.landmark1?.type==="required" && <small className="text-danger">Landmark is required</small>}
          </div>
          
          <div className="col-md-12">
            <div className="py-2 text-dark font-medium">Select An Appointment*</div> 
          </div>
          <div className="col-md-12">
            <div className="py-2">Prefered slot 1</div>
          </div>
          <div className="col-md-4 my-1"> 
            <input type="date" name="date1" ref={register({required:true})} className="form-control" />
            {errors.date1?.type==="required" && <small className="text-danger">Date is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <input type="time" name="time1" ref={register({required:true})} className="form-control" />
            {errors.time1?.type==="required" && <small className="text-danger">Time is required</small>}
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-12">
            <div className="py-2">Prefered slot 2</div>
          </div>
          <div className="col-md-4 my-1">  
            <input type="date" name="date2" ref={register({required:true})} className="form-control" />
            {errors.date2?.type==="required" && <small className="text-danger">Date is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <input type="time" name="time2" ref={register({required:true})} className="form-control" />
            {errors.time2?.type==="required" && <small className="text-danger">Time is required</small>}
          </div>

            {/* If Family Exists */}
          
          {family?<>

          <div className="col-md-12">
            <div className="py-2 text-dark font-medium">Address for {values.employeeDetails[1]?.name} *</div> 
          </div>
          
          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">State *</div>
            <input type="text" name="state2" ref={register({required:true})} className="form-control" placeholder="Enter your State" />
            {errors.state2?.type==="required" && <small className="text-danger">State is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">City *</div>
            <select name="city2" ref={register({required:true})} className="form-select">
              <option value="">- Select -</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi & NCR">Delhi & NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hydrabad">Hydrabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Ahemdabad">Ahemdabad</option>
            </select>
            {errors.city2?.type==="required" && <small className="text-danger">City is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">Locality*</div>
            <input type="text" name="locality2" ref={register({required:true})} className="form-control" placeholder="Enter your locality" />
            {errors.locality2?.type==="required" && <small className="text-danger">Locality is required</small>}
          </div>
          <div className="col-md-4 my-1"> 
            <div className="py-2 text-dark font-medium">Street Address*</div>
            <input type="text" name="street2" ref={register({required:true})} className="form-control" placeholder="Street Address" />
            {errors.street2?.type==="required" && <small className="text-danger">Street Address is required</small>}
          </div>
          <div className="col-md-4 my-1"> 
            <div className="py-2 text-dark font-medium">Landmark*</div>
            <input type="text" name="landmark2" ref={register({required:true})} className="form-control" placeholder="Landmark" />
            {errors.landmark2?.type==="required" && <small className="text-danger">Landmark is required</small>}
          </div>
          
          <div className="col-md-12">
            <div className="py-2 text-dark font-medium">Select An Appointment*</div> 
          </div>
          <div className="col-md-12">
            <div className="py-2">Prefered slot 1</div>
          </div>
          <div className="col-md-4 my-1"> 
            <input type="date" name="date3" ref={register({required:true})} className="form-control" />
            {errors.date3?.type==="required" && <small className="text-danger">Date is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <input type="time" name="time3" ref={register({required:true})} className="form-control" />
            {errors.time3?.type==="required" && <small className="text-danger">Time is required</small>}
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-12">
            <div className="py-2">Prefered slot 2</div>
          </div>
          <div className="col-md-4 my-1">  
            <input type="date" name="date4" ref={register({required:true})} className="form-control" />
            {errors.date4?.type==="required" && <small className="text-danger">Date is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <input type="time" name="time4" ref={register({required:true})} className="form-control" />
            {errors.time4?.type==="required" && <small className="text-danger">Time is required</small>}
          </div>
          
          
          </>:<></>}

          
          <div className="col-md-12">
            <button type="submit" className="cursor-pointer p-2 px-3 bg-success text-white text-center w-1/2 md:w-1/6 mt-3">Continue</button>
          </div>

        </div>
      </form>
    </div>
  ) 
}
