<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: text/json; charset=iso-8859-1');
//header('Content-Type: text/html; charset=iso-8859-1');

if(!isset($_GET['cep'])){
	header("HTTP/1.0 404 Not Found");
  	die(' { "erro":"Parametro vazio/inválido" }');
}

$cep = $_GET['cep'];

$postdata = http_build_query(
  array(
    'cepEntrada' => $cep,
    'metodo' => 'buscarCep'
  )
);

$opts = array('http' =>
  array(
    'method'  => 'POST',
    'header'  => 'Content-type: application/x-www-form-urlencoded',
    'content' => $postdata
  )
);

$context  = stream_context_create($opts);
$html = file_get_contents('http://m.correios.com.br/movel/buscaCepConfirma.do', false, $context);
$html = mb_convert_encoding($html, 'UTF-8', "ISO-8859-1");

$html = explode('<div class="caixacampobranco">' , $html );

$infoAdress = array();

// se tiver alguma caixacampobranca (aonde ficam os resultados da requisição do correio)
if (count($html) > 1) {

  // html recebido dos correios e separado por divs com class "caixacampobranca"
  $html = explode('</div>' , $html[1]);

  // html da primeira ".caixacampobranca" separado nas quebras de linha
  $pedacos = explode('<br/>',$html[0]);

  // roda os pedaços para retirar as informações
  foreach ($pedacos as $key => $value) {

    // remove espaços (quando tiver mais de 2)
    $dados = preg_replace('/\s{2,}/i','',$value);

    // separa os span´s colocando titulo||valor
    $dados = preg_replace('/<span class="resposta">([\w\sà-ú:\/]{1,})<\/span><span class="respostadestaque">([^<]{1,})<\/span>/im','$1||$2',$dados);

    // separa os dados explodindo o ||
    $dados = explode('||',$dados);

    if(count($dados) == 2){

		$key = str_replace(" ","",$dados[0]);
		$value = trim($dados[1]);

		if(strtolower($key) == "endereço:" || strtolower($key) == "logradouro:")
			$infoAdress["rua"] = $value;

		if(strtolower($key) == "bairro:")
			$infoAdress["bairro"] = $value;
		
		if(strtolower($key) == "localidade/uf:"){
			$valInfo = explode('/', $value);

			$infoAdress["cidade"] = $valInfo[0];
			$infoAdress["estado"] = substr($valInfo[1], 0, 2);
		}
	}
  }

  echo json_encode($infoAdress);

}else{
	header("HTTP/1.0 404 Not Found");
  	die(' { "erro":"cep inválido" }');
}

?>