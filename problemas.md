# Problemas Conhecidos

Atualmente não há problemas conhecidos em aberto. Todos os problemas listados anteriormente foram resolvidos.

## Resolvidos (Versão 0.2.0)

### Lexer
- [x] **Verificação de Palavras Reservadas:** Corrigido o loop para identificar corretamente identificadores com números (`var1`) e bloquear os que começam com números (`12nome`).
- [x] **Palavras Reservadas "Erradas":** Implementada validação para bloquear `VARx`, `REALx`, etc.
- [x] **Números Reais:** Implementada validação para impedir múltiplos pontos/vírgulas e terminação com separador (`12.`).
- [x] **Strings:** Implementado suporte a strings e erro para strings não terminadas.
- [x] **Relatório de Múltiplos Erros:** Lexer agora acumula e exibe todos os erros de uma vez.

### Parser
- [x] **Validações de Tipo:** Implementadas verificações sintáticas para TEXTO, LOGICO e NATURAL.
- [x] **Formatação de Erros:** Mensagens de erro agora incluem cores ANSI, arquivo, linha, coluna e contexto detalhado.
- [x] **Precedência de Operadores:** Corrigida a ordem de avaliação (`*` e `/` antes de `+` e `-`).
- [x] **Suporte a Parênteses:** Implementado reconhecimento de expressões entre parênteses para controle de precedência.

```
