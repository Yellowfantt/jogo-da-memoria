export const characterMap = {
    "1": [
        "diferente_de_texto", "diferente_simbolo", "false_ingl", "falso_pt",
        "igual_simbolo", "igual_texto", "maior_que_simbolo", "maior_que_texto",
        "menor_que_simbolo", "menor_que_texto", "true_ingl", "verdadeiro_pt"
    ],
    "2": [
        "else", "senao",
        "funcao_pt", "function",
        "if", "se",
        "nao_pt", "not",
        "print", "print_pt",
        "string", "texto"
    ],
    "3": [
        "else", "senao", "if", "se",
        "retorno", "return", "nullo", "null",
        "while", "enquanto", "nao_pt", "not"
    ],
};

export const matchMap = {
    "1": {
        "true_ingl": "verdadeiro_pt",
        "verdadeiro_pt": "true_ingl",
        "false_ingl": "falso_pt",
        "falso_pt": "false_ingl",
        "igual_simbolo": "igual_texto",
        "igual_texto": "igual_simbolo",
        "diferente_de_texto": "diferente_simbolo",
        "diferente_simbolo": "diferente_de_texto",
        "maior_que_simbolo": "maior_que_texto",
        "maior_que_texto": "maior_que_simbolo",
        "menor_que_simbolo": "menor_que_texto",
        "menor_que_texto": "menor_que_simbolo"
    },
    "2": {
        "else": "senao",
        "senao": "else",
        "funcao_pt": "function",
        "function": "funcao_pt",
        "if": "se",
        "se": "if",
        "nao_pt": "not",
        "not": "nao_pt",
        "print": "print_pt",
        "print_pt": "print",
        "string": "texto",
        "texto": "string"
    },
    "3": {
        "else": "senao",
        "senao": "else",
        "if": "se",
        "se": "if",
        "nao_pt": "not",
        "not": "nao_pt",
        "nullo": "null",
        "null": "nullo",
        "retorno": "return",
        "return": "retorno",
        "while": "enquanto",
        "enquanto": "while"
    }
};




















export const characters = [
    "diferente_de_texto", "diferente_simbolo", "false_ingl", "falso_pt",
    "igual_simbolo", "igual_texto", "maior_que_simbolo", "maior_que_texto",
    "menor_que_simbolo", "menor_que_texto", "true_ingl", "verdadeiro_pt"
];

export const matches = {
    "true_ingl": "verdadeiro_pt",
    "verdadeiro_pt": "true_ingl",
    "false_ingl": "falso_pt",
    "falso_pt": "false_ingl",
    "igual_simbolo": "igual_texto",
    "igual_texto": "igual_simbolo",
    "diferente_de_texto": "diferente_simbolo",
    "diferente_simbolo": "diferente_de_texto",
    "maior_que_simbolo": "maior_que_texto",
    "maior_que_texto": "maior_que_simbolo",
    "menor_que_simbolo": "menor_que_texto",
    "menor_que_texto": "menor_que_simbolo"
};

