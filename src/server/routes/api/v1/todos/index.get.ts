import { createClient } from '@supabase/supabase-js';
import { createError, defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  const supabase = createClient(
    process.env['SUPABASE_URL']!,
    process.env['SUPABASE_KEY']!
  );

  const { data, error } = await supabase
  .from('todos')
  .select('*');

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return data;
});
