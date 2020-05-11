import React, {useState } from "react";
import {DebounceInput} from 'react-debounce-input';
import "./searchtable.css" ;

type listProps = {
    employeeList: any,
  } 

const SearchTable = ({employeeList}: listProps) => {
    // {firstName:String, lastName:string, role:string, email:string, pay:number}
    //const [list, setstate] = useState(employeeList);
    const [searched, setSearched] = useState(employeeList);
    //const [show, setShow ] = useState(false);
    //usereduce to replace both top stuff 
    const filterName = (text:string):Array<any> => {
        //let filtered:Array<any> = [];
        let filtered = employeeList.filter( (el:any) => {
              let fullName = `${el.firstName} ${el.lastName}`;
             return fullName.toLowerCase().trim().indexOf(text) > -1 ;
           });
        
        console.log(filtered);
        return filtered ;
    }

    // filter roles
    const filterRole = (text:string):Array<any> => {
      //let filtered:Array<any> = [];
      let filtered = employeeList.filter( (el:any) => {
           return el.role.toLowerCase().trim().indexOf(text) > -1 ;
         });
    
      console.log(filtered );
      return filtered ;
  }

    //greedy filter all text combined
    /*
    const filterText = (text:string):Array<any> =>{
      let results = employeeList.filter( (el:any) => {
        let alltext = `${el.firstName}${el.lastNAme}${el.role}${el.email}`;
        return alltext.toLowerCase().trim().indexOf(text) > -1
      } );
      return results;
    }*/

    // filter pay 
    /*
    const filterPay = (text:string): Array<any> => {
      //let payList:Array<any> = [];
        let payList = employeeList.filter( (el:any) => {
        let pay = "" + el.pay ; 
        return pay.trim().indexOf(text) > -1 ;
        });
    
      return payList ;
    }*/
    const filterEmail = (text:string):Array<any> => {
      let results = employeeList.filter( (el:any) => {
        let email = el.email ;
        return email.toLowerCase().trim().indexOf(text) > -1
      } );
      return results;
    }

    //call filters based on returens from other filters 
    const filter = (text:string) =>{
        //return filterText(text);
        let nameTest = filterName(text); 
        if(nameTest.length){
            console.log("found name match");
            setSearched(nameTest);
        } else if( !nameTest.length ){
          console.log("checking roles");
          let roles = filterRole(text);
          if( roles.length ){
           setSearched(roles);
          } else {
            console.log("test email");
            let emails = filterEmail(text);
             if( emails.length){ 
               setSearched(emails);
              } else {
                setSearched([]);
              } ;
          }
        }  
   }
   const sortBy = (field:string) => {
    return function(a:any, b:any) {
      var nameA = a[field].toUpperCase(); // ignore upper and lowercase
      var nameB = b[field].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
      
      /*
        if (a[field] > b[field]) {
            return -1;
        } else if (a[field] < b[field]) {
            return 1;
        }
        return 0;*/
       }
   }
   //search based on input if its a number test numbers 
    
       const sort = ( sortType:string) =>{
         switch(sortType){
           case "firstName":
             console.log(sortType);
             let sortName  = searched.slice().sort(sortBy(sortType));
             setSearched( sortName );
             break;
           case "lastName":
            console.log(sortType);
            let sortLastName  = searched.slice().sort(sortBy(sortType));
             setSearched( sortLastName );
            break;
           case "pay":
            console.log(sortType);
            let sortPay = searched.slice().sort( (a:any, b:any) => a.pay - b.pay );
            setSearched( sortPay );
            break;
           case "role":
            console.log(sortType);
            let sortRole  = searched.slice().sort(sortBy(sortType));
             setSearched( sortRole );
            //searched.sort( sortText(a,b) );
            break;
          case "email":
            console.log(sortType);
            let sortEmail  = searched.slice().sort(sortBy(sortType));
            setSearched( sortEmail );
            break;
         }
       }
       const search = (text:any) =>{
           text = text.toLowerCase();
            if(text.length){
               return filter(text);
            }else{
              return setSearched(employeeList) ;
            }
       }
       /*
       const [state, dispatch] = useReducer( (state:any, action:any) =>{
        //could make action an object then deconstruct it
        switch(action.actionType){
          case "filter":
            return  search(  action.text);
          case "sort":
            sort(action.text);
            return state; 
           default:
            return state ; 
        }
  
      }, {og: employeeList, search: employeeList, sort:0 });*/
       //  if invalid input 
       /*let errorAlert = null ;
       if( show  ){
        errorAlert = (
          <div className="alert alert-danger" role="alert">
            Please enter valid search characters! 
          </div>
        );
      
      }*/
      //<th scope="col" onClick={() => dispatch({ actionType:"sort"   ,text: "firstName" }) }>First Name</th>
      // onChange={e => search(e.target.value.toLowerCase()) }  {errorAlert}
    return ( 
     <>
   
    <div className="row mb-3 card">
    <div className="form-group mx-auto my-3">
       <label>Search Employee Table</label>
       <DebounceInput
          className="form-control"  id="search" aria-describedby="search input" placeholder="Search text"
          minLength={1}
          debounceTimeout={1000}
          onChange={(e) => search(e.target.value)} />
      <small id="search" className="form-text text-muted">Search will dynamically change the table below!</small>
    </div>
  </div>
  <div className="row">
    <table className="table table-hover">
      <thead className="thead-bg">
        <tr>
          <th scope="col">#</th>
          <th scope="col" className="t-th" onClick={() => sort("firstName") }>First Name</th>
          <th scope="col" className="t-th"  onClick={() => sort("lastName") }>Last Name</th>
          <th scope="col" className="t-th"  onClick={() => sort("role") }>Role</th>
          <th scope="col" className="t-th"  onClick={() => sort("email") }>Email</th>
          <th scope="col" className="t-th"  onClick={() => sort("pay") }>Pay</th>
        </tr>
      </thead>
      <tbody>
      { searched.map((employee:any, index:number) => {
      return (
          <tr key={index}>
            <td>{index}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.role}</td>
            <td>{employee.email}</td>
            <td>{employee.pay}</td>
          </tr>
       )
     })
    }
      </tbody>
    </table>
  </div>
  </>
)
}

export default SearchTable;




