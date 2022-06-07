export default function Button({info}){
    return(
        <div className="container-button-login">
            <button className="button-login">{info}</button>
        </div>
    )
}
export function ButtonPage({info}){
    return(
        <div className="container-button-login container-button-login-page">
            <button className="button-login button-login-page">{info}</button>
        </div>
    )
}