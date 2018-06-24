$(document).ready(()=>{
    console.log('JQuery loaded');
     $('[data-toggle="tooltip"]').tooltip();

    let novoCandidato = true;

    let activeID = null;

    let validName = false;
    let validAge = false;
    let validCPF = false;
    let validCadJus = false;
    let validPass = false;


    //Carregar candidatos do backend;
function carregarBack(){
    $('#listaCand').empty();
    $.get("http://andrebordignon.esy.es/php/consultacandidatos.php", (data, status) => {
        if (status == 'success'){
            json = JSON.parse(data);
            for (let i=0; i<json.length; i++){
                let cand = json[i];
                let cTR = ('<tr id="'+cand.idcandidato+'">'
                    +'<td>'+cand.nome+'</td>'
                    +'<td>'+cand.cadjus+'</td>'
                    +'<td>'+calculaIdade(cand.datanasc)+'</td>'
                    +'</tr>')
                $('#listaCand').append(cTR);
                $('#'+cand.idcandidato).click(()=>{
                    novoCandidato = false;
                    activeID = (cand.idcandidato);
                    $('#btn_excluir').prop("disabled",false);
                    $('#detailsName').val(cand.nome);
                    $('#detailsDataNasc').val(cand.datanasc);
                    $('#detailsEmail').val(cand.email);
                    $('#detailsCPF').val(cand.cpf);
                    $('#detailsCadJus').val(cand.cadjus);
                    $('#detailsSenha').val(cand.senha);
                    $('#detailsSenhaC').val(cand.senha);
                    $('#detailsRua').val(cand.rua);
                    $('#detailsNumero').val(cand.numero);
                    $('#detailsBairro').val(cand.bairro);
                    $('#detailsCidade').val(cand.cidade);
                    $('#detailsEstado').val(cand.estado);
                    validateAll();
                });
            }
        }
    });
}

    //novo candidato
    $('#btn_novocand').click(()=>{
        setNew();
    });

    //salvar alterações
$('#btn_salvar').click(()=>{
    let cand = {}
    cand.nome = $('#detailsName').val();
    cand.dataNasc = $('#detailsDataNasc').val();
    cand.email = $('#detailsEmail').val();
    cand.cpf = $('#detailsCPF').val();
    cand.cadjus = $('#detailsCadJus').val();
    cand.senha = $('#detailsSenha').val();
    cand.rua = $('#detailsRua').val();
    cand.numero = $('#detailsNumero').val();
    cand.bairro = $('#detailsBairro').val();
    cand.cidade = $('#detailsCidade').val();
    cand.estado = $('#detailsEstado').val();
    if (validName &&
        validAge &&
        validCPF &&
        validCadJus &&
        validPass)
    {
        if (novoCandidato){
            //Salvar novo candidato
            $.post('http://andrebordignon.esy.es/php/incluicandidato.php',
                cand,
                (data, status) => {
                    if (status == 'success'){
                        setNew();
                        carregarBack();
                    }
                }
            );
        }
        else {
            //salvar alterações no candidato existente
            $.post('http://andrebordignon.esy.es/php/atualizacandidato.php',
                cand,
                (data, status) => {
                    if (status == 'success'){
                        carregarBack();
                        setNew();
                    }
                }
            );
        }
    }
});

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

//Helpers
    function calculaIdade(idadeString){
        let dataNasc = new Date(idadeString);
        let today = new Date();
        let ageDate = new Date(today-dataNasc);
        let age = ageDate.getUTCFullYear() - 1970;
        return age;
    }

    function setNew(){
        novoCandidato = true;
        activeID = null;
        $('#btn_excluir').prop("disabled",true);
        $('#detailsName').val('');
        $('#detailsDataNasc').val('');
        $('#detailsEmail').val('');
        $('#detailsCPF').val('');
        $('#detailsCadJus').val('');
        $('#detailsSenha').val('');
        $('#detailsSenhaC').val('');
        $('#detailsRua').val('');
        $('#detailsNumero').val('');
        $('#detailsBairro').val('');
        $('#detailsCidade').val('');
        $('#detailsEstado').val('');
    }


//Validations
    function validateAll(){
        validateName();
        validateAge();
        validateCadJus();
        validateCPF();
        validatePass();
    }

    function validateName(){
        let name = $('#detailsName').val();
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
        let age = calculaIdade(dataNasc);
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

    carregarBack();
});

