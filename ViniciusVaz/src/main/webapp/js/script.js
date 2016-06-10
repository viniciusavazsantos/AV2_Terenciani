$(document).ready(function () {
//MARCARA TELEFONE E CEP          
    $('#txt_telefone').mask('(99) 99999-9999');
    $('#txt_cep').mask('99.999-999');

//CPF VERIFICAR  
    $("#txt_cpf").blur(function () {
        var cpf = $("#txt_cpf").val();
//SE VAZIO ALERTA NA TELA.
        if (cpf == "") {
            $("#txt_cpf").focus();
            alertar("CPF Vazio!");
        } else {
//SE NAO VAZIO CHAMA FUÇAO CPF
            alertar2();
            validarCPF(cpf);
        }
    });

// VALIDAÇÃO NOME
    $("#txt_nome").blur(function () {
        if ($("#txt_nome").val() == "") {
            $("#txt_nome").focus();
            alertar("Nome Obrigatório");
            return false;
            //alert("Nome Obrigatório!")  
        } else {
            alertar2();
            return true;
        }
    });

//DIGITACAO LETRAS MAIUSCULAS NO NOME.
    $("#txt_nome").keyup(function () {
        $(this).val($(this).val().toUpperCase());
    });

//DIGITAÇAO DO NOME SOMENTE COM LETRAS.
    $("#txt_nome").keyup(function () {
        var valor = $("#txt_nome").val().replace(/[^\w]|\d/g, ' ');
        $("#txt_nome").val(valor);
    });

//VALIDAÇÃO ESTADO CIVIL.
    $("#txt_estadoCivil").blur(function () {
        if ($('#txt_estadoCivil').val() == "Escolher Estado Civil") {
            alertar("Escolha uma opção");
            $("#txt_estadoCivil").focus();
        } else {
            alertar2();
        }
    });

//SELECT NAO PODE SER ESCOLHER SEXO.
    $("#txt_sexo").blur(function () {
        if ($('#txt_sexo').val() == "Escolher Sexo") {
            alertar("Selecione o Sexo!");
            $("#txt_sexo").focus();
        } else {
            alertar2();
        }
    });
//VERIFICAR CEP NO SERVLET
    $('#txt_cep').change(function (event) {
        var texto = $('#txt_cep').val();
        $.ajax({
            type: 'GET',
            url: 'ServletAjax',
            data: {
                txt_cep: texto
            },
            beforeSend: function () {
            },
            success: function (nome) {
                $(nome).find('texto').each(function () {
                    var msg = $(this).text();
                    alert(msg);

                    $('#txt_cep').focus();

                });
                $(nome).find('endereco').each(function () {
                    var endereco = $(this).text();
                    $('#txt_endereco').val(endereco);
                });
                $(nome).find('bairro').each(function () {
                    var bairro = $(this).text();
                    $('#txt_bairro').val(bairro);
                });
                $(nome).find('estado').each(function () {
                    var estado = $(this).text();
                    $('#txt_estado').val(estado);
                });
                $(nome).find('cidade').each(function () {
                    var cidade = $(this).text();
                    $('#txt_cidade').val(cidade);
                });
            },
            error: function (request, status, error) {
                alert(request.responseText);
                $('#txt_cep').focus();
                return false;
            }
        });
    });
//VALIDAÇÃO EMAIL
    $('#txt_email').blur(function () {
        var email = $('#txt_email').val();
        if ($.trim(email).length == 0) {
            alertar('E-Mail Obrigatório!');
            $('#txt_email').focus();
            return false;
        } else {
            alertar2();
        }

        if (validateCaseSensitiveEmail(email)) {
            return false;
        } else {
            alertar('Email invalido!');
            $('#txt_email').focus();
            return false;
        }
    });
    function validateCaseSensitiveEmail(email)
    {
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (reg.test(email)) {
            return true;
        } else {
            return false;
        }
    }
//VALIDA SENHA
    $("#txt_senha").blur(function () {
        if ($("#txt_senha").val().length < 6) {
            alertar("Senha deve conter no minimo 6 caracteres!");
            $("#txt_senha").focus();
            return false;
        } else if ($("#txt_senha").val().indexOf(' ', '0') != -1) {
            alertar("Senha não pode conter espaços vazios!");
            $("#txt_senha").focus();
            return false;
        } else {
            alertar2();
        }
        return false;
    });
//CAMPO OBS NAO PODE SER VAZIO
    $("#txt_obs").on("keyup", function () {
        $(this).val($(this).val().toUpperCase());
        var observacao = parseInt($(this).val().length);
        var limite = 200;
    });
    $("#txt_obs").blur(function () {
        if ($("#txt_obs").val().length < 3) {
            alertar("Observação Obrigatória!");
            $("#txt_obs").focus();
        } else {
            alertar2();
        }
    });
// FUNCAO VALIDAR PROMOCAO
    $("#txt_receberpS").click(function () {
        if ($("#txt_receberpS").is(':checked')) {
            var msg = "A qualquer momento voce pode cancelar o recebimento <br> dos e-mails de promoção\
		enviando um e-mail com o <br> assunto STOP MAIL para o endereço contato@estacio.br";
            $("#txt_div").html(msg);
        }
    });
    $("#txt_receberpN").click(function () {
        if ($("#txt_receberpN").is(':checked')) {
            var msg = "";
            $("#txt_div").html(msg);
        }
    });
//LIMPAR FORMULARIO
    $("#cancelar").click(function () {
        location.reload();
    });
// SALVANDO, EDITANDO E EXLUINDO DO BD.
    var operacao = "A";
    var indice_selecionado = -1;
    var tbDados = localStorage.getItem("tbDados");

    tbDados = JSON.parse(tbDados);
    if (tbDados == null) {
        tbDados = [];
    }
    $("#formCadastro").on("submit", function () {


        //VALIDANDDO TODOS OS CAMPO SE NÃO VAZIO.
        var cpf = $("#txt_cpf").val();
        var nome = $("#txt_nome").val();
        var estadoCivil = $("#txt_estadoCivil").val();
        var sexo = $("#txt_sexo").val();
        var telefone = $("#txt_telefone").val();
        var cep = $("#txt_cep").val();
        var email = $("#txt_email").val();
        var senha = $("#txt_senha").val();
        var obs = $("#txt_obs").val();
        var receberpS = $("#txt_receberpS").is(":checked");
        var receberpN = $("#txt_receberpN").is(":checked");

        if (cpf == "") {
            alertar("CPF obrigatório!")
            $("#txt_cpf").focus();
            return false;
        } else if (nome == "") {
            alertar("Nome Obrigatório!")
            $("#txt_nome").focus();
            return false;
        } else if (estadoCivil == "Escolher Estado Civil") {
            alertar("Selecione Estado Civil")
            $("#txt_estadoCivil").focus();
            return false;

        } else if (sexo == "Escolher Sexo") {
            alertar("Selecione Sexo!")
            $("#txt_sexo").focus();
            return false;
        } else if (telefone == "") {
            alertar("Telefone Obrigatório")
            $("#txt_telefone").focus();
            return false;
        } else if (cep == "") {
            alertar("CEP Obrigatório!")
            $("#txt_cep").focus();
            return false;
        } else if (email == "") {
            alertar("E-Mail Obrigatório!")
            $("#txt_email").focus();
            return false;
        } else if (senha == "") {
            alertar("Senha Obrigatória!")
            $("#txt_senha").focus();
            return false;
        } else if (receberpS == receberpN) {
            alertar("Receber Promoção Obrigatório!")
            $("#txt_receberpS").focus();
            return false;
        } else if (obs == "") {
            alertar("Observação Obrigatória!")
            $("#txt_obs").focus();
            return false;
            // SE NÃO VAZIO CHAMA AS OPERAÇÕES.
        } else if (operacao == "A") {
            adicionarElemento();
        } else
            editarElemento();
    });
    $("#tbLista").on("click", ".btnEditar", function () {
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        var cli = JSON.parse(tbDados[indice_selecionado]);
        $("#txt_cpf").val(cli.cpf);
        $("#txt_nome").val(cli.nome);
        $("#txt_estadoCivil").val(cli.estadoCivil);
        $("#txt_sexo").val(cli.sexo);
        $("#txt_telefone").val(cli.telefone);
        $("#txt_cep").val(cli.cep);
        $("#txt_endereco").val(cli.endereco);
        $("#txt_bairro").val(cli.bairro);
        $("#txt_cidade").val(cli.cidade);
        $("#txt_estado").val(cli.estado);
        $("#txt_email").val(cli.email);
        $("#txt_senha").val(cli.senha);
        $("#txt_obs").val(cli.observacao);
        $("#txt_cpf").focus();

        Listar();

    });
    $("#tbLista").on("click", ".btnExcluir", function () {
        indice_selecionado = parseInt($(this).attr("alt"));
        Excluir();
        Listar();
    });

    function adicionarElemento() {
        var cliente = JSON.stringify({
            nome: $("#txt_nome").val(),
            cpf: $("#txt_cpf").val(),
            estadoCivil: $("#txt_estadoCivil").val(),
            sexo: $("#txt_sexo").val(),
            telefone: $("#txt_telefone").val(),
            cep: $("#txt_cep").val(),
            endereco: $("#txt_endereco").val(),
            bairro: $("#txt_bairro").val(),
            cidade: $("#txt_cidade").val(),
            estado: $("#txt_estado").val(),
            email: $("#txt_email").val(),
            senha: $("#txt_senha").val(),
            observacao: $("#txt_obs").val()

        });

        tbDados.push(cliente);
        localStorage.setItem("tbDados", JSON.stringify(tbDados));
        return true;

    }
    ;

//LISTAR NA TELA
    function Listar() {
        $("#tbLista").html("");
        $("#tbLista").html(
                "<thead>" +
                "   <tr>" +
                "       <th>CPF</th>" +
                "       <th>Nome</th>" +
                "       <th></th>" +
                "   </tr>" +
                "</thead>" +
                "<tbody>" +
                "</tbody>"
                );
        for (var i in tbDados) {
            var cli = JSON.parse(tbDados[i]);

            var novaLinha = $("<tr>");
            var cols = "";


            cols += "<td>" + cli.cpf + "</td>";
            cols += "<td>" + cli.nome + "</td>";
            cols += "<td>" +
                    "<span alt='" + i + "' class='btnEditar glyphicon glyphicon-pencil'/>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    "<span alt='" + i + "' class='btnExcluir glyphicon glyphicon-remove'/>" + "</td>";
            novaLinha.append(cols);

            $("#tbLista").append(novaLinha);
        }
    };

    Listar();

//EDITAR CADASTRO  
    function editarElemento() {

        tbDados[indice_selecionado] = JSON.stringify({
            nome: $("#txt_nome").val(),
            cpf: $("#txt_cpf").val(),
            estadoCivil: $("#txt_estadoCivil").val(),
            sexo: $("#txt_sexo").val(),
            telefone: $("#txt_telefone").val(),
            cep: $("#txt_cep").val(),
            endereco: $("#txt_endereco").val(),
            bairro: $("#txt_bairro").val(),
            cidade: $("#txt_cidade").val(),
            estado: $("#txt_estado").val(),
            email: $("#txt_email").val(),
            senha: $("#txt_senha").val(),
            observacao: $("#txt_obs").val(),
        });
        Listar();
        //ALTERAR ITEM DA TELA
        localStorage.setItem("tbDados", JSON.stringify(tbDados));

        operacao = "A"; //Volta ao padrão
        $("txt_cpf").focus();
        return false;

    }

//EXCLUIR CADASTRO    
    function Excluir() {

        bootbox.confirm("DESEJA REALMENTE EXCLUIR?", function (e) {
            if (e) {
                tbDados.splice(indice_selecionado, 1);
                localStorage.setItem("tbDados", JSON.stringify(tbDados));
                Listar();

            } else {
                location.reload();
            }

        });
    }
//SELECIONAR O QUANDO MOUSE PASSA.
    $("#tbLista tbody tr").hover(
            function () {
                $(this).addClass('destaque');
            },
            function () {
                $(this).removeClass('destaque');
            });

//TELEFONE NAO PODE SER BRANCO   
    $("#txt_telefone").blur(function () {
        if ($("#txt_telefone").val() == "") {
            alertar("Telefone Obrigatório!");
            $("#txt_telefone").focus();
        } else {
            alertar2();
        }
    });

    //CEP NAO PODE SER BRANCO   
    $("#txt_cep").blur(function () {
        if ($("#txt_cep").val() == "") {
            alertar("CEP Obrigatório");
            $("#txt_cep").focus();
        } else {
            alertar2();
        }
    });
});

