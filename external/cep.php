<?php
//header("Access-Control-Allow-Origin: *");
header('Content-Type: text/json; charset=UTF-8');
//header('Content-Type: text/json; charset=iso-8859-1');

// API: https://viacep.com.br

if(!isset($_GET['cep']) || strlen($_GET['cep']) < 8 ) die('{ "erro":"sem cep repassado" }');

$cep = preg_replace("/[^0-9,.]/", "", $_GET['cep']);

try {
  $json = file_get_contents('https://viacep.com.br/ws/'.$cep.'/json/unicode/');
  $obj = json_decode($json);

  if(isset($obj->erro)) die('{ "erro":"cep inv&aacute;lido" }');

  echo '{
          "rua":"'.$obj->logradouro.'",
          "bairro":"'.$obj->bairro.'",
          "cidade": "'.$obj->localidade.'",
          "estado": "'.$obj->uf.'",
          "complemento": "'.$ob->complemento.'"
        }';

} catch (Exception $e) {
  die('{ "erro":"cep inv&aacute;lido" }');
}

?>