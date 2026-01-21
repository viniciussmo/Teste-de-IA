import os
from flask import Flask, request, jsonify, render_template
from groq import Groq

app = Flask(__name__)

client = Groq(api_key=os.getenv("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"))

memoria = []

SYSTEM_PROMPT = """
Você conversa de forma humana, empática e atenciosa.
Demonstre preocupação quando perceber dificuldade emocional.
Faça perguntas naturais para manter o diálogo.
Explique com calma, sem excesso de informação.
Nunca use links.
Nunca diga que é um robô ou IA.
"""

def responder(pergunta):
    mensagens = [{"role": "system", "content": SYSTEM_PROMPT}]

    for m in memoria[-10:]:
        if m.startswith("Usuário:"):
            mensagens.append({"role": "user", "content": m.replace("Usuário:", "").strip()})
        elif m.startswith("IA:"):
            mensagens.append({"role": "assistant", "content": m.replace("IA:", "").strip()})

    mensagens.append({"role": "user", "content": pergunta})

    resposta = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=mensagens,
        temperature=0.7
    )

    return resposta.choices[0].message.content.strip()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    pergunta = request.json["pergunta"]

    memoria.append(f"Usuário: {pergunta}")
    resposta = responder(pergunta)
    memoria.append(f"IA: {resposta}")

    return jsonify({"resposta": resposta})

app.run(host="0.0.0.0", port=5000, debug=True)
