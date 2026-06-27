import { createError, defineEventHandler, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  if (!event.context.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { data, error } = await event.context.supabase
    .from('todos')
    .select();

    if (error) {
      throw createError({ statusCode: 500, message: error.message })
    }

    return data;
})