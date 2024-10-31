import { MLBROKERAGELOGININSTANCE } from "../helper/axios";

const LogoutUser = async() =>{
    try{
        const response = await MLBROKERAGELOGININSTANCE.get(`/logout?redirect_url=${process.env.REACT_APP_REDIRECT_URL}`)
        return response;

    }catch{
        console.log("Error");
    }
}
export default LogoutUser;