import React, { Component } from 'react'

export default function PaymentDetails (props) {

  const { values, setValues, handleStep, family, setFamily } = props
 
  const hcc = 250;

  return (<>
  <div className="container-fluid p-4 bg-white border shadow-sm">
    <div className="row">
      <div className="mx-auto flex items-center border-b-2 py-2">
        <div className="text-dark font-medium w-3/6 md:w-4/6">Package 
        <span> {family?<> {"for "+values.employeeDetails[0]?.name} </>:<></>} </span>
        </div>
        <div className="text-dark font-medium w-1/6">Qty.</div>
        <div className="text-right text-dark font-medium w-2/6 md:w-1/6">Price</div> 
      </div> 

      <div className="mx-auto flex items-center py-1">
        <div className="w-3/6 md:w-4/6">{values.packageDetails[0].packageName}</div>
        <div className="text-dark font-medium w-1/6"> {values.packageDetails[0].count} </div>
        <div className="text-right text-dark font-medium w-2/6 md:w-1/6"> {values.packageDetails[0].pkgprice} </div> 
      </div> 

      <div className="mx-auto flex items-center">
        <div className="text-dark font-medium w-3/6 md:w-4/6">No. of tests</div>
        <div className="w-1/6"></div>
        <div className="text-right w-2/6 md:w-1/6"></div> 
      </div> 
      <div className="mx-auto flex items-center">
        <div className="w-3/6 md:w-4/6">Add on tests</div>
        <div className="w-1/6">{values.packageDetails[0].addons.length}</div>
        <div className="text-right w-2/6 md:w-1/6">Rs. {values.packageDetails[0].addonprice}</div> 
      </div> 
      <hr className="my-2" /> 

      {family?<>
      <div className="mx-auto flex items-center border-b-2 py-2">
        <div className="text-dark font-medium w-3/6 md:w-4/6">Package 
        <span> {family?<> {"for "+values.employeeDetails[1]?.name} </>:<></>} </span>
        </div>
        <div className="text-dark font-medium w-1/6">Qty.</div>
        <div className="text-right text-dark font-medium w-2/6 md:w-1/6">Price</div> 
      </div> 

      <div className="mx-auto flex items-center py-1">
        <div className="w-3/6 md:w-4/6">{values.packageDetails[1].packageName}</div>
        <div className="text-dark font-medium w-1/6">{values.packageDetails[1].count}</div>
        <div className="text-right text-dark font-medium w-2/6 md:w-1/6"> {values.packageDetails[1].pkgprice} </div> 
      </div> 

      <div className="mx-auto flex items-center">
        <div className="text-dark font-medium w-3/6 md:w-4/6">No. of tests</div>
        <div className="w-1/6"></div>
        <div className="text-right w-2/6 md:w-1/6"></div> 
      </div> 
      <div className="mx-auto flex items-center">
        <div className="w-3/6 md:w-4/6">Add on tests</div>
        <div className="w-1/6">{values.packageDetails[1].addons.length}</div>
        <div className="text-right w-2/6 md:w-1/6">Rs. {values.packageDetails[1].addonprice}</div> 
      </div> 
      <hr className="my-2" />
      </>:<></>}
        
      <div className="mx-auto flex items-center py-2">
        <div className="text-dark font-medium w-3/6 md:w-4/6">Home collection charges</div>
        <div className="text-dark font-medium w-1/6"></div>
        <div className="text-right text-dark font-medium w-2/6 md:w-1/6">
          Rs. {hcc}
          </div> 
      </div>
      <div className="mx-auto flex items-center py-2">
        <div className="text-dark font-medium w-3/6 md:w-4/6">Total</div>
        <div className="text-dark font-medium w-1/6"></div>
        <div className="text-right text-dark font-medium w-2/6 md:w-1/6">
          Rs. {family? (values.packageDetails[0].price + values.packageDetails[1].price + hcc) : (values.packageDetails[0].price + hcc)}
          </div> 
      </div> 
        
    </div>
  </div>


  <div className="p-4 flex justify-between border bg-primary-200 shadow-sm">
    <div>
      <div className="fond-bold display-6">
        Total Rs. {family? (values.packageDetails[0].price + values.packageDetails[1].price + hcc) : (values.packageDetails[0].price + hcc)}
      </div>
      <div><a className="text-primary cursor-pointer">Pay online here</a></div>
    </div>
    <div>
      <div className="fond-bold display-6">Pay by</div>
      <div><a className="text-primary cursor-pointer" onClick={props.submit}>Cash</a></div>
    </div>
  </div>
  </>
  ) 
}
