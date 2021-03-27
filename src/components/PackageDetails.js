import React, { Component } from 'react'
import { useForm } from "react-hook-form";

export default function PackageDetails(props){
  const { values, setValues, handleStep, family, setFamily } = props
  const { register, getValues, handleSubmit, watch, errors } = useForm({
    defaultValues:{
      
    }
  });
  
  const [addonPrice1,setAddonPrice1] = React.useState(0);
  const [addonPrice2,setAddonPrice2] = React.useState(0);
  const [totalPrice1,setPrice1] = React.useState(0);
  const [totalPrice2,setPrice2] = React.useState(0);
  const [totalPrice,setPrice] = React.useState(0);
  const [addonbar1,setAddonbar1] = React.useState(true);
  const [addonbar2,setAddonbar2] = React.useState(true);
  const [category1,setCategory1] = React.useState("")
  const [category2,setCategory2] = React.useState("")
  const [selectedPackage1,setSelectedPackage1] = React.useState(null)
  const [selectedPackage2,setSelectedPackage2] = React.useState(null)


  const packageList = [
    {name:"Package A",price:1200,count:29,data:[
      "Preliminary Test (Complete Blood Count, ESR, Urine Routine)","Diabetic Checkup (F.B.S, HBA1C)",
      "Kidney Profile (Electrolytes, BUN, Creatinine, Uric Acid, Calcium, Phosphorus)",
      "Liver Profile (Bilirubin Total, Bilirubin Direct, Bilirubin Indirect, SGOT, SGPT, Total Protien, Albumin, Globulin, Alkaline  Phosphate, Gamma G.T)",
      "Lipid Profile (Total Cholesterol, LDLC, VLDL, LDL/HDLC Ratio, TC/DLC Ratio)",
      "Physician Examination","Teleconsultation"
    ]},
    {name:"Package B",price:1800,count:23,data:[
      "Preliminary Test (Complete Blood Count, ESR, Urine Routine)","Diabetic Checkup (F.B.S, HBA1C)",
      "Kidney Profile (Electrolytes, BUN, Creatinine, Uric Acid, Calcium, Phosphorus)",
      "Lipid Profile (Total Cholesterol, LDLC, VLDL, LDL/HDLC Ratio, TC/DLC Ratio)",
      "Thyroid Profile (T3, T4, TSH)","Radiological Test (ECG)",
      "USG Abdomen","Physician Examination","Teleconsultation"
    ]},
  ]
  const addons = [
    {value:"Vital Check ( Blood Sugar, BP & PR ) - 3 Tests",price:75,sub:[
      "Blood Glucose fasting / Random","Blood Pressure Check (BP)","Pulse Rate Check (PR)"
    ]},
    {value:"Thyroid (TFT) - 5 Tests",price:500,sub:[
      "Total Tri-iodothyronine (T3)","Total Thyroxine (T4)","FT3","FT4","Thyroid Stimulating Hormone (TSH)"
    ]},
    {value:"Heart Risk Profile (Lipid) - 9 Tests",price:300,sub:[
      "Total Cholesterol","HDL (Good Cholesterol)","Non HDL Cholesterol","LDL (Bad Cholesterol)",
      "VLDL Cholesterol","Triglycerides","LDL/HDL Cholesterol Ratio","HDL/LDL Cholesterol Ratio",
      "TC (Total Cholesterol) /HDL Cholesterol Ratio"
    ]},
    {value:"Liver Function Test (LFT) - 11 Tests",price:300,sub:[
      "Billirubin-TOtal","Billirubin-Direct","Billirubin-Indirect","Alkaline Phosphatase ( ALP )",
      "SGOT (AST)","SGPT (ALT)","Protein-Total","Albumin","Globulin","Serum Albumin / Globulin Ratio",
      "Gamma GT/GGT ( Gamma Glutamyl Transferase)"
    ]},
    {value:"Kidney Function Test (KFT) - 6 Tests + Electrolytes",price:300,sub:[
      "Uric Acid","SErum Urea","Serum Creatinine","Urea/Creatinine Ratio","Blood Urea Nitrogen (BUN)",
      "BUN / Cretinine Ratio","Electrolyte Profile (Potassium, Sodium & Chloride)"
    ]},
    {value:"Complete Urine Routine Analysis (CUE) - 20 Tests",price:300,sub:[
      "Color","Specific Gravity","Apparence","REaction (pH)","Protiens","Glucose","Nitrites","Blood","Ketones",
      "Bilirubin","Urobilinogen","Leukocutes","PUS (WBC) Cells","RBC","Epithelial Cells","Crystals","Casts","Bacteria",
      "Budding Yeasts Cells","Other Findings"
    ]},
    {value:"Complete Blood Counr (CBC) - 24 Tests",price:150,sub:[
      "Hemoglobin (Hb)","Total WBC Count (TLC)","R.B.C Count","MCV","MCH","MCHC","Packed Cell Volume (PCV)","Platelet count",
      "RDW-SD","RDW-CV","PDW","MPV","P-LCR","PCT","Neutrophils","Lymphocytes","Monocytes","Eosinophills","Basophils",
      "Absolute Neutrophils Count","Absolute Lymphocytes Count","Absolute Monocytes Count",
      "Absolute Eosinophils Count","Absolute Basophils Count",
    ]},
    {value:"Vitamin B12",price:350,sub:[]},
    {value:"Vitamin D-3 (25-Hydroxy)",price:650,sub:[]},
    {value:"ECG",price:300,sub:[]},
    {value:"USG(Abdomen & Pelvis)",price:600,sub:[]},
    {value:"Chest X-ray",price:200,sub:[]},
    {value:"PSA (Male)",price:350,sub:[]},
    {value:"Eye Checkup",price:150,sub:[]},
    {value:"GP Consulation",price:250,sub:[]},
    {value:"Mamography",price:1000,sub:[]},
    {value:"Pap Smear (Female)",price:800,sub:[]},
  ]
  
  const hcc = 250;

  const handleChange1 = () => {
    const data = getValues("addons1")
    var price = 0;
    data.map(el=>{
      price += addons[Number(el)].price
    })
    setAddonPrice1(price)
    setPrice1(price)
  }
  const handleChange2 = () => {
    const data = getValues("addons2")
    var price = 0;
    data.map(el=>{
      price += addons[Number(el)].price
    })
    setAddonPrice2(price)
    setPrice2(price + (packageList[getValues("package2")]?packageList[getValues("package2")].price:0))
    
  } 

  const onSubmit = (data) => {
    console.log(data.addons1)
    var addons1 = data.addons1?.map(e=>addons[Number(e)].value)
    var addons2 = data.addons2?.map(e=>addons[Number(e)].value)
    var pkg1 = {packageName:packageList[data.package1]?.name,count:packageList[data.package1]?.count,addons:addons1,price:totalPrice1,pkgprice:0,addonprice:addonPrice1}
    var pkg2 = {packageName:packageList[data.package2]?.name,count:packageList[data.package2]?.count,addons:addons2,price:totalPrice2,pkgprice:packageList[data.package2]?.price,addonprice:addonPrice2}
    setValues({...values,packageDetails:family?[pkg1,pkg2]:[pkg1]})
    handleStep();
  }
  return (
  <div className="container-fluid p-4 bg-white border shadow-sm">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">  
        {/* Package 1 */} 
        <div className="col-md-12">
          <select name="category" className="form-select" defaultValue={category1} onChange={e=>setCategory1(e.target.value)}>
            <option value="">- Select -</option>
            <option value="0">Corporate Sponsored</option>
            <option value="1">Addons</option>
          </select>

          <div className={category1==="0"?"block":"hidden"}>
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
            {/* <div className="py-2 text-dark font-medium">Comprehensive Active Professional Health Checkup</div>
            <div className="text-secondary -my-2">Ideal for individuals aged 41 to 60 years</div> */}
            <div className="flex-row md:flex my-2">
                <div className="w-full md:w-5/6"> 
                  {packageList[selectedPackage1]?.data.map((e,k)=>(
                    <span key={k}> {e + ", "} </span>
                  ))} 
                </div>
              {selectedPackage1?<>
                <div className="ml-auto text-right md:text-left px-4 font-medium w-full md:w-1/6">
                  <div> <s> Rs. {packageList[selectedPackage1]?packageList[selectedPackage1].price:0} </s> </div>
                  <div> FREE </div>
                </div>
              </>:<></>}
            </div>
          </div>


          <div className={category1==="1"?"block":"hidden"}>
            <div className="accordion my-2" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" onClick={e=>setAddonbar1(!addonbar1)}>
                  <button className="accordion-button" type="button">
                  Add-on Tests (Rs. {addonPrice1})
                  </button>
                </h2>
                <div className={addonbar1?"accordion-collapse":"accordion-collapse collapse"}>
                  <div className="accordion-body">
                    <div className=""> 
                      <div className="w-full">
                        {addons.map((el,key)=>(
                          <div key={key} className="flex items-start justify-between mr-1">
                            <div className="flex items-start w-4/6">
                              <input type="checkbox" className="m-2 ml-0" defaultValue={key} onChange={handleChange1} name="addons1" ref={register} />
                              <div>
                                <div className="text-lg font-medium mx-2">{el.value} </div>
                                {el.sub.map((e,k)=>(
                                  <div className="px-2" key={k}> {e} </div>
                                ))}
                              </div>
                            </div>
                            <div>Rs. {el.price} </div>
                          </div>
                        ))} 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="py-2 text-dark font-medium w-full">Add-on Tests</div>
              <div className="px-4 font-medium text-right w-full md:w-2/6">
                <div>Rs. {totalPrice1}</div> 
              </div> 
            </div>
            <div className=""> 
              <div className="w-full">
                {addons.map((el,key)=>(
                  <div key={key} className="flex items-start justify-between mr-1">
                    <div className="flex items-start w-4/6">
                      <input type="checkbox" className="m-2 ml-0" defaultValue={key} onChange={handleChange1} name="addons1" ref={register} />
                      <div>
                        <div className="text-lg font-medium mx-2">{el.value} </div>
                        {el.sub.map((e,k)=>(
                          <div className="px-2" key={k}> {e} </div>
                        ))}
                      </div>
                    </div>
                    <div>Rs. {el.price} </div>
                  </div>
                ))} 
              </div>
            </div> */}
          </div>
        </div>
            

        {/* Package 2 */}
        {family?<>
          <hr className="my-3" />
          <div className="col-md-12">
            <select name="category" className="form-select" defaultValue={category2} onChange={e=>setCategory2(e.target.value)}>
              <option value="">- Select -</option>
              <option value="0">Corporate Sponsored</option>
              <option value="1">Addons</option>
            </select>


            <div className={category2==="0"?"block":"hidden"}>
              <div className="py-2 text-dark font-medium">Package  
              {family?<><span>( For {values.employeeDetails[1]?.name} ) </span></>:<></>} 
              *</div>
              <select name={"package2"} defaultValue={selectedPackage2} onChange={(e)=>{setSelectedPackage2(e.target.value);handleChange2()}} className="form-select" ref={register({required:true})}>
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
            </div>


            <div className={category2==="1"?"block":"hidden"}>
              <div className="accordion my-2" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" onClick={e=>setAddonbar2(!addonbar2)}>
                    <button className="accordion-button" type="button">
                    Add-on Tests (Rs. {addonPrice2})
                    </button>
                  </h2>
                  <div className={addonbar2?"accordion-collapse":"accordion-collapse collapse"}>
                    <div className="accordion-body">
                      <div className=""> 
                        <div className="w-full">
                          {addons.map((el,key)=>(
                            <div key={key} className="flex items-start justify-between mr-1">
                              <div className="flex items-start w-4/6">
                                <input type="checkbox" className="m-2 ml-0" defaultValue={key} onChange={handleChange2} name="addons2" ref={register} />
                                <div>
                                  <div className="text-lg font-medium mx-2">{el.value} </div>
                                  {el.sub.map((e,k)=>(
                                    <div className="px-2" key={k}> {e} </div>
                                  ))}
                                </div>
                              </div>
                              <div>Rs. {el.price} </div>
                            </div>
                          ))} 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className=""> 
                <div className="w-full">
                  {addons.map((el,key)=>(
                    <div key={key} className="flex items-start justify-between mr-1">
                      <div className="flex items-start w-4/6">
                        <input type="checkbox" className="m-2 ml-0" defaultValue={key} onChange={handleChange2} name="addons2" ref={register} />
                        <div>
                          <div className="text-lg font-medium mx-2">{el.value} </div>
                          {el.sub.map((e,k)=>(
                            <div className="px-2" key={k}> {e} </div>
                          ))}
                        </div>
                      </div>
                      <div>Rs. {el.price} </div>
                    </div>
                  ))} 
                </div>
              </div> */}
            </div>
          </div> 
        </>:<></>}

        <hr className="my-3" />
        <div className="flex items-center justify-between my-2">
          <div className="text-lg font-medium">Home Collection charge</div>
          <div className="text-lg font-medium"> Rs. {hcc} </div>
        </div>
        <div className="flex items-center justify-between my-2">
          <div className="text-lg font-medium">Total  </div>
          <div className="text-lg font-medium"> Rs. {totalPrice1 + totalPrice2 + hcc} </div>
        </div>

        <div className="col-md-12">
          <button type="submit" className="cursor-pointer p-2 px-3 bg-success text-white text-center w-1/2 md:w-1/6 mt-3">Continue</button>
        </div>
      </div>
    </form>

  </div>
  )
        
}
