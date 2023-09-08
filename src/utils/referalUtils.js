const referalUtils =() =>{
   const letter = "abcdefghijklnmopqrstuvwxyz";
   let referal=[];
   for( let x=0; x <= 3; x++){
    referal += letter[Math.floor(Math.random()*letter.length)];
   } 
   referal+=Math.floor(Math.random()*999);
   return referal;
};

export default referalUtils;