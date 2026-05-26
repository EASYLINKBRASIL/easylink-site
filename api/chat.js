export const config = { runtime: 'edge' };

const SYSTEM = `Você é o assistente virtual da easylink, empresa especializada em internet para eventos (4G/5G, Starlink e Link Dedicado). Fale em português brasileiro de forma descontraída e amigável, usando linguagem clara e direta.

Informações sobre a easylink:
- Serviços: 4G/5G, Starlink e Link Dedicado para eventos
- Planos a partir de R$500/diária
- Atende shows, feiras, congressos, lançamentos de produtos, eventos corporativos, ativações de marca, transmissões ao vivo
- Atende em todo o Brasil, inclusive locais remotos com Starlink
- Equipamentos fornecidos, instalados e retirados pela equipe técnica
- Suporte técnico presencial durante o evento
- WhatsApp: (11) 4193-6140
- Email: atendimento@easylinkbrasil.com.br

Seja breve nas respostas — máximo 3 parágrafos curtos. Nunca invente informações que não estão acima.`;

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { messages } = await req.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://easylinkbrasil.com.br',
        'X-Title': 'easylink Chat',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          { role: 'system', content: SYSTEM },
          ...messages
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Desculpe, tive um problema. Fale com a gente pelo WhatsApp: (11) 4193-6140 😊';

    return new Response(JSON.stringify({ reply }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ reply: 'Ops, tive um problema de conexão. Fale com a gente pelo WhatsApp: (11) 4193-6140 😊' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
