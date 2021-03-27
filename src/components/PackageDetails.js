import React, { Component } from 'react'
import { useForm } from "react-hook-form";

export default function PackageDetails(props){
  const { values, setValues, handleStep, family, setFamily } = props
  const { register, getValues, handleSubmit, watch, errors } = useForm();
  
  const [totalPrice1,setPrice1] = React.useState(0);
  const [totalPrice2,setPrice2] = React.useState(0);
  const [totalPrice,setPrice] = React.useState(0);
  const [selectedPackage1,setSelectedPackage1] = React.useState(null)
  const [selectedPackage2,setSelectedPackage2] = React.useState(null)
  const packageList = [
    {name:"Package A",price:1200,data:[
      "Preliminary Test (Complete Blood Count, ESR, Urine Routine)","Diabetic Checkup (F.B.S, HBA1C)",
      "Kidney Profile (Electrolytes, BUN, Creatinine, Uric Acid, Calcium, Phosphorus)",
      "Liver Profile (Bilirubin Total, Bilirubin Direct, Bilirubin Indirect, SGOT, SGPT, Total Protien, Albumin, Globulin, Alkaline  Phosphate, Gamma G.T)",
      "Lipid Profile (Total Cholesterol, LDLC, VLDL, LDL/HDLC Ratio, TC/DLC Ratio)",
      "Physician Examination","Teleconsultation"
    ]},
    {name:"Package B",price:1800,data:[
      "Preliminary Test (Complete Blood Count, ESR, Urine Routine)","Diabetic Checkup (F.B.S, HBA1C)",
      "Kidney Profile (Electrolytes, BUN, Creatinine, Uric Acid, Calcium, Phosphorus)",
      "Lipid Profile (Total Cholesterol, LDLC, VLDL, LDL/HDLC Ratio, TC/DLC Ratio)",
      "Thyroid Profile (T3, T4, TSH)","Radiological Test (ECG)",
      "USG Abdomen","Physician Examination","Teleconsultation"
    ]},
  ]
  const addons = [
    {value:"Vital Check ( Blood Sugar, BP & PR ) - 3 Tests",price:75},
    {value:"Thyroid (TFT) - 5 Tests",price:500},
    {value:"Heart Risk Profile (Lipid) - 9 Tests",price:300},
    {value:"Liver Function Test (LFT) - 11 Tests",price:300},
    {value:"Kidney Function Test (KFT) - 6 Tests + Electrolytes",price:300},
    {value:"Complete Urine Routine Analysis (CUE) - 20 Tests",price:300},
    {value:"Complete Blood Counr (CBC) - 24 Tests",price:150},
    {value:"Vitamin B12",price:350},
    {value:"Vitamin D-3 (25-Hydroxy)",price:650},
    {value:"ECG",price:300},
    {value:"USG(Abdomen & Pelvis)",price:600},
    {value:"Chest X-ray",price:200},
    {value:"PSA (Male)",price:350},
    {value:"Eye Checkup",price:150},
    {value:"GP Consulation",price:250},
    {value:"Mamography",price:1000},
    {value:"Pap Smear (Female)",price:800},
  ]
  
  const handleChange1 = () => {
    const data = getValues("addons1")
    var price = 0;
    data.map(el=>{
      price += addons[Number(el)].price
    })
    setPrice1(price)
  }
  const handleChange2 = () => {
    const data = getValues("addons2")
    var price = 0;
    data.map(el=>{
      price += addons[Number(el)].price
    })
    setPrice2(price)
  } 

  const onSubmit = (data) => {
    var addons1 = data.addons1?.map(e=>addons[Number(e)].value)
    var addons2 = data.addons2?.map(e=>addons[Number(e)].value)
    var pkg1 = {packageName:packageList[data.package1]?.name,addons:addons1,price:totalPrice1,pkgprice:0}
    var pkg2 = {packageName:packageList[data.package2]?.name,addons:addons2,price:totalPrice2,pkgprice:packageList[data.package2]?.price}
    setValues({...values,packageDetails:family?[pkg1,pkg2]:[pkg1]})
    handleStep();
  }
  return (
  <div className="container-fluid p-4 bg-white border shadow-sm">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">  
        {/* Package 1 */}
        <div className="col-md-5">
          <div className="py-2 text-dark font-medium">Package  
          {family?<><span>( For {values.employeeDetails[0]?.name} ) </span></>:<></>} 
          *</div>
          <select name={"package1"} defaultValue={selectedPackage1} onChange={e=>setSelectedPackage1(e.target.value)} className="form-select" ref={register({required:true})}>
              <option value="">- Select Package -</option>
                {packageList.map((el,key)=>(
                  <option value={key}>{el.name}</option>
                ))}
              {/* <option value="Comprehensive Active Professional Health Checkup">Comprehensive Active Professional Health Checkup</option>
              <option value="Comprehensive young Indian Health Checkup">Comprehensive young Indian Health Checkup</option>
              <option value="Young Indian Health Checkup">Young Indian Health Checkup</option>
              <option value="Active Professional Health Checkup">Active Professional Health Checkup</option> */}
          </select>
          {errors.package1?.type==="required" && <small className="text-danger">Package is required</small>}
        </div> 
        <div className="col-md-12">
          {/* <div className="py-2 text-dark font-medium">Comprehensive Active Professional Health Checkup</div>
          <div className="text-secondary -my-2">Ideal for individuals aged 41 to 60 years</div> */}
          <div className="flex-row md:flex my-2">
              <div className="w-full md:w-5/6"> 
                {packageList[selectedPackage1]?.data.map((e,k)=>(
                  <span key={k}> {e + ", "} </span>
                ))} 
              </div>
            <div className="ml-auto text-right md:text-left px-4 font-medium w-full md:w-1/6">
              <div> Rs. 0 </div>
            </div>
          </div>
          <div className="py-2 text-dark font-medium">Add-on Tests</div>
          <div className="flex justify-between"> 
            <div className="flex-row md:flex md:flex-wrap w-full">
              {addons.map((el,key)=>(
                <div key={key} className="flex items-center mr-1">
                    <input type="checkbox" defaultValue={key} onChange={handleChange1} name="addons1" ref={register} />
                    <span className="text-sm font-medium mx-2">{el.value}</span>
                </div>
              ))} 
            </div>
            <div className="px-4 font-medium text-right md:text-left w-full md:w-1/6">
              <div>Rs. {totalPrice1}</div> 
            </div> 
          </div>
        </div>
        
        {/* Package 2 */}
        {family?<>
          <div className="col-md-5">
            <div className="py-2 text-dark font-medium">Package  
            {family?<><span>( For {values.employeeDetails[1]?.name} ) </span></>:<></>} 
            *</div>
            <select name={"package2"} defaultValue={selectedPackage2} onChange={e=>setSelectedPackage2(e.target.value)} className="form-select" ref={register({required:true})}>
                <option value="">- Select Package -</option>
                {packageList.map((el,key)=>(
                  <option value={key}>{el.name}</option>
                ))}
                {/* <option value="Comprehensive Active Professional Health Checkup">Comprehensive Active Professional Health Checkup</option>
                <option value="Comprehensive young Indian Health Checkup">Comprehensive young Indian Health Checkup</option>
                <option value="Young Indian Health Checkup">Young Indian Health Checkup</option>
                <option value="Active Professional Health Checkup">Active Professional Health Checkup</option> */}
            </select>
            {errors.package2?.type==="required" && <small className="text-danger">Package is required</small>}
          </div> 
          <div className="col-md-12">
            {/* <div className="py-2 text-dark font-medium">Comprehensive Active Professional Health Checkup</div>
            <div className="text-secondary -my-2">Ideal for individuals aged 41 to 60 years</div> */}
            <div className="flex-row md:flex my-2">
              <div className="w-full md:w-5/6">
                {packageList[selectedPackage2]?.data.map((e,k)=>(
                  <span key={k}> {e + ", "} </span>
                ))} 
              </div>
              <div className="text-right md:text-left px-4 font-medium w-full md:w-1/6">
                <div> Rs. {packageList[selectedPackage2]?packageList[selectedPackage2].price:0} </div>
              </div>
            </div>
            <div className="py-2 text-dark font-medium">Add-on Tests</div>
            <div className="flex justify-between"> 
              <div className="flex-row md:flex md:flex-wrap w-full">
                {addons.map((el,key)=>(
                  <div key={key} className="flex items-center mr-1">
                      <input type="checkbox" defaultValue={key} onChange={handleChange2} name="addons2" ref={register} />
                      <span className="text-sm font-medium mx-2">{el.value}</span>
                  </div>
                ))} 
              </div>
              <div className="ml-auto px-4 font-medium text-right md:text-left w-full md:w-1/6">
                <div>Rs. {totalPrice2}</div> 
              </div> 
            </div>
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
