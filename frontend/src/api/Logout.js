import { MLBROKERAGELOGININSTANCE } from "../helper/axios";

const UserLogout =  async() =>{


    const redirect = process.env.REACT_APP_REDIRECT_URL;
    const response = await MLBROKERAGELOGININSTANCE.post(
			`/api/logout?redirect=${encodeURIComponent(redirect)}`
		);
    console.log("logout success:", response
    );
    return response;
}

export default UserLogout;