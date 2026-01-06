import { Token, TokenType } from "../lexer/ILexer";
import Lexer from "../lexer/Lexer";
import ASTNode from "./IParser";


/**
 * O Parser é responsável por transformar uma sequência de Tokens em uma Árvore de Sintaxe Abstrata (AST).
 * Utiliza a técnica de Descida Recursiva para processar a gramática.
 */
class Parser {

    private lexer: Lexer;
    private currentToken: Token;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    /**
     * Consome o token atual se ele for do tipo esperado, caso contrário, lança um erro.
     */
    private eat(type: TokenType) {
        if (this.currentToken.type === type) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            throw new Error(`Erro sintático: esperado ${type}, encontrado ${this.currentToken.type}`);
        }
    }

    /**
     * Processa um 'fator', que pode ser um número ou um identificador.
     * Gramática: factor -> NUMBER | IDENTIFIER
     */
    private factor(): ASTNode {
        const token = this.currentToken
        if (token.type === TokenType.NUMBER) {
            this.eat(TokenType.NUMBER);
            return { type: "NumberLiteral", value: Number(token.value) }
        }

        if (token.type === TokenType.IDENTIFIER) {
            this.eat(TokenType.IDENTIFIER);
            return { type: "Identifier", name: token.value }
        }
        throw new Error("Factor inválido");
    }

    /**
     * Processa expressões aritméticas respeitando a precedência e associatividade.
     * Gramática: expr -> factor ((PLUS | MINUS | MULT | DIVIDED) factor)*
     */
    private expr(): ASTNode {
        let node = this.factor();

        while (this.currentToken.type === TokenType.PLUS) {
            this.eat(TokenType.PLUS);
            node = {
                type: "BinaryExpression",
                operator: "+",
                left: node,
                right: this.factor()
            }
        }

        while (this.currentToken.type === TokenType.DIVIDED) {
            this.eat(TokenType.DIVIDED);
            node = {
                type: "BinaryExpression",
                operator: "/",
                left: node,
                right: this.factor()
            }
        }

        while (this.currentToken.type === TokenType.MULT) {
            this.eat(TokenType.MULT);
            node = {
                type: "BinaryExpression",
                operator: "*",
                left: node,
                right: this.factor()
            }
        }

        while (this.currentToken.type === TokenType.MINUS) {

            this.eat(TokenType.MINUS);
            node = {
                type: "BinaryExpression",
                operator: "-",
                left: node,
                right: this.factor()
            }
        }

        return node;
    }

    /**
     * Processa um comando (statement), como declaração de variável ou comando de impressão.
     * Gramática: 
     *  - statement -> LET IDENTIFIER ASSIGN expr SEMICOLON
     *  - statement -> PRINT expr SEMICOLON
     */
    private statement(): ASTNode {
        // Caso: let x = expression;
        if (this.currentToken.type === TokenType.LET) {
            this.eat(TokenType.LET);

            const id = this.currentToken.value;
            this.eat(TokenType.IDENTIFIER);
            this.eat(TokenType.ASSIGN);

            const value = this.expr();
            this.eat(TokenType.SEMICOLON);

            return {
                type: "VariableDeclaration",
                id,
                value
            }
        }

        // Caso: print expression;
        if (this.currentToken.type === TokenType.PRINT) {
            this.eat(TokenType.PRINT);

            const value = this.expr();
            this.eat(TokenType.SEMICOLON);

            return {
                type: "PrintStatement",
                value
            }
        }
        throw new Error(`Comando inválido`);
    }

    /**
     * Inicia o processo de análise sintática e retorna a lista de nós da AST.
     */
    public parse(): ASTNode[] {
        const statements: ASTNode[] = [];
        while (this.currentToken.type !== TokenType.EOF) {
            statements.push(this.statement());
        }
        return statements
    }
}

export default Parser;