import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/libs/prisma";

export async function POST(req) {
  const items = await req.json();
  // console.log(items.address);
  try {
    const totalSale = items.items.reduce((total, item) => {
      return total + item.total;
    }, 0);
    // console.log(items.items[0].enterpriseId);
    const sale = await prisma.sale.create({
      data: {
        userId: items.userId,
        totalSale: totalSale,
        data: JSON.stringify(items),
        address: JSON.stringify(items.address),
        enterpriseInt: items.items[0].enterpriseId,
        date: new Date(),
      },
    });
    const emailContent = generateEmailContent(items);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "hafid@tachuela.mx, lili@tachuela.mx, rocio@tachuela.mx",
      cc: "hola@tachuela.mx",
      subject: "test de envio de correo",
      html: emailContent,
      // text: `Detalles del pedido:\n\n${JSON.stringify(items)}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return NextResponse.json(
      { message: "email enviado", sale: sale },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "error", error }, { status: 500 });
    // throw error;
  }
}

function generateEmailContent(items) {
  // console.log(items.items);
  let content = "<h1>Detalles del Pedido</h1>";
  content += "<table>";
  content +=
    "<thead><tr><th style='padding:2px 10px'>Imagen</th><th style='padding:2px 10px'>Producto</th><th style='padding:2px 10px'>Cantidad</th><th style='padding:2px 10px'>Precio</th><th style='padding:2px 10px'>Moneda</th></tr></thead>";
  content += "<tbody>";

  items.items.forEach((producto) => {
    content += `<tr><td style='padding:2px 10px'><img src=${process.env.NEXT_URL_BASE}${producto.imageProduct} width="110" alt=${producto.nameProduct}></td><td style='padding:2px 10px'>${producto.nameProduct}</td><td style='padding:2px 10px'>${producto.quantity}</td><td style='padding:2px 10px'>${producto.price}</td><td style='padding:2px 10px'>${producto.currency}</td></tr>`;
  });

  content += "</tbody></table>";

  return content;
}
