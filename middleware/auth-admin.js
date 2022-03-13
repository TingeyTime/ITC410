import { Store } from "express-session";

export default async function({$auth}) {
    let user = $auth.state.user;
    if(user && user.admin) {
        // let the user in
    } else {
        $store.dispatch(/*error*/) // error
        redirect('/')
    }
}