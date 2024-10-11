export const randomString = (n) =>{
    let charSet = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm'
    let str = ''

    for(let i=0; i<n; i++){
        str += charSet[(Math.floor(Math.random()*100) % 62)]
    }
    return str
}