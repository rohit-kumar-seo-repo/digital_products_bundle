import { NextResponse } from "next/server";
import { deflateRawSync } from "node:zlib";
import { toolkitFiles } from "@/lib/local-seo-toolkit";
import { supabaseKey, supabaseUrl } from "@/lib/store-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function crc32(data: Buffer) {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function zipFiles(files: Record<string, string>) {
  const local: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
  const dosDate = ((Math.max(1980, now.getFullYear()) - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();

  for (const [filename, value] of Object.entries(files)) {
    const name = Buffer.from(filename, "utf8");
    const raw = Buffer.from(value, "utf8");
    const compressed = deflateRawSync(raw);
    const crc = crc32(raw);

    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(0x0800, 6);
    header.writeUInt16LE(8, 8);
    header.writeUInt16LE(dosTime, 10);
    header.writeUInt16LE(dosDate, 12);
    header.writeUInt32LE(crc, 14);
    header.writeUInt32LE(compressed.length, 18);
    header.writeUInt32LE(raw.length, 22);
    header.writeUInt16LE(name.length, 26);
    header.writeUInt16LE(0, 28);
    local.push(header, name, compressed);

    const directory = Buffer.alloc(46);
    directory.writeUInt32LE(0x02014b50, 0);
    directory.writeUInt16LE(20, 4);
    directory.writeUInt16LE(20, 6);
    directory.writeUInt16LE(0x0800, 8);
    directory.writeUInt16LE(8, 10);
    directory.writeUInt16LE(dosTime, 12);
    directory.writeUInt16LE(dosDate, 14);
    directory.writeUInt32LE(crc, 16);
    directory.writeUInt32LE(compressed.length, 20);
    directory.writeUInt32LE(raw.length, 24);
    directory.writeUInt16LE(name.length, 28);
    directory.writeUInt16LE(0, 30);
    directory.writeUInt16LE(0, 32);
    directory.writeUInt16LE(0, 34);
    directory.writeUInt16LE(0, 36);
    directory.writeUInt32LE(0, 38);
    directory.writeUInt32LE(offset, 42);
    central.push(directory, name);

    offset += header.length + name.length + compressed.length;
  }

  const centralBytes = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(Object.keys(files).length, 8);
  end.writeUInt16LE(Object.keys(files).length, 10);
  end.writeUInt32LE(centralBytes.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...local, centralBytes, end]);
}

export async function GET(request: Request) {
  const orderNumber = new URL(request.url).searchParams.get("order")?.trim().toUpperCase() || "";
  if (!/^DPB-[A-F0-9]{20}$/.test(orderNumber)) {
    return NextResponse.json({ error: "A valid paid order is required." }, { status: 404 });
  }
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Delivery service is temporarily unavailable." }, { status: 503 });
  }

  const headers = {
    apikey: supabaseKey,
    Authorization: "Bearer " + supabaseKey,
    "Content-Type": "application/json",
  };
  const base = supabaseUrl + "/rest/v1/";
  const orderResponse = await fetch(
    base + "orders?order_number=eq." + encodeURIComponent(orderNumber) + "&status=eq.PAID&select=id&limit=1",
    { headers, cache: "no-store" }
  );
  if (!orderResponse.ok) {
    return NextResponse.json({ error: "Unable to verify this order." }, { status: 503 });
  }
  const orders = await orderResponse.json();
  if (!Array.isArray(orders) || !orders[0]?.id) {
    return NextResponse.json({ error: "Paid order not found." }, { status: 404 });
  }

  const itemResponse = await fetch(
    base + "order_items?order_id=eq." + encodeURIComponent(orders[0].id) +
      "&product_name=eq." + encodeURIComponent("Local SEO & Google Business Profile Agency Toolkit") +
      "&select=id&limit=1",
    { headers, cache: "no-store" }
  );
  if (!itemResponse.ok) {
    return NextResponse.json({ error: "Unable to verify purchased product." }, { status: 503 });
  }
  const items = await itemResponse.json();
  if (!Array.isArray(items) || !items[0]?.id) {
    return NextResponse.json({ error: "This order does not include the Local SEO Toolkit." }, { status: 404 });
  }

  const archive = zipFiles(toolkitFiles);
  return new Response(new Uint8Array(archive), {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="Local_SEO_GBP_Agency_Toolkit_v1.zip"',
      "Content-Length": String(archive.length),
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
