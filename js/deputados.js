$(document).ready(()=>{
    console.log('JQuery loaded');
     $('[data-toggle="tooltip"]').tooltip();

    let validName = false;
    let validAge = false;
    let validCPF = false;
    let validCadJus = false;
    let validPass = false;

    $('#detailsName').change(()=>{
        validateName(); 
    });
    $('#detailsDataNasc').change(()=>{
        validateAge(); 
    });
    $('#detailsCPF').change(()=>{
        validCPF = validateCPF();
		showCPFWarning(validCPF);
    });
	$('#detailsCadJus').change(()=>{
		validateCadJus();
	});
	$('#detailsSenha').change(()=>{
		validatePass();
	});
	$('#detailsSenhaC').change(()=>{
		validatePass();
	});


//Validations
    function validateName(){
        let name = $('#detailsName').val();
        console.log(name.length);
        if(name.length>255 || name.length<=0){
            $('#validName').css({"color":"red",  "display":"inherit"});
            validName = false;
        } else {
            validName = true;
            $('#validName').css({'display':'none'});
        }
    }

    function validateAge(){
        let dataNasc = $('#detailsDataNasc').val();
        dataNasc = new Date(dataNasc);
        let today = new Date();
        let ageDate = new Date(today-dataNasc);
        let age = ageDate.getUTCFullYear() - 1970;
        if (age<18){
            $('#validAge').css({"color":"red",  "display":"inherit"});
            validAge = false;
        } else {
            validAge = true;
            $('#validAge').css({'display':'none'});
        }
    }

	function validateCadJus(){
		let cadJus = $('#detailsCadJus').val();
		if (cadJus<1 || cadJus>5000){
            $('#validCadJus').css({"color":"red",  "display":"inherit"});
            validCadJus = false;
		} else {
            validCadJus = true;
            $('#validCadJus').css({'display':'none'});
		}
	}

	function validatePass(){
		let pass = $('#detailsSenha').val();
		let passC = $('#detailsSenhaC').val();
		if (pass !== passC){
            $('#validPass').css({"color":"red",  "display":"inherit"});
            validPass = false;
		} else {
            validPass = true;
            $('#validPass').css({'display':'none'});
		}
	}

    function validateCPF(){
        let cpf = $('#detailsCPF').val();
		var Soma;
	    var Resto;
	    Soma = 0;   
    	strCPF  = cpf.toString();
	    if (strCPF == "00000000000")
			return false;
	    for (i=1; i<=9; i++)
		Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); 
	   	Resto = (Soma * 10) % 11;
	    if ((Resto == 10) || (Resto == 11)) 
			Resto = 0;
	    if (Resto != parseInt(strCPF.substring(9, 10)) )
			return false;
		Soma = 0;
	    for (i = 1; i <= 10; i++)
	       Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
	    Resto = (Soma * 10) % 11;
	    if ((Resto == 10) || (Resto == 11)) 
			Resto = 0;
	    if (Resto != parseInt(strCPF.substring(10, 11) ) )
	        return false;
	    return true;
    }

	function showCPFWarning(valid){
		if (valid){
            $('#validCPF').css({'display':'none'});
		} else {
            $('#validCPF').css({"color":"red",  "display":"inherit"});
		}
	}

});
