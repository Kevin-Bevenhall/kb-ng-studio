import { ServerRequest, ServerResponse } from "@analogjs/router/tokens";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { defineEventHandler, H3Event } from 'h3';
import { createClient } from "../supabase";

declare module 'h3' {
  interface H3EventContext {
    supabase: SupabaseClient;
    user: User | null;
  }
}

export default defineEventHandler(async (event: H3Event) => {
  const client = createClient({ req: event.node.req as ServerRequest, res: event.node.res as ServerResponse });

  const { data, error } = await client.auth.getUser();

  event.context.supabase = client;
  event.context.user = data.user ?? null;
})