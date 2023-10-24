import { useReducer, useState, useContext } from "react";
import { number, object, string } from "yup";

export const Verificar = () => {
  schema.validate({nome, qauntidade, preco})
  .then(()=>{
    setNomeErro("")
    setQuantidadeErro("")
    setPrecoErro("")
  }).catch((err)=>{
    setNomeErro("")
    setQuantidadeErro("")
    setPrecoErro("")
    err.inner.forEach((err) => {
        if(err.path === "nome"){
            setNomeErro(err.message)
        } else if(err.path === "quantidade"){
            setQuantidadeErro(err.message)
        } else if(err.path === "preco"){
            setPrecoErro(err.message)
        }
        
    });
  })
};  
