import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/libs/prisma";

export async function POST(req) {
  const items = await req.json();
  // console.log(items);
  try {
    const totalSale = items.items.reduce((total, item) => {
      return total + item.total;
    }, 0);
    // console.log(items.user.id);
    // console.log(items.items[0].enterpriseId);
    const sale = await prisma.sale.create({
      data: {
        userId: items.user.id,
        totalSale: totalSale,
        data: JSON.stringify(items),
        address: JSON.stringify(items.address),
        enterpriseInt: items.items[0].enterpriseId,
        date: new Date(),
      },
    });
    // const currentDate = new Date("2023-08-07 17:51:38.035").toLocaleDateString(
    //   "es-MX"
    // );
    const currentDate = new Date().toLocaleDateString("es-MX");
    const emailContent = generateEmailContent(items, totalSale, currentDate);
    console.log(emailContent);
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
      to: `${items.user.email}, 'marriott@gruporegio.mx'`,
      subject: "Solicitud de pedido Web2Print",
      html: emailContent,
    };
    // return NextResponse({ mensaje: "ok" });
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);
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

function generateEmailContent(items, totalSale, currentDate) {
  // console.log(items);
  // console.log(totalSale);
  // console.log(currentDate);
  let content = "<h1>Detalles del Pedido</h1>";
  content += `<p>Pedido para: ${items.user.property}</p>`;
  content += `<p>Usuario: ${items.user.name}</p>`;
  content += `<p>Teléfono: ${items.user.telefono}</p>`;
  content += `<p>Fecha de solicitud: ${currentDate}</p>`;
  content += `<p>Dirección de envio: ${items.address.officeName}, ${
    items.address.address
  } ${items.address.city ? items.address.city : ""} ${
    items.address.country ? items.address.country : ""
  } ${items.address.state ? items.address.state : ""} ${
    items.address.postalCode ? items.address.postalCode : ""
  }</p>`;
  content += "<table>";
  content +=
    "<thead><tr><th style='padding:2px 10px'>Imagen</th><th style='padding:2px 10px'>Producto</th><th style='padding:2px 10px'>SKU</th><th style='padding:2px 10px'>Precio</th><th style='padding:2px 10px'>Cantidad</th><th style='padding:2px 10px'>Total</th><th style='padding:2px 10px'>Moneda</th></tr></thead>";
  content += "<tbody>";

  items.items.forEach((producto) => {
    content += `<tr><td style='padding:2px 10px'><img src=${process.env.NEXT_URL_BASE}${producto.imageProduct} width="100" alt=${producto.nameProduct}></td><td style='padding:2px 10px'>${producto.nameProduct}</td><td style='padding:2px 10px'>${producto.sku}</td><td style='padding:2px 10px'>${producto.price}</td><td style='padding:2px 10px'>${producto.quantity}</td><td style='padding:2px 10px'>$${producto.total}</td><td style='padding:2px 10px'>${producto.currency}</td></tr>`;
  });
  content += `<tr><td style='padding:2px 10px'></td><td style='padding:2px 10px'></td><td style='padding:2px 10px'></td><td style='padding:2px 10px'></td><td style='padding:2px 10px'></td><td style='padding:2px 10px'>Total:</td><td style='padding:2px 10px'>$${totalSale} ${items.user.currency}</td></tr>`;
  // content += `<p>Total: ${totalSale} ${items.user.currency}</p>`;

  content += "</tbody></table>";

  return content;
}
