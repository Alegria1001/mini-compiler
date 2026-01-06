
/**
 * Tipos de tokens suportados pela linguagem.
 */
enum TokenType {
    NUMBER = "NUMBER",       // Números inteiros
    LET = "LET",             // Palavra-chave 'let'
    PRINT = "PRINT",         // Palavra-chave 'print'
    ASSIGN = "ASSIGN",       // Operador de atribuição '='
    MINUS = "MINUS",         // Operador de subtração '-'
    DIVIDED = "DIVIDED",     // Operador de divisão '/'
    MULT = "MULT",           // Operador de multiplicação '*'
    PLUS = "PLUS",           // Operador de adição '+'
    SEMICOLON = "SEMICOLON", // Ponto e vírgula ';'
    IDENTIFIER = "IDENTIFIER", // Identificadores (nomes de variáveis)
    EOF = "EOF"              // Fim do arquivo (End Of File)
}

/**
 * Estrutura de um Token.
 */
interface Token {
    type: TokenType, // O tipo do token
    value: string    // O valor textual do token
}

export { Token, TokenType }