
 export const valid = (text:string) => {
    let pattern = new RegExp( '/[A-Za-z0-9@]+/g');
    console.log( pattern.test(text)) ;
    if(pattern.test(text) ){
      return false;
    }     
    return true ;
 }
