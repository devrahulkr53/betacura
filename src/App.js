import React, { useEffect } from 'react'
import logo from './logo.png';
import check from './assets/check.svg'
import './helperCss/bootstrap.css';
import './helperCss/tailwind.css'; 
import './App.css'; 


import EmployeeDetails from './components/EmployeeDetails';
import PackageDetails from './components/PackageDetails';
import AppointmentDetails from './components/AppointmentDetails';
import PaymentDetails from './components/PaymentDetails';

function App() {

  const [step,setStep] = React.useState(1);
  
  const [family,setFamily] = React.useState(false)
  const [values,setValues] = React.useState({
    employeeDetails:[],
    packageDetails:[],
    appointmentDetails:[],
    charge:false
  })


  const handleStep = () => {
    setStep(step+1)
  }
 
  useEffect(()=>{
    // localStorage.setItem('userInfo',JSON.stringify({title:"Mr.",firstName:"ABC",email:"abc12abc@gmail.com",uid:"10009210902"}))
  },[])

  // const blobToUint8Array = (b) => {
  //   var uri = URL.createObjectURL(b),
  //       xhr = new XMLHttpRequest(),
  //       i,
  //       ui8;

  //   xhr.open('GET', uri, false);
  //   xhr.send();

  //   URL.revokeObjectURL(uri);

  //   ui8 = new Uint8Array(xhr.response.length);

  //   for (i = 0; i < xhr.response.length; ++i) {
  //       ui8[i] = xhr.response.charCodeAt(i);
  //   }

  //   return ui8;
  // } 

  const onSubmit = () => {
    var totalPrice = 0;
    for(var i in values.packageDetails){
      totalPrice += values.packageDetails[i].price
    }
    totalPrice += 250
    var pkg = values.employeeDetails.map((el,key)=>{
      return {
        name:el.name,
        email:el.email,
        mobile:el.phone,
        relationshipType:key===0?"Self":"Family",
        packages:{
          packageName:values.packageDetails[key].packageName,
          pkgDesc:values.packageDetails[key].pkgDesc,
          price:values.packageDetails[key].price,
          addOnPackages:values.packageDetails[key].addOnPackages,
        },
        appointment:values.appointmentDetails[key],
      }
    })
    

    var data = {
      appointmentDate1:values.appointmentDetails[0].date1,
      appointmentDate2:values.appointmentDetails[0].date2,
      email:values.employeeDetails[0].email,
      employeeId:values.employeeDetails[0].id,
      employeeName:values.employeeDetails[0].name,
      identificationType:values.employeeDetails[0].idprooftype,
      // identificationDocUrl:values.employeeDetails[0].idproof,
      mobile:values.employeeDetails[0].phone,
      packageDetails:pkg,
      totalConvienceCharge:0,
      totalprice:totalPrice
    }
    
    console.log(data)
    setStep(step+1)

    
    var formData = new FormData();
    formData.append("type","BCuraLead")
    formData.append("file",URL.createObjectURL(values.employeeDetails[0].idproof[0]))
    formData.append("fileName",values.employeeDetails[0].idproof[0].name)
    formData.append("mediaType","image")
 
    const serverOrigin ='http://13.233.125.97:8080';
    fetch( serverOrigin+"/upload/image",{ 
      method: 'POST',
      body: formData,
    }).then(d=>d.json()).then(json=>{
      console.log(json)
    }).catch(err=>{
      console.log(err)
    })


    fetch(`${serverOrigin}/incoming-lead/receive/w/appointment`,{
      method:"POST",
      body:JSON.stringify(data),
      headers: {
        "Accept": "application/json"
      },  
    })
    .then(d=>d.json())
    .then(json=>{
      console.log(json)
    }).catch(err=>{
      console.log(err)
    })
  }

  const props = { values,setValues,handleStep,family,setFamily }

  return (
  <div className="bg-light">
    <div className="container">  
      <img src={logo} className="w-3/5 md:w-1/5 mx-auto" />
 

      <div className="container-fluid">
        {step > 4?<div className="py-10" style={{height:500}}>
          <div className="text-center text-2xl">Thank you for choosing your Wellness Health Screening and placing your request with us.</div>
          <div className="text-center text-secondary text-1xl">Your case will be allocated to dedicated case manager and 
          you will be contacted within 24 working hours. Please inbox us at <a className="text-primary" href="http://contact@betacura.com">contact@betacura.com </a>   
          if you have any questions. You can explore more about us by hitting on <a className="text-primary" href="http://www.betacura.com">www.betacura.com</a> </div>
          {/* <div onClick={()=>window.location.reload()} className="px-4 p-1 border shadow-sm rounded text-center col-md-2 mx-auto my-3 text-primary">START Again</div> */}
        </div>:<>
        
        {/* Employee Details */}
        {values.employeeDetails.length > 0 ?<>
          <div className="container-fluid p-0 md:p-2 my-3">
            <div className="flex-row md:flex bg-white p-3 cursor-pointer border shadow-sm">
              <div className="flex items-center w-full md:w-4/5">
                <div className="w-10 p-2 text-center self-start border rounded bg-light shadow-sm">1</div>
                <div className="text-sm md:text-xl px-3 font-medium w-full">
                  <div className="flex items-center">
                    <div>Employee Details</div>  
                    <img src={check} width="20px" className="mx-3" />
                  </div> 
                  <div className="text-md text-secondary">{values.employeeDetails[0].name} +91{values.employeeDetails[0].phone}</div> 
                  {family?<>
                    <div>Family Details</div>  
                    <div className="text-md text-secondary">{values.employeeDetails[1]?.name} +91{values.employeeDetails[1]?.phone}</div> 
                  </>:<></>}
                  {/* {values.employeeDetails.map((el,key)=>(
                    <div key={key} className="text-md text-secondary">{el.name} +91{el.phone}</div> 
                  ))} */}
                </div> 

              </div>
              <div className="ml-auto self-center w-1/2 md:w-1/5">
                <div onClick={()=>{setStep(1)}} className="text-center p-2 border text-primary rounded mx-3">CHANGE</div>
              </div>
            </div> 
            {step === 1?<EmployeeDetails {...props} />:<></>}
          </div>
        
        </>:<>
          <div className="container-fluid p-0 md:p-2 my-3">
            <div className="flex items-center bg-primary p-3 cursor-pointer">
              <div className="p-1 px-2 bg-white rounded">1</div>
              <div className="text-xl text-white px-3 font-medium">Employee Details</div> 
            </div>
            {step === 1?<EmployeeDetails {...props} />:<></>}
            
          </div>
        </>}

        {/* Package Details */}
        {values.packageDetails.length > 0 ?<>
          <div className="container-fluid p-0 md:p-2 my-3">
            <div className="flex-row md:flex bg-white p-3 cursor-pointer border shadow-sm">
              <div className="flex items-center w-full md:w-4/5">
                <div className="w-10 p-2 text-center self-start border rounded bg-light shadow-sm">2</div>
                <div className="text-sm md:text-xl px-3 font-medium w-full">
                  <div className="flex items-center">
                    <div>Package Details</div>  
                    <img src={check} width="20px" className="mx-3" />
                  </div> 
                  {values.employeeDetails.length > 1?<>
                    {values.packageDetails.map((el,key)=>(
                      <> 
                        <div key={key} className="text-dark text-sm">
                          <span className="text-sm md:text-lg font-medium">{values.employeeDetails[key].name}</span>
                          : {el.packageName}</div> 
                        <div className="text-dark text-sm">Add-on Package: {el.addons.map(el=>(el+","))}</div> 
                      </>
                    ))} 
                  </>:<>
                    {values.packageDetails.map((el,key)=>(
                      <> 
                        <div key={key} className="text-dark text-sm">Package: {el.packageName}</div> 
                        <div className="text-dark text-sm">Add-on Package: {el.addons?.map(el=>(el+","))}</div> 
                      </>
                    ))}
                  </>}
                </div> 
              </div>
              <div className="ml-auto self-center w-1/2 md:w-1/5">
                <div onClick={()=>{setStep(2)}} className="text-center p-2 border text-primary rounded mx-3">CHANGE</div>
              </div>
            </div> 
            {step === 2?<PackageDetails {...props} />:<></>}
          </div>
        
        </>:<>
          <div className="container-fluid p-0 md:p-2 my-3">
            <div className="flex items-center bg-primary p-3 cursor-pointer">
              <div className="p-1 px-2 bg-white rounded">2</div>
              <div className="text-xl text-white px-3 font-medium">Package Details</div> 
            </div>
            {step === 2?<PackageDetails {...props} />:<></>}
            
          </div>
        </>}


        {/* Appointment Details */}
        {values.appointmentDetails.length > 0 ?<>
          <div className="container-fluid p-0 md:p-2 my-3">
            <div className="flex-row md:flex bg-white p-3 cursor-pointer border shadow-sm">
              <div className="flex items-center w-full md:w-4/5">
                <div className="w-10 p-2 text-center self-start border rounded bg-light shadow-sm">3</div>
                <div className="text-sm md:text-xl px-3 font-medium w-full">
                  <div className="flex items-center">
                    <div>Appointment Details</div>  
                    <img src={check} width="20px" className="mx-3" />
                  </div> 
                  {values.employeeDetails.length > 1?<>
                    {values.appointmentDetails.map((el,key)=>(
                      <> 
                        <div key={key} className="text-dark text-sm">
                          <span className="text-sm md:text-lg font-medium">{values.employeeDetails[key].name}</span>
                          : {el.address}</div> 
                          {el.date1?<>
                            <div className="text-dark text-sm">Date & Time : {el.date1}</div>
                          </>:<></>}
                      </>
                    ))} 
                  </>:<>
                    {values.appointmentDetails.map((el,key)=>(
                      <> 
                        <div key={key} className="text-dark text-sm">Appointment: {el.address}</div> 
                        <div className="text-dark text-sm">Date & Time : {el.date1}</div> 
                      </>
                    ))}
                  </>}
                </div> 
              </div>
              <div className="ml-auto self-center w-1/2 md:w-1/5">
                <div onClick={()=>{setStep(3)}} className="text-center p-2 border text-primary rounded mx-3">CHANGE</div>
              </div>
            </div> 
            {step === 3?<AppointmentDetails {...props} />:<></>}
          </div>
        
        </>:<>
          <div className="container-fluid p-0 md:p-2 my-3">
            <div className="flex items-center bg-primary p-3 cursor-pointer">
              <div className="p-1 px-2 bg-white rounded">3</div>
              <div className="text-xl text-white px-3 font-medium">Appointment Details</div> 
            </div>
            {step === 3?<AppointmentDetails {...props} />:<></>}
            
          </div>
        </>}

          
        {/* Paymen Details */}
        <div className="container-fluid p-0 md:p-2 my-3">
          <div className="flex items-center bg-primary p-3 cursor-pointer">
            <div className="p-1 px-2 bg-white rounded">4</div>
            <div className="text-xl text-white px-3 font-medium">Payment</div> 
          </div>
          {step === 4?<PaymentDetails {...props} submit={onSubmit} />:<></>}
          
        </div>


        </>}
        
      </div>

    </div> 
  </div>
  );
}

export default App;
