import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

export async function GET() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const newProduct = { id: Date.now().toString(), ...body };
    data.push(newProduct);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const index = data.findIndex((p: any) => p.id === body.id);
    if (index !== -1) {
      data[index] = { ...data[index], ...body };
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      return NextResponse.json(data[index]);
    }
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const filteredData = data.filter((p: any) => p.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filteredData, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
