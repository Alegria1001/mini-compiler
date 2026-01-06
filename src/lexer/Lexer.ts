import { Token, TokenType } from "./ILexer";


/**
 * O Lexer é responsável por transformar o código-fonte (string) em uma sequência de Tokens.
 */
class Lexer {

    private text: string;
    private position: number = 0;

    constructor(text: string) {
        this.text = text
    }

    /**
     * Retorna o caractere na posição atual sem avançar o ponteiro.
     */
    private peek(): string {
        return this.text[this.position] || "";
    }

    /**
     * Avança a posição do ponteiro no texto.
     */
    private advance() {
        this.position++;
    }

    /**
     * Analisa o texto e retorna o próximo token encontrado.
     */
    public getNextToken(): Token {
        while (this.position < this.text.length) {
            const char = this.peek();

            // Definição de padrões (espaços, números, letras)
            const isBlankSpace = /\s/
            const isNumber = /[0-9]/
            const isWord = /[a-zA-Z]/

            // Ignorar espaços em branco
            if (isBlankSpace.test(char)) {
                this.advance();
                continue;
            }

            // Mapeamento de caracteres individuais para seus respectivos tokens
            if (char === "+") {
                this.advance();
                return { type: TokenType.PLUS, value: "+" }
            }
            if (char === "/") {
                this.advance();
                return { type: TokenType.DIVIDED, value: "/" }
            }

            if (char === "*") {
                this.advance();
                return { type: TokenType.MULT, value: "*" }
            }

            if (char === "-") {
                this.advance();
                return { type: TokenType.MINUS, value: "-" }
            }

            if (char === "=") {
                this.advance();
                return { type: TokenType.ASSIGN, value: "=" }
            }

            if (char === ";") {
                this.advance();
                return { type: TokenType.SEMICOLON, value: ";" }
            }

            // Capturar números (sequência de dígitos)
            if (isNumber.test(char)) {
                let num = "";
                while (isNumber.test(this.peek())) {
                    num += this.peek();
                    this.advance();
                }
                return { type: TokenType.NUMBER, value: num }
            }

            // Capturar palavras (identificadores ou palavras reservadas)
            if (isWord.test(char)) {
                let word = "";
                while (isWord.test(this.peek())) {
                    word += this.peek();
                    this.advance();
                }

                // Verificar se a palavra é uma palavra-chave reservada
                if (word === "let") return { type: TokenType.LET, value: word }
                if (word === "print") return { type: TokenType.PRINT, value: word }

                // Se não for palavra-chave, é um identificador (nome de variável)
                return { type: TokenType.IDENTIFIER, value: word }
            }
            throw new Error(`Caractere inválido: ${char}`);
        }

        // Fim do arquivo atingido
        return { type: TokenType.EOF, value: "" }
    }

}

export default Lexer;