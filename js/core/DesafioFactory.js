import { Desafios } from "../desafios.js";

export function DesafioFactory(storage) {
  let atual = storage.get();

  function getAtual() {
    return atual;
  }

  function getDados() {
    return Desafios[atual];
  }

  function podeAvancar() {
    return atual < storage.get();
  }

  function avancar() {
    if (atual < Desafios.length - 1) {
      storage.set(atual+1);
    }
  }

  function proximo() {
    if (atual < Desafios.length - 1) {
      atual++;
    }
  }

  function anterior() {
    if (atual > 0) atual--;
  }

  function validar(codigo) {
    return Desafios[atual].validar(codigo);
  }

  function isUltimo() {
    return atual >= Desafios.length - 1;
  }

  return {
    getAtual,
    getDados,
    podeAvancar,
    avancar,
    proximo,
    anterior,
    validar,
    isUltimo
  };
}
