
// API de contacto simplificada - redirige a mailto
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, phone, service } = body;

    // En lugar de guardar en base de datos, creamos un mailto
    const mailtoLink = `mailto:info@clilawyers.com?subject=Consulta de ${name}&body=Nombre: ${name}%0AEmail: ${email}%0ATeléfono: ${phone || 'No proporcionado'}%0AServicio: ${service}%0AMensaje: ${message}`;

    return NextResponse.json({ 
      success: true, 
      message: 'Consulta recibida. Te contactaremos pronto.',
      mailtoLink 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error al procesar la consulta' },
      { status: 500 }
    );
  }
}