// FUNCAO DE VALIDAÇAO DO CPF
function validarCPF(cpf) {
    var filtro = /^\d{3}.\d{3}.\d{3}-\d{2}$/i;

    if (!filtro.test(cpf))
    {
        alertar("CPF inválido. Tente novamente!");
        $("#txt_cpf").focus();
        return false;
    }

    cpf = remove(cpf, ".");
    cpf = remove(cpf, "-");

    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" ||
            cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
            cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
            cpf == "88888888888" || cpf == "99999999999")
    {
        alertar("CPF inválido. Tente novamente!");
        $("#txt_cpf").focus();
        return false;
    }

    soma = 0;
    for (i = 0; i < 9; i++)
    {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    resto = 11 - (soma % 11);
    if (resto == 10 || resto == 11)
    {
        resto = 0;
    }
    if (resto != parseInt(cpf.charAt(9))) {
        alertar("CPF inválido. Tente novamente!");
        $("#txt_cpf").focus();
        return false;
    }

    soma = 0;
    for (i = 0; i < 10; i++)
    {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto == 10 || resto == 11)
    {
        resto = 0;
    }
    if (resto != parseInt(cpf.charAt(10))) {
        alert("CPF inválido. Tente novamente!");
        $("#txt_cpf").focus();
        return false;
    }

    return true;
    alertar2();
}
;

// FUNCAO DE REMOVER DA LISTA.
function remove(str, sub) {
    i = str.indexOf(sub);
    r = "";
    if (i == -1)
        return str;
    {
        r += str.substring(0, i) + remove(str.substring(i + sub.length), sub);
    }
    return r;
}
;

//FUNCAO MASCARA CPF
function mascara(o, f) {
    v_obj = o;
    v_fun = f;
    setTimeout("execmascara()", 1);
}
;
function execmascara() {
    v_obj.value = v_fun(v_obj.value);
}
;

function cpf_mask(v) {
    v = v.replace(/\D/g, "");                 //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2");    //Coloca ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2");    //Coloca ponto entre o setimo e o oitava dígitos
    v = v.replace(/(\d{3})(\d)/, "$1-$2");    //Coloca ponto entre o decimoprimeiro e o decimosegundo dígitos
    return v;
}
;

function alertar(tipo) {
    $("#alert").html("");
    $("#alert").html(
            "<div class='alert alert-danger center'>" +
            "   <strong> Atenção: </strong>" + tipo +
            "</div>"
            );
}
;
function alertar2() {
    $("#alert").html("");
}
;
