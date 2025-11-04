export default function emailTest(e){
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegex.test(e)
}

export let checkUserLogin = () => {
    let user = localStorage.getItem('user');
    if(user){
        return true;
    }else{
        return false;
    }
}

export let UserID = () => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user)
    // console.log(user.userId)
    return user.userId;
}
