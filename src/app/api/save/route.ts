import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function GET(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured", configured: false },
      { status: 503 },
    );
  }

  const playerKey = new URL(request.url).searchParams.get("player_key");
  if (!playerKey || !UUID_RE.test(playerKey)) {
    return badRequest("player_key must be a UUID");
  }

  const { data, error } = await supabase
    .from("saves")
    .select("player_key, scene_id, inventory, dropped_items, flags, updated_at")
    .eq("player_key", playerKey)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ save: data, configured: true });
}

export async function PUT(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured", configured: false },
      { status: 503 },
    );
  }

  let body: {
    player_key?: string;
    scene_id?: string;
    inventory?: unknown;
    dropped_items?: unknown;
    flags?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  if (!body.player_key || !UUID_RE.test(body.player_key)) {
    return badRequest("player_key must be a UUID");
  }
  if (!body.scene_id || typeof body.scene_id !== "string") {
    return badRequest("scene_id is required");
  }
  if (!Array.isArray(body.inventory)) {
    return badRequest("inventory must be an array");
  }
  if (body.dropped_items !== undefined && !Array.isArray(body.dropped_items)) {
    return badRequest("dropped_items must be an array");
  }
  if (!body.flags || typeof body.flags !== "object") {
    return badRequest("flags must be an object");
  }

  const row = {
    player_key: body.player_key,
    scene_id: body.scene_id,
    inventory: body.inventory,
    dropped_items: body.dropped_items ?? [],
    flags: body.flags,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("saves")
    .upsert(row, { onConflict: "player_key" })
    .select("player_key, scene_id, inventory, dropped_items, flags, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ save: data, configured: true });
}
