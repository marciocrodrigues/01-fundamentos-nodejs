// Importação de clientes via CSV (Excel) - exemplo
// 1gb - 1.000.000
// se não estiver usando conceito de stream, o node vai precisar ler todo o arquivo
// para depois poder processar -> o upload precisa terminar totalmente

// 10mb/s - 100s
// 100s -> Upload terminado, inicia-se processamento do mesmo

// com conceito de stream enquanto estiver fazendo o upload e tendo já linhas no exemplo acima
// já pode ser iniciado o processamento do mesmo aos poucos

// process.stdin
// .pipe(process.stdout) 

import { Readable, Writable, Transform } from 'node:stream'

// Exemplo de leitura de stream e sem terminar todo o recebimento dos dados
class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++

        // simulando recebendo os dados por partes
        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

// Server para transformar o dado, fica no meio entre a leitura e escrita
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

// processamento e escrita dos dados recebidos a partir da leitura
class MultiplyByTenStream extends Writable {
    //chunk -> pedaço do buffer recebido
    //encoding -> tipo do valor recebido
    //callback -> função chamada ao terminar o recebimento e processamento do dado
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())