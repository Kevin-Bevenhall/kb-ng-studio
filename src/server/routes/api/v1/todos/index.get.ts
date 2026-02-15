import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  return [
      {
        title: 'eat',
        completed: false,
      },
      {
        title: 'drink',
        completed: false,
      },
    ]
  
});
