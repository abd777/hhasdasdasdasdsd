import firebase from "firebase";
export default {
    actions:{
        "auth/loginAttempt"(context,payload){
           return new Promise((resolve,reject)=>{
           firebase.auth().signInWithEmailAndPassword(payload.userDetails.email,payload.userDetails.password).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            });              
           })
        },
    "auth/signOut"(context) {
            return new Promise((resolve, reject) => {
                firebase.auth().signOut().then(() => {
                    resolve()
                }).catch(err => {
                    reject(err)
                });
            })
    }
 }
}