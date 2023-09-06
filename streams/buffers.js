// buffer é a representação de um espaço da memoria, são dados que ficam um tempo até serem tratados e serem removidos
// buffer guarda na memoria de forma binaria, assim sendo mais preformatico o seu processamento

const buf = Buffer.from("OK")

console.log(buf.toJSON())