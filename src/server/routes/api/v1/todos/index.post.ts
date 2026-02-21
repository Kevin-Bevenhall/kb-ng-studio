import { ServerRequest, ServerResponse } from '@analogjs/router/tokens';
import { createError, defineEventHandler, readBody } from 'h3';
import { createClient } from '@server/supabase';


export default defineEventHandler(async (event) => {
  const supabase = createClient({
    req: event.node.req as ServerRequest,
    res: event.node.res as ServerResponse,
  });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readBody(event);

  const { data, error } = await supabase.from('todos').insert({
    title: body.title,
    user_uid: user.id,
  });

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  return data;
});
