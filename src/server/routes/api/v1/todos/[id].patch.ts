import { createError, defineEventHandler, getRouterParams, H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const id = event.context.params?.['id'];
  const body = await readBody(event);

  const { data, error } = await event.context.supabase
    .from('todos')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return data;
})