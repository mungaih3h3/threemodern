export interface Option{
    value: string;
    viewValue: string;
}

export interface Param{
    name: any; 
    value: any;
}

export interface User{
    propertyManagerID: number
    username: string
    password: string
    emailAddress: string 
    phoneNumber: string 
    userType: string
}

export interface Invoice {
    currentReading: number
    currentWaterCost: number
    invoiceAmount: number
    invoiceDate: []
    invoiceID: number
    invoiceMessage: string
    invoiceNumber: string
    invoiceStatus: string
    lastReading: number
    monthlyRent: number
    previousRentBalance: number
    previousWaterBalance: number
    rentPayable: number
    totalPayable: number
    unitCode: string
    unitsUsed: number
    waterCostPayable: number
    waterCostPerUnit: number
} 

export interface PropertyManager{
    propertyManagerID: string
    firstName: string
    middleName: string
    otherNames: string 
    phoneNumber: string 
    emailAddress: string
    krapin: string 
    idNumber: string
    idType: string
    propertyManagerCategory: string 
    propertyManagerType: string
}

export interface Unit {
    unitCode: string
    unitName: string
    unitDescription: string
    rentAmount: string
    rentDepositAmount: string
    electricityMeter: string
    waterMeter: string
    electricityMeterShare: string
    waterMeterShare: string
    unitStatus: string
    propertyID: string
}

export interface Property{
    propertyManagerID: string;  
    propertyCode: string;
    propertyName: string;
    referenceNumber: string;
    propertyDescription: string;
    title: string;
    ownershipType: string;
    propertyAddress: string; 
    propertyStatus: string; 
    propertyPurpose : string; 
    rentFrequency: string; 
    price: string;
    coverPhoto: string; 
    coverVideo: string; 
    contactName: string;
    phoneNumber: string; 
    emailAddress: string; 
    propertyType: string; 
}

export interface Tenant {
    idNumber: string;
    idType: string;
    tenantIdentifier: string;
    firstName: string;
    middleName: string;
    otherNames: string;
    pin: string;
    address: string;
    phoneNumber: string;
    emailAddress: string;
    vehicleRegistrationNumber: string;
    tenantType: string;
    registrationMode: string;
    tenantStatus: string;
    occupation: string;
    profilePhoto: string;
}

export interface Payment{
    unit: string; 
    invoice: string;
    amount: string;
}

export interface Invoice{
    month: string; 
    id: string; 
    unit: string; 
    rent: string; 
    services: string; 
    invoiced: string; 
    smsed: string;
}

export const expand = {
    width: '100%',
    left: '0', 
}
  
export  const contract =  {
    width: 'calc(100% - 200px )',
    left: '200px',
} 



export const holderDark = 'holder-dark'
export const contentDark = 'content-dark'







