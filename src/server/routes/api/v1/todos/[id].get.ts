import { createError, defineEventHandler, getRouterParam, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const id = getRouterParam(event, 'id');
  return {
    id
  }
})