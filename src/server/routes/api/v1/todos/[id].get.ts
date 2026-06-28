import { createError, defineEventHandler, getRouterParam, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const id = getRouterParam(event, 'id');

  const { data, error } = await event.context.supabase
    .from('todos')
    .select()
    .eq('id', id)
    .single()

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return data;
})