# Teste-de-IA
IA desenvolvida para testar meus conhecimentos.
Chat IA com Flask e Groq

Aplicação de chat com inteligência artificial usando Flask no backend e Groq (LLaMA 3) como modelo de linguagem.
O chat mantém contexto da conversa e responde de forma natural e humanizada através de uma interface web simples.

Tecnologias

Python 3.11+

Flask

Groq API (LLaMA 3)

HTML, CSS e JavaScript

Estrutura do Projeto
chatiabackend/
├── app.py
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js

Configuração da API

A API Key da Groq deve ser configurada como variável de ambiente.

Windows (CMD)
python app.py
Para uso permanente, crie a variável GROQ_API_KEY nas Variáveis de Ambiente do sistema.


Como Executar
Instale as dependências:
pip install flask groq

Inicie o servidor:

python app.py

Acesse no navegador:

http://seu ip

Funcionalidades

Chat em tempo real

Envio com ENTER

Memória de conversa

Respostas naturais e empáticas

Interface web simples e escura

Observações

Não coloque a API Key diretamente no código.

O projeto é voltado para aprendizado e testes com modelos de linguagem.
