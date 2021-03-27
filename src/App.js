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
  })


  const handleStep = () => {
    setStep(step+1)
  }
 

  const onSubmit = () => {
    var totalPrice = 0;
    for(var i in values.packageDetails){
      totalPrice += values.packageDetails[i].price
    }
    var pkg = values.employeeDetails.map((el,key)=>{
      return {
        name:el.name,
        email:el.email,
        mobile:el.phone,
        relationshipType:key===0?"Self":"Family",
        package:{
          packageName:values.packageDetails[key].packageName,
          price:values.packageDetails[key].price,
          addons:values.packageDetails[key].addons,
        },
        appointment:{
          address:values.appointmentDetails[key].address,
          date1:values.appointmentDetails[key].date1,
          date2:values.appointmentDetails[key].date2
        },
      }
    })
    

    var data = {
      appointmentDate1:values.appointmentDetails[0].date1,
      appointmentDate2:values.appointmentDetails[0].date2,
      email:values.employeeDetails[0].email,
      employeeId:values.employeeDetails[0].id,
      employeeName:values.employeeDetails[0].name,
      identificationType:values.employeeDetails[0].idprooftype,
      identificationDocUrl:values.employeeDetails[0].idproof,
      mobile:values.employeeDetails[0].phone,
      packageDetails:pkg,
      totalConvienceCharge:0,
      totalprice:totalPrice
    }
    
    console.log(data)
    setStep(step+1)

    fetch(`http://13.233.125.97:8080/incoming-lead/receive/w/appointment`,{
      method:"POST",
      body:JSON.stringify(data)
    }).then(d=>d.json()).then(json=>{
      console.log(json)
    })
  }

  const props = { values,setValues,handleStep,family,setFamily }

  return (
  <div className="bg-light">
    <div className="container">  
      <img src={logo} className="w-3/5 md:w-1/5 mx-auto" />
 

      <div className="container-fluid">
        
        {step > 4?<div className="py-10" style={{height:500}}>
          <div className="text-center display-6">Thank you for placing your order.</div>
          <div className="text-center text-secondary text-3xl">Someone from our team will get back to you shortly.</div>
          <div onClick={()=>window.location.reload()} className="px-4 p-1 border shadow-sm rounded text-center col-md-2 mx-auto my-3 text-primary">START Again</div>
        </div>:<>
        
        {/* Employee Details */}
        {values.employeeDetails.length > 0 ?<>
          <div className="container-fluid p-0 md:p-2 my-3">
            <div className="flex-row md:flex bg-white p-3 cursor-pointer border shadow-sm">
              <div className="flex items-center">
                <div className="w-10 p-2 text-center self-start border rounded bg-light shadow-sm">1</div>
                <div className="text-xl px-3 font-medium">
                  <div className="flex items-center">
                    <div>Employee Details</div>  
                    <img src={check} width="20px" className="mx-3" />
                  </div> 
                  {values.employeeDetails.map((el,key)=>(
                    <div key={key} className="text-md text-secondary">{el.name} +91{el.phone}</div> 
                  ))}
                </div> 

              </div>
              <div className="ml-auto self-center w-1/2 md:w-1/5">
                <div onClick={()=>{setValues({...values,employeeDetails:[],packageDetails:[],appointmentDetails:[]});setStep(1)}} className="text-center p-2 border text-primary rounded mx-3">CHANGE</div>
              </div>
            </div> 
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
              <div className="flex items-center">
                <div className="w-10 p-2 text-center self-start border rounded bg-light shadow-sm">2</div>
                <div className="text-xl px-3 font-medium">
                  <div className="flex items-center">
                    <div>Package Details</div>  
                    <img src={check} width="20px" className="mx-3" />
                  </div> 
                  {values.employeeDetails.length > 1?<>
                    {values.packageDetails.map((el,key)=>(
                      <> 
                        <div key={key} className="text-dark text-sm">
                          <span className="text-lg font-medium">{values.employeeDetails[key].name}</span>
                          : {el.packageName}</div> 
                        <div className="text-dark text-sm">Add-on Package: {el.addons.map(el=>(el+","))}</div> 
                      </>
                    ))} 
                  </>:<>
                    {values.packageDetails.map((el,key)=>(
                      <> 
                        <div key={key} className="text-dark text-sm">Package: {el.packageName}</div> 
                        <div className="text-dark text-sm">Add-on Package: {el.addons.map(el=>(el+","))}</div> 
                      </>
                    ))}
                  </>}
                </div> 
              </div>
              <div className="ml-auto self-center w-1/2 md:w-1/5">
                <div onClick={()=>{setValues({...values,packageDetails:[],appointmentDetails:[]});setStep(2)}} className="text-center p-2 border text-primary rounded mx-3">CHANGE</div>
              </div>
            </div> 
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
              <div className="flex items-center">
                <div className="w-10 p-2 text-center self-start border rounded bg-light shadow-sm">3</div>
                <div className="text-xl px-3 font-medium">
                  <div className="flex items-center">
                    <div>Appointment Details</div>  
                    <img src={check} width="20px" className="mx-3" />
                  </div> 
                  {values.employeeDetails.length > 1?<>
                    {values.appointmentDetails.map((el,key)=>(
                      <> 
                        <div key={key} className="text-dark text-sm">
                          <span className="text-lg font-medium">{values.employeeDetails[key].name}</span>
                          : {el.address}</div> 
                        <div className="text-dark text-sm">Date & Time : {el.date1}</div> 
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
                <div onClick={()=>{setValues({...values,appointmentDetails:[]});setStep(3)}} className="text-center p-2 border text-primary rounded mx-3">CHANGE</div>
              </div>
            </div> 
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
