export const checkLocalStorage = () =>{
  const token = localStorage.getItem('token')

  return token?token:null;
}
