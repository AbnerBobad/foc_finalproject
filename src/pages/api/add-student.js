import { supabase } from '../../lib/supabase.js';

export const prerender = false; // Disable prerendering for this API route

export async function POST({ request }) {
  console.log('API called');
  
  try {
    const data = await request.json();
    console.log('Received data:', data);
    
    const { name, email, student_id, course } = data;

    console.log('Inserting into database...');
    
    const { data: result, error } = await supabase
      .from('student')
      .insert([{ name, email, student_id, course }])
      .select();

    console.log('Supabase response:', { result, error });

    if (error) {
      console.error('Supabase error:', error);
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
    console.error('Caught error:', err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}