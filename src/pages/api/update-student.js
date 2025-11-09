import { supabase } from '../../lib/supabase.js';

export const prerender = false;

export async function POST({ request }) {
  try {
    const { id, name, email, student_id, course } = await request.json();

    const { data: result, error } = await supabase
      .from('student')
      .update({ name, email, student_id, course })
      .eq('id', id)
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data: result }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}