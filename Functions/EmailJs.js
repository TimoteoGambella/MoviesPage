import emailjs from '@emailjs/browser';
import swal from "sweetalert";

export function sendEmail (template,data) {

    emailjs.send('service_rkbguuj', template, data,'EtNdfQu1yjfSB4fDT')
            .then(function(response) {
            swal("MAIL ENVIADO","Se envio el mail","info")
            return(true)
            }, function(error) {
            swal("OCURRIO UN ERROR","Vuelva a intentarlo","error")
            return(false)
        });
}