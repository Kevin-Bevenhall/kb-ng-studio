import { createError, defineEventHandler, H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);

  const { data, error } = await event.context.supabase
    .from('todos')
    .insert(body)
    .select()

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return data;
})