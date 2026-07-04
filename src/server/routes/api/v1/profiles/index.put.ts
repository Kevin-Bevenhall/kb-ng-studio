import { createError, defineEventHandler, H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { palette } = body;

  const { data, error } = await event.context.supabase
    .from('profiles')
    .update({ palette })
    .eq('id', event.context.user?.id)
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return data;
})